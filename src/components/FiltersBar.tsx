import React from 'react'

export default function FiltersBar({ selected, onSelect }: { selected: string | null; onSelect: (s: string | null) => void }){
  const items = [
    { key: null, label: 'All' },
    { key: 'featured', label: 'Featured' },
    { key: 'best', label: 'Best Sellers' },
    { key: 'signature', label: 'Signature' },
  ]

  return (
    <div className="flex flex-wrap gap-3 items-center mb-6" role="tablist" aria-label="Product filters">
      {items.map(i => (
        <button
          key={String(i.key)}
          role="tab"
          aria-selected={selected === i.key}
          onClick={() => onSelect(i.key as any)}
          className={`px-4 py-2 rounded-full text-sm ${selected === i.key ? 'bg-emar-gold text-black' : 'border border-emar-border text-emar-ivory bg-[rgba(255,255,255,0.01)]'}`}
        >
          {i.label}
        </button>
      ))}
    </div>
  )
}
