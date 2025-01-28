import ScrollToTopButton from '@/components/scroll-to-top-button'
import TestPass from '@/components/test-pass'
import TestFail from '@/components/test-fail'

const ResultPage = () => {
  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col justify-around items-center h-full ">
        <TestFail />
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default ResultPage
