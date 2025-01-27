import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import ToasterProvider from '@/providers/toaster-provider'

function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ToasterProvider /> {children}
    </div>
  )
}

export default TestLayout
