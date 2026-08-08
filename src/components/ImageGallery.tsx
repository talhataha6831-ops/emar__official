import React from 'react'

export default function ImageGallery({ images = [], alt = '', className = '' } : { images?: string[], alt?: string, className?: string }){
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 ${className}`}>
      {images.slice(0,6).map((src, i) => (
        <img key={i} src={src} alt={`${alt} ${i+1}`} loading="lazy" className="w-full h-40 object-cover rounded" />
      ))}
    </div>
  )
}
