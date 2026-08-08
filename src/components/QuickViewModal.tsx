import React from 'react'

export default function QuickViewModal({ product, onClose }: { product: any, onClose: ()=>void }){
  if(!product) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-emar-card w-11/12 md:w-3/4 lg:w-2/3 rounded-lg p-6 border border-emar-border">
        <div className="flex gap-6">
          <div className="w-1/2">
            <div className="h-96 bg-cover bg-center rounded" style={{backgroundImage: `url(${product.images?.[0] || '/placeholder-product.jpg'})`}} />
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-serif text-emar-ivory">{product.title}</h2>
            <p className="text-emar-silver mt-4">{product.short_description || product.description}</p>
            <div className="mt-6 text-emar-ivory font-semibold">Rs. {Number(product.price).toLocaleString()}</div>
            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-emar-gold text-black rounded" onClick={()=>{ window.open(`/api/whatsapp-order`, '_blank') }}>Order via WhatsApp</button>
              <button className="px-4 py-2 border border-emar-gold text-emar-ivory rounded" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
