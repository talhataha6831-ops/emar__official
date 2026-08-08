import React from 'react'
import { motion } from 'framer-motion'
import BestSellerBadge from './BestSellerBadge'
import { executeWhatsAppOrder } from '@/services/whatsappService'

export default function ProductCardAdvanced({ product }: { product: any }){
  const price = Number(product?.price ?? 0)
  const image = product?.images?.[0] || '/placeholder-product.jpg'
  const alt = product?.title || 'EMAR product'

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-emar-card border border-emar-border p-4 rounded-lg shadow-gold-glow">
      <div className="relative">
        <img src={image} alt={alt} loading="lazy" className="w-full h-64 object-cover rounded-md mb-4" />
        <div className="absolute top-3 left-3">{product?.is_best_seller ? <BestSellerBadge /> : null}</div>
      </div>
      <h3 className="font-serif text-emar-ivory">{product?.title}</h3>
      <div className="mt-2 text-emar-silver">Rs. {price.toLocaleString()}</div>
      <div className="mt-4 flex gap-2" role="group" aria-label={`Actions for ${product?.title}`}>
        <button className="px-4 py-2 bg-emar-gold text-black rounded" onClick={()=> executeWhatsAppOrder({ productId: product.id, productName: product.title, price, variantDetails: 'Standard' })}>ORDER VIA WHATSAPP</button>
        <a href={`/products/${product?.slug || ''}`} className="px-4 py-2 border border-emar-gold text-emar-ivory rounded">View</a>
      </div>
    </motion.div>
  )
}
