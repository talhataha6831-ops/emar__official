import { supabase } from '@/integrations/supabase/client'

export const executeConcierge = async (opts: { type: 'order' | 'vip' }) => {
  try{
    const msg = opts.type === 'order' ? 'VIP_DIRECT_ORDER' : 'VIP_CONCIERGE_CARE'
    // call the server-side /api/whatsapp-contact to log and receive waUrl
    const res = await fetch('/api/whatsapp-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: opts.type })
    })
    const json = await res.json()
    if(json?.waUrl){
      window.open(json.waUrl, '_blank', 'noopener,noreferrer')
    } else {
      const fallback = opts.type === 'order' ? (process.env.NEXT_PUBLIC_EMAR_WHATSAPP_TARGET || '+923257851162') : (process.env.NEXT_PUBLIC_EMAR_VIP_WHATSAPP || '+923258581251')
      window.open(`https://wa.me/${String(fallback).replace('+','')}`, '_blank')
    }
  }catch(err){
    console.error(err)
    const fallback = opts.type === 'order' ? (process.env.NEXT_PUBLIC_EMAR_WHATSAPP_TARGET || '+923257851162') : (process.env.NEXT_PUBLIC_EMAR_VIP_WHATSAPP || '+923258581251')
    window.open(`https://wa.me/${String(fallback).replace('+','')}`, '_blank')
  }
}
