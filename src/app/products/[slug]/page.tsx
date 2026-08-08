import React, { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useRouter } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery'

export async function generateMetadata({ params }: { params: { slug: string } }){
  const sb = supabase
  const { data } = await sb.from('products').select('*').eq('slug', params.slug).single()
  if(!data) return { title: 'Product' }
  return {
    title: `${data.title} — EMAR`,
    description: data.short_description ?? data.description?.slice(0,150),
    openGraph: {
      title: `${data.title} — EMAR`,
      description: data.short_description ?? data.description?.slice(0,150),
      images: data.images?.[0] ? [{ url: data.images[0] }] : []
    }
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }){
  const { slug } = params
  const { data: product, error } = await supabase.from('products').select('*, images').eq('slug', slug).maybeSingle()
  if(error) return <div className="p-12">Product not found</div>
  if(!product) return <div className="p-12">Product not found</div>

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.images?.[0] || '/placeholder-product.jpg'} alt={product.title} className="w-full h-[560px] object-cover rounded" />
          <div className="mt-4"><ImageGallery images={product.images ?? []} alt={product.title} /></div>
        </div>
        <div>
          <h1 className="text-4xl font-serif text-emar-ivory">{product.title}</h1>
          <p className="text-emar-silver mt-4">{product.short_description || product.description}</p>
          <div className="mt-6 text-emar-ivory font-semibold text-2xl">Rs. {Number(product.price).toLocaleString()}</div>
          <div className="mt-6 flex gap-3">
            <button className="px-6 py-3 bg-emar-gold text-black rounded">Add to Bag</button>
            <a className="px-6 py-3 border border-emar-gold text-emar-ivory rounded" href="#" onClick={(e)=>{e.preventDefault(); window.open(`/api/whatsapp-order`, '_blank')}}>Order via WhatsApp</a>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": product.images ?? [],
        "description": product.short_description ?? product.description,
        "sku": product.slug,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "PKR",
          "price": Number(product.price),
          "availability": "https://schema.org/InStock"
        }
      })}} />

    </main>
  )
}
