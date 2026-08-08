import React from 'react'
import { executeWhatsAppOrder } from '@/services/whatsappService'

const mockProduct = {
  id: '0000-0000',
  title: 'EMAR Signature Piece',
  price: 12500,
  image: '/placeholder-product.jpg'
}

export default function ProductCard(){
  const onOrder = async () => {
    await executeWhatsAppOrder({
      productId: mockProduct.id,
      productName: mockProduct.title,
      price: mockProduct.price,
      variantDetails: 'Standard'
    })
  }

  return (
    <div className="bg-emar-card border border-emar-border p-4 rounded-lg shadow-gold-glow">
      <div className="h-64 bg-[url('/placeholder-product.jpg')] bg-cover bg-center rounded-md mb-4" />
      <h3 className="font-serif text-emar-ivory">{mockProduct.title}</h3>
      <div className="mt-2 text-emar-silver">Rs. {mockProduct.price.toLocaleString()}</div>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-emar-gold text-black rounded" onClick={onOrder}>ORDER VIA WHATSAPP</button>
        <button className="px-4 py-2 border border-emar-gold text-emar-ivory rounded">QUICK VIEW</button>
      </div>
    </div>
  )
}
