import React, { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import ProductCardAdvanced from '@/components/ProductCardAdvanced'

export default function RelatedProducts({ productId, categoryId }: { productId: string, categoryId?: string }){
  const [related, setRelated] = useState<any[]>([])

  useEffect(()=>{
    const load = async ()=>{
      // prefer same category, fallback to recent products
      let q
      if(categoryId){
        q = supabase.from('products').select('*, images').eq('category_id', categoryId).order('created_at', {ascending:false}).limit(8)
      } else {
        q = supabase.from('products').select('*, images').order('created_at', {ascending:false}).limit(8)
      }
      const { data } = await (q as any)
      const candidates = (data ?? []).filter((p:any)=>p.id !== productId)
      // naive similarity: prefer same category and share words in title
      const targetTitle = ''
      const scored = candidates.map((c:any)=>({
        item: c,
        score: (c.category_id === categoryId ? 2 : 0) + (c.title && targetTitle ? c.title.split(' ').filter((w:string)=> targetTitle.includes(w)).length : 0)
      })).sort((a:any,b:any)=>b.score - a.score)

      setRelated(scored.slice(0,4).map((s:any)=>s.item))
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
