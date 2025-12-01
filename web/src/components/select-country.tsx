'use client'
import SelectCountryVietNam from '../../public/images/select-country-vietnam.svg'
import SelectCountryAus from '../../public/images/select-country-aus.svg'
import { ChevronsRight } from 'lucide-react'
import { Montserrat_Alternates } from 'next/font/google'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const montserratAlternates = Montserrat_Alternates({
  weight: '700',
  subsets: ['vietnamese'],
})

const CountrySelection = () => {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('ChooseRegionPage')

  const handleCountrySelect = (country: 'vietnam' | 'australia') => {
    localStorage.setItem('selectedCountry', country)
    if (country === 'vietnam') {
      router.push('/tests/vietnam')
    } else {
      router.push('/tests/australia/new-south-wales')
    }
  }
  return (
    <div className="flex flex-col justify-between h-[900px]">
      <div className="bg-worldMapImg bg-repeat bg-center bg-fixed w-full h-screen flex flex-col items-center px-4 max-w-[100vw]">
        <div className="flex flex-col justify-center items-center my-[32px]">
          <div className="text-4xl font-extrabold text-purple uppercase">
            {t('chooseRegion')}
          </div>
          <hr className="w-[320px] h-1 mx-auto my-5 bg-purple border-0 rounded dark:bg-purple"></hr>
          <div className="w-[550px] break text-center text-purple text-base font-medium">
            {t('description')}
          </div>
        </div>
        <div className="flex flex-col gap-[64px] mb-[64px] w-[90%]">
          <div className="flex justify-between">
            <div className="flex flex-col w-[50%]">
              <hr className="w-[100px] h-1 mb-5 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div
                className={`text-3xl ${montserratAlternates.className} uppercase`}
              >
                {t('vnTitle')}
              </div>
              <div className="mt-10 mb-5 text-base">{t('vnDescription')}</div>
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => handleCountrySelect('vietnam')}
              >
                <div
                  className={`underline text-purple text-xl ${montserratAlternates.className}`}
                >
                  {t('startButton')}
                </div>
                <ChevronsRight className="text-purple" />
              </div>
            </div>
            <Image className="" src={SelectCountryVietNam} alt="" />
          </div>
          <div className="flex justify-between">
            <Image className="" src={SelectCountryAus} alt="" />
            <div className="flex flex-col w-[50%]">
              <hr className="w-[100px] h-1 mb-5 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div
                className={`text-3xl ${montserratAlternates.className} uppercase`}
              >
                {t('ausTitle')}
              </div>
              <div className="mt-10 mb-5 text-base">{t('ausDescription')}</div>
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => handleCountrySelect('australia')}
              >
                <div
                  className={`underline text-purple text-xl ${montserratAlternates.className}`}
                >
                  {t('startButton')}
                </div>
                <ChevronsRight className="text-purple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountrySelection
