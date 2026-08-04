export default function Loading() {
  return (
    <section className="pt-32 md:pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12 animate-pulse">
          <div className="h-3 w-24 bg-[var(--color-brand-gray)] rounded-full mb-4" />
          <div className="h-14 w-3/4 bg-[var(--color-brand-gray)] rounded-2xl mb-3" />
          <div className="h-4 w-1/2 bg-[var(--color-brand-gray)] rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-[var(--radius-3xl)] overflow-hidden border border-black/5 bg-white">
              <div className="aspect-square bg-[var(--color-brand-gray)]" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-[var(--color-brand-gray)] rounded-full w-3/4" />
                <div className="h-3 bg-[var(--color-brand-gray)] rounded-full w-full" />
                <div className="h-3 bg-[var(--color-brand-gray)] rounded-full w-2/3" />
                <div className="h-8 bg-[var(--color-brand-gray)] rounded-full w-1/3 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
