'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import Pana from '../../../../../../public/images/pana.svg'
import Card2 from '../../../../../../public/images/f11LearningCardIcon2.svg'
import Card3 from '../../../../../../public/images/f11LearningCardIcon3.svg'
import Card4 from '../../../../../../public/images/f11LearningCardIcon4.svg'

const TestsCategoryPage = () => {
  const t = useTranslations('LearnPage')
  const router = useRouter()
  const slug = JSON.parse(localStorage.getItem('nation') || '')?.slug
  const pathname = usePathname()

  return (
    <div className="mt-8">
      <div className="w-full h-[332px] bg-[#A08CE6] text-white py-[46px] px-[140px] flex justify-between">
        <div>
          <p className="font-bold text-[28px]">{t('start')}</p>
          <p className="max-w-[480px] font-medium text-sm mt-[41px] mb-8">
            {t('startDescription')}
          </p>
          <button
            onClick={() => router.push('/learning-path/australia')}
            className="w-[135px] h-[49px] bg-white text-purple font-bold text-2xl mx-auto block"
          >
            {t('startButton')}
          </button>
        </div>
        <Image src={Pana} alt="Pana" className="w-[371px] h-[234px]" />
      </div>

      <p className="font-bold text-[28px] text-[#5CAAE6] mx-auto mt-[80px] mb-8 w-full text-center">
        {t('learning')}
      </p>
      <p className="max-w-[632px] text-center mx-auto mb-[100px] ">
        {t('learningDescription')}
      </p>

      <div className="mx-auto flex gap-[45px] mb-[145px] justify-center">
        <Link
          href={`${pathname}/signs`}
          className="w-[250px] h-[350px] shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)] px-4 py-7 flex flex-col "
        >
          <Image src={Card2} alt="logo" width={45} height={45} />

          <div className="text-[#7869AD] text-sm mt-[120px]">
            <p className="font-semibold">{t('signs')}</p>
            <p className="mt-4">{t('signsDescription')}</p>
          </div>
        </Link>

        <div className="opacity-50 w-[250px] h-[350px] shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)] px-4 py-7 flex flex-col">
          <Image src={Card3} alt="logo" width={45} height={45} />

          <div className="text-[#7869AD] text-sm mt-[120px]">
            <p className="font-semibold">{t('criticalQuestions')}</p>
            <p className="mt-4">{t('criticalQuestionsDescription')}</p>
          </div>
        </div>

        <Link
          href="/missed-questions"
          className="w-[250px] h-[350px] shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)] px-4 py-7 flex flex-col"
        >
          <Image src={Card4} alt="logo" width={45} height={45} />

          <div className="text-[#7869AD] text-sm mt-[120px]">
            <p className="font-semibold">{t('challengeBank')}</p>

            <p className="mt-4">{t('challengeBankDescription')}</p>
          </div>
        </Link>
      </div>

      <div className="w-full bg-[#E8F5FF] px-40 pt-[90px] pb-[116px] flex items-center justify-between">
        <div>
          <p className="text-[#8070B8] font-bold text-[28px]">
            {t('readyToTest')}
          </p>

          <p className="text-sm max-w-[674px] mt-7">
            {t('readyToTestDescription')}
          </p>
        </div>

        <button
          onClick={() => router.push('/tests/australia')}
          className="w-[189px] h-[53px] rounded-[16px] text-white bg-purple text-xl font-medium"
        >
          {t('testButton')}
        </button>
      </div>
    </div>
  )
}

export default TestsCategoryPage
