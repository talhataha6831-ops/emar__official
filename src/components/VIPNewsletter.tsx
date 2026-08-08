import React, { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

export default function VIPNewsletter(){
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!email) return alert('Please enter your email')
    setLoading(true)
    const { error } = await supabase.from('newsletter_subscribers').insert({ email, source: 'VIP Footer Form' })
    setLoading(false)
    if(error){
      console.error(error)
      alert('Unable to subscribe right now')
    } else {
      alert('Subscribed. Welcome to EMAR VIP list.')
      setEmail('')
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-center border-t border-emar-border">
      <h3 className="text-2xl font-serif mb-4">VIP NEWSLETTER</h3>
      <p className="text-emar-silver">Join our VIP list for exclusive previews and concierge access.</p>
      <form onSubmit={subscribe} className="mt-6 flex justify-center gap-2">
        <input className="px-4 py-3 rounded bg-[rgba(255,255,255,0.02)] border border-emar-border text-emar-ivory" placeholder="Your email address" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <button className="px-4 py-3 bg-emar-gold text-black rounded" disabled={loading}>{loading ? '...' : 'Join VIP'}</button>
      </form>
    </section>
  )
}
