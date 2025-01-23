import ScrollToTopButton from '@/components/scroll-to-top-button'
import SelectCountry from '@/components/select-country'

const CountrySelection = () => {
  return (
    <main className="max-w-[80%] bg-white mx-auto h-full">
      <SelectCountry />
      <ScrollToTopButton />
    </main>
  )
}

export default CountrySelection
