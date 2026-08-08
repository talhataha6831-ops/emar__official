import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import RelatedProducts from './RelatedProducts'
import { executeWhatsAppOrder } from '@/services/whatsappService'

export default function QuickViewModal({ product, onClose }: { product: any, onClose: ()=>void }){
  const [variants, setVariants] = useState<any[]>([])
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null)

  useEffect(()=>{
    const load = async ()=>{
      if(!product?.id) return
      const { data } = await supabase.from('product_variants').select('*').eq('product_id', product.id)
      setVariants(data ?? [])
      setSelectedVariant((data && data[0]) ?? null)
    }
    load()
  },[product])

  if(!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-emar-card w-11/12 md:w-3/4 lg:w-2/3 rounded-lg p-6 border border-emar-border">
        <button className="absolute top-4 right-4 text-emar-silver" onClick={onClose} aria-label="Close Quick View">✕</button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img src={product.images?.[0] || '/placeholder-product.jpg'} alt={product.title} className="w-full h-96 object-cover rounded" loading="lazy" />
            <div className="mt-3 grid grid-cols-4 gap-2">
              {(product.images ?? []).slice(0,4).map((src:string, i:number)=> (
                <img key={i} src={src} alt={`${product.title} ${i+1}`} className="w-full h-20 object-cover rounded cursor-pointer" loading="lazy" />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-serif text-emar-ivory">{product.title}</h2>
            <p className="text-emar-silver mt-4">{product.short_description || product.description}</p>
            <div className="mt-6 text-emar-ivory font-semibold">Rs. {Number(product.price).toLocaleString()}</div>

            {variants.length > 0 && (
              <div className="mt-4">
                <div className="text-emar-silver mb-2">Select Variant</div>
                <div className="flex gap-2 flex-wrap">
                  {variants.map(v=> (
                    <button key={v.id} className={`px-3 py-2 rounded ${selectedVariant?.id === v.id ? 'bg-emar-gold text-black' : 'border border-emar-border text-emar-ivory'}`} onClick={()=>setSelectedVariant(v)}>{v.variant_name}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-emar-gold text-black rounded" onClick={()=> executeWhatsAppOrder({ productId: product.id, productName: product.title, price: Number(selectedVariant?.price_override ?? product.price), variantDetails: selectedVariant?.variant_name ?? 'Standard' })}>Order via WhatsApp</button>
              <button className="px-4 py-2 border border-emar-gold text-emar-ivory rounded" onClick={onClose}>Close</button>
            </div>

            <RelatedProducts productId={product.id} categoryId={product.category_id} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
