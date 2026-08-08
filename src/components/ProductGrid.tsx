import React, { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { executeWhatsAppOrder } from '@/services/whatsappService'
import QuickViewModal from '@/components/QuickViewModal'

export default function ProductGrid({ filter }: { filter?: 'featured' | 'best' | 'signature' | null }){
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any | null>(null)

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true)
      let query = supabase.from('products').select('*').order('created_at', {ascending:false}).limit(40)
      if(filter === 'featured') query = (query as any).eq('is_featured', true)
      if(filter === 'best') query = (query as any).eq('is_best_seller', true)
      if(filter === 'signature') query = (query as any).eq('is_signature', true)
      const { data, error } = await (query as any)
      setLoading(false)
      if(error) console.error(error)
      setProducts(data ?? [])
    }
    load()
  },[filter])

  if(loading) return <div className="py-12 text-center text-emar-silver">Loading products...</div>

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p)=> (
          <div key={p.id} className="bg-emar-card border border-emar-border p-4 rounded-lg shadow-gold-glow">
            <div className="h-64 bg-cover bg-center rounded-md mb-4" style={{backgroundImage: `url(${p.images?.[0] || '/placeholder-product.jpg'})`}} />
            <h3 className="font-serif text-emar-ivory">{p.title}</h3>
            <div className="mt-2 text-emar-silver">Rs. {Number(p.price).toLocaleString()}</div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-emar-gold text-black rounded" onClick={()=> executeWhatsAppOrder({ productId: p.id, productName: p.title, price: Number(p.price), variantDetails: 'Standard' })}>ORDER VIA WHATSAPP</button>
              <button className="px-4 py-2 border border-emar-gold text-emar-ivory rounded" onClick={()=>setSelected(p)}>QUICK VIEW</button>
            </div>
          </div>
        ))}
      </div>

      {selected && <QuickViewModal product={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}
