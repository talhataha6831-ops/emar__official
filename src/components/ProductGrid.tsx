import React, { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import ProductCardAdvanced from '@/components/ProductCardAdvanced'
import FiltersBar from '@/components/FiltersBar'

export default function ProductGrid({ filter }: { filter?: 'featured' | 'best' | 'signature' | null }){
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(filter ?? null)

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true)
      let query = supabase.from('products').select('*, images').order('created_at', {ascending:false}).limit(40)
      if(selectedFilter === 'featured') query = (query as any).eq('is_featured', true)
      if(selectedFilter === 'best') query = (query as any).eq('is_best_seller', true)
      if(selectedFilter === 'signature') query = (query as any).eq('is_signature', true)
      const { data, error } = await (query as any)
      setLoading(false)
      if(error) console.error(error)
      setProducts(data ?? [])
    }
    load()
  },[selectedFilter])

  if(loading) return <div className="py-12 text-center text-emar-silver">Loading products...</div>

  return (
    <div>
      <FiltersBar selected={selectedFilter} onSelect={(s)=>setSelectedFilter(s)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p)=> (
          <ProductCardAdvanced key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
