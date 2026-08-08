'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import * as XLSX from 'xlsx'
import { Download, Upload, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { bulkImportProductsAction, ProductImportRow } from '@/app/admin/import-actions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParsedRow = Record<string, any>

type ValidationResult = {
  valid: boolean
  errors: string[]
  product?: ProductImportRow
}

export default function ProductImport() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<{ row: ParsedRow, validation: ValidationResult }[]>([])
  const [isParsing, setIsParsing] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        name: 'Premium Dog Bed',
        description: 'Soft comfortable bed',
        price: 1499,
        stock: 20,
        collection: 'dogs',
        image_urls: 'https://valid-image-url.com/dog-bed.jpg',
        is_active: true
      }
    ])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Products')
    XLSX.writeFile(wb, 'DoggyLobby_Product_Template.xlsx')
  }

  const validateRow = (rawRow: ParsedRow): ValidationResult => {
    const errors: string[] = []
    const row = rawRow || {}
    
    const name = row.name ? String(row.name).trim() : ''
    if (!name) errors.push('Missing product name')

    const description = row.description ? String(row.description).trim() : ''
    
    const price = Number(row.price)
    if (isNaN(price) || price < 0 || row.price === undefined || row.price === null || row.price === '') {
      errors.push('Invalid or missing price')
    }

    const stock = Number(row.stock)
    if (isNaN(stock) || stock < 0 || row.stock === undefined || row.stock === null || row.stock === '') {
      errors.push('Invalid or missing stock')
    }

    const collection = row.collection ? String(row.collection).trim().toLowerCase() : ''
    if (!collection) errors.push('Missing collection')

    let image_urls: string[] = []
    if (row.image_urls) {
      image_urls = String(row.image_urls).split('|').map(u => u.trim()).filter(Boolean)
      
      const invalidUrls = image_urls.filter(url => {
        try {
          const parsed = new URL(url)
          if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return true
          if (parsed.hostname.includes('example.com') || parsed.hostname.includes('test')) return true
          return false
        } catch {
          return true
        }
      })
      if (invalidUrls.length > 0) {
        errors.push('Invalid or placeholder image URL detected. Use a valid http/https URL.')
      }
    }

    let is_active = true
    if (row.is_active !== undefined) {
      const activeStr = String(row.is_active).trim().toLowerCase()
      if (activeStr === 'false' || activeStr === '0') is_active = false
    }

    if (errors.length > 0) {
      return { valid: false, errors }
    }

    return {
      valid: true,
      errors: [],
      product: {
        name,
        description,
        price,
        stock,
        collection,
        image_urls,
        is_active
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (!uploadedFile) return

    setFile(uploadedFile)
    setIsParsing(true)
    setGlobalError(null)

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = XLSX.utils.sheet_to_json(ws) as any[]

        if (data.length === 0) {
          setGlobalError('File is empty.')
          setPreviewData([])
          setIsParsing(false)
          return
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsed = data.map((row: Record<string, any>) => ({
          row,
          validation: validateRow(row)
        }))

        setPreviewData(parsed)
      } catch {
        setGlobalError('Failed to parse file. Ensure it is a valid CSV or XLSX.')
      } finally {
        setIsParsing(false)
      }
    }
    reader.onerror = () => {
      setGlobalError('Error reading file.')
      setIsParsing(false)
    }

    reader.readAsArrayBuffer(uploadedFile)
  }

  const handleImport = async () => {
    const validProducts = previewData
      .filter(item => item.validation.valid && item.validation.product)
      .map(item => item.validation.product!)

    if (validProducts.length === 0) {
      setGlobalError('No valid products to import.')
      return
    }

    setIsImporting(true)
    setGlobalError(null)

    try {
      const res = await bulkImportProductsAction(validProducts)
      if (res.error) {
        setGlobalError(res.error)
      } else {
        router.push('/admin/products')
        router.refresh()
      }
    } catch (err: unknown) {
      const e = err as Error
      setGlobalError(e.message || 'Error during import')
    } finally {
      setIsImporting(false)
    }
  }

  const validCount = previewData.filter(d => d.validation.valid).length
  const invalidCount = previewData.length - validCount

  return (
    <div className="space-y-6">
      {/* Upload and Template Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File (.csv, .xlsx)</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
              disabled={isParsing || isImporting}
            >
              {isParsing ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
              Select File
            </button>
            <span className="text-sm text-gray-500 truncate max-w-xs">
              {file ? file.name : 'No file selected'}
            </span>
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-12 bg-gray-200"></div>

        <div>
          <button
            onClick={downloadTemplate}
            className="px-4 py-2 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Download Template
          </button>
        </div>
      </div>

      {globalError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2 text-sm font-medium">
          <AlertCircle size={16} />
          {globalError}
        </div>
      )}

      {/* Preview Section */}
      {previewData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Preview ({previewData.length} rows)</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> {validCount} Valid</span>
              <span className="text-red-600 font-medium flex items-center gap-1"><XCircle size={14} /> {invalidCount} Invalid</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Collection</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Errors</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previewData.map((item, idx) => (
                  <tr key={idx} className={item.validation.valid ? '' : 'bg-red-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {item.validation.valid ? (
                        <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16} /> Ready</span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1"><XCircle size={16} /> Invalid</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 truncate max-w-[200px]">{item.row.name || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.row.price !== undefined ? `₹${item.row.price}` : '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.row.stock !== undefined ? item.row.stock : '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 capitalize">{item.row.collection || '-'}</td>
                    <td className="px-4 py-3 text-sm text-red-600">
                      {item.validation.errors.map((e, i) => (
                        <div key={i}>• {e}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button
              onClick={handleImport}
              disabled={isImporting || validCount === 0}
              className="px-6 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isImporting && <Loader2 className="animate-spin" size={16} />}
              Import {validCount} Products
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
