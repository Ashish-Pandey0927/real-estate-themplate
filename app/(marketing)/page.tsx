import Hero from '../../components/Hero'
import AboutSection from '../../components/AboutSection'
import HorizontalGallery from '../../components/HorizontalGallery'
import AmenitiesShowcase from '@/components/AmenitiesShowcase'
import ArchitectureRevealZoom from '@/components/ArchitectureRevealZoom'
import RealEstateServices from '@/components/RealEstateServices'
import RealEstateFooter from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative flex flex-col">
      <div className='relative z-10'>

        <Hero />
      </div>

      {/* About section rises as a semi-circle over the Hero */}
      <div className="relative z-50">
        <AboutSection />
      </div>

      {/* Horizontal scrolling gallery for featured estates */}
      <div className="relative z-50">
        <HorizontalGallery />
      </div>
      <AmenitiesShowcase />
      <section className="relative z-20">
        <ArchitectureRevealZoom />
      </section>
      <section className="relative z-30">
        <RealEstateServices />
      </section>

      <RealEstateFooter />
    </main>
  )
}
