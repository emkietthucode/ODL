import NavBar from '@/components/navbar'
import Footer from '@/components/footer'

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <NavBar />
      </div>
      {children}
      <Footer />
    </div>
  )
}

export default CommonLayout
