import React from 'react'

export default function StickyGlassHeader(){
  return (
    <header className="sticky top-0 z-40 glass-header backdrop-blur-xl border-emar-border/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <nav className="flex gap-6 items-center text-emar-silver">
          <a className="hover:text-emar-ivory">Home</a>
          <a className="hover:text-emar-ivory">Shop</a>
          <a className="hover:text-emar-ivory">Collections</a>
          <a className="hover:text-emar-ivory">Brand Story</a>
          <a className="hover:text-emar-ivory">Contact</a>
        </nav>

        <div className="text-center">
          <div className="text-emar-gold font-serif text-xl tracking-wider">EMAR</div>
          <div className="text-xs text-emar-silver">DEFINE YOUR SIGNATURE</div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-emar-silver">🔍</button>
          <button className="text-emar-silver">♡</button>
          <button className="text-emar-silver">🛒</button>
          <a href={`https://wa.me/923257851162`} target="_blank" rel="noreferrer" className="text-emar-gold">💬</a>
        </div>
      </div>
    </header>
  )
}
