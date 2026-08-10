'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { requireAdminAuth } from '@/lib/utils/admin-auth'

const getAuthClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function loginAction(prevState: { error?: string } | undefined, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = getAuthClient()
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.session) {
      return { error: error?.message || 'Failed to authenticate' }
    }

    // Set auth cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    })
  } catch {
    return { error: 'Failed to communicate with authentication service. Please try again.' }
  }

  redirect('/admin/orders')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
  redirect('/admin/login')
}

export async function uploadImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdminAuth()
  const file = formData.get('file') as File
  if (!file) return { error: 'No file provided' }

  // Validate extension and size (Max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File size exceeds 5MB' }
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' }
  }

  // Service role key for admin upload
  const supabase = getSupabaseAdmin()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const filePath = `products/${fileName}`

  const { error } = await supabase.storage
    .from('products-images')
    .upload(filePath, file)

  if (error) {
    return { error: error.message }
  }

  const { data: publicUrlData } = supabase.storage
    .from('products-images')
    .getPublicUrl(filePath)

  return { url: publicUrlData.publicUrl }
}

export async function generateUniqueSlug(name: string): Promise<string> {
  await requireAdminAuth()
  const supabase = getSupabaseAdmin()
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  let slug = baseSlug
  let counter = 1

  while (true) {
    const { data } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (!data) break // Unique slug found
    counter++
    slug = `${baseSlug}-${counter}`
  }

  return slug
}

export async function createProductAction(formData: FormData): Promise<{ error?: string }> {
  await requireAdminAuth()
  const supabase = getSupabaseAdmin()
  
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const stock = parseInt(formData.get('stock') as string)
  const collection = formData.get('collection') as string
  const isActive = formData.get('is_active') === 'on'
  const imageUrls = formData.getAll('image_urls') as string[]

  let salePrice: number | null = null
  if (formData.has('sale_price')) {
    const spRaw = formData.get('sale_price') as string
    if (spRaw && spRaw.trim() !== '') {
      salePrice = parseFloat(spRaw)
      if (isNaN(salePrice) || salePrice < 0) return { error: 'Invalid sale price' }
    }
  }

  let structuredInfo: Record<string, string> | null = null
  if (formData.has('structured_info')) {
    const siRaw = formData.get('structured_info') as string
    if (siRaw && siRaw.trim() !== '') {
      try {
        const parsed = JSON.parse(siRaw)
        if (Object.keys(parsed).length > 0) {
          structuredInfo = parsed
        }
      } catch {
        // ignore
      }
    }
  }

  if (!name || name.trim() === '') return { error: 'Name is required' }
  if (isNaN(price) || price < 0) return { error: 'Invalid price' }
  if (isNaN(stock) || stock < 0) return { error: 'Invalid stock' }
  if (!collection) return { error: 'Collection is required' }

  const slug = await generateUniqueSlug(name)

  const { error } = await supabase.from('products').insert({
    slug,
    name,
    description,
    price,
    sale_price: salePrice,
    stock,
    collection,
    image_urls: imageUrls,
    structured_info: structuredInfo,
    is_active: isActive
  })

  if (error) return { error: error.message }

  return {}
}

export async function updateProductAction(id: string, formData: FormData): Promise<{ error?: string }> {
  await requireAdminAuth()
  const supabase = getSupabaseAdmin()
  
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const stock = parseInt(formData.get('stock') as string)
  const collection = formData.get('collection') as string
  const isActive = formData.get('is_active') === 'on'
  const imageUrls = formData.getAll('image_urls') as string[]

  if (!name || name.trim() === '') return { error: 'Name is required' }
  if (isNaN(price) || price < 0) return { error: 'Invalid price' }
  if (isNaN(stock) || stock < 0) return { error: 'Invalid stock' }
  if (!collection) return { error: 'Collection is required' }

  // Build update payload dynamically to avoid removing existing fields
  const updatePayload: Record<string, unknown> = {
    name,
    description,
    price,
    stock,
    collection,
    image_urls: imageUrls,
    is_active: isActive
  }

  if (formData.has('sale_price')) {
    const spRaw = formData.get('sale_price') as string
    if (spRaw && spRaw.trim() !== '') {
      const parsedSp = parseFloat(spRaw)
      if (isNaN(parsedSp) || parsedSp < 0) return { error: 'Invalid sale price' }
      updatePayload.sale_price = parsedSp
    } else {
      updatePayload.sale_price = null
    }
  }

  if (formData.has('structured_info')) {
    const siRaw = formData.get('structured_info') as string
    if (siRaw && siRaw.trim() !== '') {
      try {
        const parsed = JSON.parse(siRaw)
        if (Object.keys(parsed).length > 0) {
          updatePayload.structured_info = parsed
        } else {
          updatePayload.structured_info = null
        }
      } catch {
        updatePayload.structured_info = null
      }
    } else {
      updatePayload.structured_info = null
    }
  }

  const { error } = await supabase.from('products').update(updatePayload).eq('id', id)

  if (error) return { error: error.message }

  return {}
}

export async function deactivateProductAction(id: string): Promise<{ error?: string }> {
  await requireAdminAuth()
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('products').update({ is_active: false }).eq('id', id)
  if (error) return { error: error.message }
  return {}
}
