import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-20 bg-[linear-gradient(180deg, rgba(8,8,10,1), rgba(0,0,0,0))] py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-emar-gold font-serif text-2xl">EMAR</div>
          <div className="text-emar-silver mt-2">DEFINE YOUR SIGNATURE</div>
          <div className="text-emar-silver mt-4">Support: emar.official01@gmail.com</div>
          <div className="text-emar-silver">Orders (WhatsApp): +92 325 7851162</div>
          <div className="text-emar-silver">VIP Concierge: +92 325 8581251</div>
        </div>

        <div>
          <h4 className="text-emar-ivory font-semibold mb-2">Shop</h4>
          <ul className="text-emar-silver">
            <li>Collections</li>
            <li>Best Sellers</li>
            <li>Signature</li>
          </ul>
        </div>

        <div>
          <h4 className="text-emar-ivory font-semibold mb-2">Company</h4>
          <ul className="text-emar-silver">
            <li>Brand Story</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <h4 className="text-emar-ivory font-semibold mb-2">Follow</h4>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/emar._.official" target="_blank" rel="noreferrer" className="text-emar-silver">Instagram</a>
            <a href="https://www.facebook.com/people/EMAR/61592175783474/" target="_blank" rel="noreferrer" className="text-emar-silver">Facebook</a>
          </div>
        </div>
      </div>

      <div className="border-t border-emar-border mt-8 pt-6 text-center text-emar-silver">© 2026 EMAR. All rights reserved.</div>
    </footer>
  )
}
