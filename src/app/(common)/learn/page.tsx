import ScrollToTopButton from '@/components/scroll-to-top-button'
import CountrySelection from '@/components/select-country'

const LearnPage = () => {
  return (
    <main className="max-w-[80%] bg-white mx-auto h-full">
      <CountrySelection />
      <ScrollToTopButton />
    </main>
  )
}

export default LearnPage
