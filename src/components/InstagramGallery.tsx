import React from 'react'

export default function InstagramGallery(){
  const imgs = [
    '/insta-1.jpg','/insta-2.jpg','/insta-3.jpg','/insta-4.jpg','/insta-5.jpg','/insta-6.jpg'
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-serif text-emar-ivory mb-6">THE WORLD OF EMAR</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imgs.map((src, i)=> (
          <a key={i} href="https://www.instagram.com/emar._.official" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-md">
            <img src={src} alt={`EMAR Instagram ${i+1}`} loading="lazy" className="w-full h-48 object-cover transform transition-transform hover:scale-105" />
          </a>
        ))}
      </div>
    </section>
  )
}
