import CountrySelection from '@/components/select-country'
import ScrollToTopButton from '@/components/scroll-to-top-button'

function CategoryPage() {
  return (
    <main className="max-w-[80%] bg-white mx-auto h-full">
      <CountrySelection />
      <ScrollToTopButton />
    </main>
  )
}

export default CategoryPage
