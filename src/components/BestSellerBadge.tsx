import React from 'react'

export default function BestSellerBadge({ discount }: { discount?: number }){
  if(!discount) return <div className="bg-emar-gold text-black px-2 py-1 text-xs rounded">Best Seller</div>
  return <div className="bg-emar-gold text-black px-2 py-1 text-xs rounded">{discount}% OFF</div>
}
