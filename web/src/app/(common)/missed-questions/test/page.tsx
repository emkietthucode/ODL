import TestMissedQuestions from '@/components/test-missed-questions'
import Overlay1 from '../../../../../public/images/F8Overlay1.svg'
import Image from 'next/image'
const TestMissedQuestionsPage = () => {
  return (
    <main className="bg-white mx-auto my-auto max-h-full flex justify-center relative">
      <Image
        src={Overlay1}
        alt="Overlay"
        className="absolute top-[140px] left-0 z-10"
      />
      <TestMissedQuestions />
    </main>
  )
}

export default TestMissedQuestionsPage
