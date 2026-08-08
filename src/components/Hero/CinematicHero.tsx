import React from 'react'

export default function CinematicHero(){
  return (
    <section className="relative overflow-hidden" style={{background: 'linear-gradient(180deg, rgba(8,8,10,1) 0%, rgba(18,18,21,1) 60%)'}}>
      <div className="max-w-7xl mx-auto px-6 py-28 flex items-center justify-between">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-serif text-emar-ivory leading-tight">DEFINE YOUR SIGNATURE</h1>
          <p className="mt-6 text-emar-silver">Discover a collection created for those who appreciate elegance, quality, and timeless style.</p>
          <div className="mt-8 flex gap-4">
            <a className="px-6 py-3 bg-emar-gold text-black font-semibold rounded shadow-gold hover:bg-emar-gold-light transition">SHOP COLLECTION</a>
            <a className="px-6 py-3 border border-emar-gold text-emar-ivory rounded" href={`https://wa.me/923257851162`} target="_blank" rel="noreferrer">ORDER VIA WHATSAPP</a>
          </div>
        </div>
        <div className="w-1/3 hidden lg:block">
          <div className="bg-gradient-to-tr from-transparent to-emar-gold/10 h-80 rounded-lg shadow-gold p-6 flex items-end justify-end">
            <div className="w-48 h-64 bg-[url('/placeholder-product.jpg')] bg-cover bg-center rounded"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
