import TopAnnouncementBar from '@/components/TopAnnouncementBar'
import StickyGlassHeader from '@/components/StickyGlassHeader'
import CinematicHero from '@/components/Hero/CinematicHero'
import ProductCard from '@/components/ProductCard'
import VIPNewsletter from '@/components/VIPNewsletter'
import FloatingConciergeWidget from '@/components/FloatingConciergeWidget'

export default function Home() {
  return (
    <>
      <TopAnnouncementBar />
      <StickyGlassHeader />
      <main className="min-h-screen">
        <CinematicHero />

        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-serif text-emar-ivory mb-6">THE EMAR COLLECTION</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder product cards; replace with fetched products */}
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-serif text-emar-ivory mb-6">MORE THAN A BRAND</h2>
          <p className="text-emar-silver">A narrative highlighting confidence, royalty, and individuality. Crafted for those who define their signature.</p>
          <button className="mt-6 inline-block px-6 py-3 border border-emar-gold text-emar-ivory hover:bg-emar-gold transition">DISCOVER OUR STORY →</button>
        </section>

        <VIPNewsletter />
      </main>

      <FloatingConciergeWidget />
    </>
  )
}
