import React, { useState } from 'react'
import { executeConcierge } from '@/services/whatsappService'

export default function FloatingConciergeWidget(){
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className={`bg-emar-gold text-black px-4 py-3 rounded-full cursor-pointer shadow-gold ${open ? 'mb-4' : ''}`} onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="vip-concierge">VIP</div>

      {open && (
        <div id="vip-concierge" className="mt-3 bg-emar-card border border-emar-border rounded-lg p-4 w-64" role="dialog" aria-label="VIP Concierge">
          <button className="sr-only" aria-hidden onClick={()=>setOpen(false)}>Close</button>
          <button className="block w-full mb-2 text-emar-ivory text-left" onClick={()=> executeConcierge({ type: 'order' })}>Direct WhatsApp Order</button>
          <button className="block w-full text-emar-ivory text-left" onClick={()=> executeConcierge({ type: 'vip' })}>VIP Concierge Care</button>
        </div>
      )}
    </div>
  )
}
