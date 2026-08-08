import React, { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

export default function ReviewsCarousel(){
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(()=>{
    const load = async ()=>{
      const { data, error } = await supabase.from('customer_reviews').select('*').order('created_at', {ascending:false}).limit(12)
      if(error) console.error(error)
      setReviews(data ?? [])
    }
    load()
  },[])

  if(reviews.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-serif text-emar-ivory mb-6">VERIFIED REVIEWS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(r=> (
          <div key={r.id} className="bg-emar-card p-6 rounded border border-emar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[rgba(255,255,255,0.06)] rounded-full flex items-center justify-center text-emar-ivory">{r.customer_name?.[0] ?? 'U'}</div>
              <div>
                <div className="text-emar-ivory font-semibold">{r.customer_name}</div>
                <div className="text-emar-silver text-sm">Verified Buyer</div>
              </div>
            </div>
            <div className="text-emar-gold mb-2">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
            <p className="text-emar-silver">{r.review_text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
