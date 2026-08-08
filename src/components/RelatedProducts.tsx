import React, { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import ProductCardAdvanced from './ProductCardAdvanced'

export default function RelatedProducts({ productId, categoryId }: { productId: string, categoryId?: string }){
  const [related, setRelated] = useState<any[]>([])

  useEffect(()=>{
    const load = async ()=>{
      let q = supabase.from('products').select('*').limit(4).order('created_at', {ascending:false})
      if(categoryId) q = (q as any).eq('category_id', categoryId)
      const { data } = await (q as any)
      const filtered = (data ?? []).filter((p:any)=>p.id !== productId).slice(0,4)
      setRelated(filtered)
    }
    load()
  },[productId, categoryId])

  if(related.length === 0) return null

  return (
    <div className="mt-6">
      <h4 className="text-emar-ivory font-semibold mb-4">You may also like</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map(r => <ProductCardAdvanced key={r.id} product={r} />)}
      </div>
    </div>
  )
}
