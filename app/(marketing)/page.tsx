import Hero from '../../components/Hero'
import AboutSection from '../../components/AboutSection'
import HorizontalGallery from '../../components/HorizontalGallery'
import AmenitiesShowcase from '@/components/AmenitiesShowcase'
import ArchitectureRevealZoom from '@/components/ArchitectureRevealZoom'

export default function Home() {
  return (
    <main className="relative flex flex-col">
      <Hero />

      {/* About section rises as a semi-circle over the Hero */}
      <div className="relative z-50">
        <AboutSection />
      </div>

      {/* Horizontal scrolling gallery for featured estates */}
      <div className="relative z-50">
        <HorizontalGallery />
      </div>
      <AmenitiesShowcase />
      <ArchitectureRevealZoom />
    </main>
  )
}
