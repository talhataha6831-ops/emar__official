import React, { useEffect, useRef } from 'react'
import { useFocusTrap } from '@/lib/focusTrap'

export default function QuickViewModal({ product, onClose }: { product: any, onClose: ()=>void }){
  const ref = useRef<HTMLDivElement | null>(null)
  useFocusTrap(ref, !!product)

  useEffect(()=>{
    function handler(e: KeyboardEvent){
      if(e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return ()=> document.removeEventListener('keydown', handler)
  },[onClose])

  if(!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" role="dialog" aria-modal="true">
      <div ref={ref} className="bg-emar-card w-11/12 md:w-3/4 lg:w-2/3 rounded-lg p-6 border border-emar-border" aria-label={`Quick view ${product.title}`}>
        <button className="absolute top-4 right-4 text-emar-silver" onClick={onClose} aria-label="Close Quick View">✕</button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img src={product.images?.[0] || '/placeholder-product.jpg'} alt={product.title} className="w-full h-96 object-cover rounded" loading="lazy" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-serif text-emar-ivory">{product.title}</h2>
            <p className="text-emar-silver mt-4">{product.short_description || product.description}</p>
            <div className="mt-6 text-emar-ivory font-semibold">Rs. {Number(product.price).toLocaleString()}</div>
            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-emar-gold text-black rounded" onClick={()=> { window.open('/api/whatsapp-order', '_blank') }}>Order via WhatsApp</button>
              <button className="px-4 py-2 border border-emar-gold text-emar-ivory rounded" onClick={onClose}>Close</button>
            </div>
            <p className="sr-only">Press Escape to close</p>
          </div>
        </div>
      </div>
    </div>
  )
}
