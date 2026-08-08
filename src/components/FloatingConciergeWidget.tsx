import React, { useState } from 'react'

export default function FloatingConciergeWidget(){
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className={`bg-emar-gold text-black px-4 py-3 rounded-full cursor-pointer shadow-gold ${open ? 'mb-4' : ''}`} onClick={()=>setOpen(!open)}>
        VIP
      </div>

      {open && (
        <div className="mt-3 bg-emar-card border border-emar-border rounded-lg p-4 w-64">
          <a className="block mb-2 text-emar-ivory" href={`https://wa.me/923257851162`} target="_blank" rel="noreferrer">Direct WhatsApp Order</a>
          <a className="block text-emar-ivory" href={`https://wa.me/923258581251`} target="_blank" rel="noreferrer">VIP Concierge Care</a>
        </div>
      )}
    </div>
  )
}
