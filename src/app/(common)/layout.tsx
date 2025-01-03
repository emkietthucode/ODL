import NavBar from '@/components/navbar'
import Footer from '@/components/footer'

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}

export default CommonLayout
