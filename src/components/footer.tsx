import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer className="w-full bg-light-purple p-[60px]">
      <div className="w-full h-0.5 bg-white mt-9"></div>

      <div className="flex justify-between gap-6">
        <div className="text-[#60548A] flex-1">
          <h4 className="font-medium mt-6 mb-5">{t('addressTitle')}</h4>
          <ul className="max-w-[280px]">
            <li className="opacity-60 font-normal">{t('address')}</li>
          </ul>
        </div>

        <div className="text-[#60548A] flex-1">
          <h4 className="font-medium mt-6 mb-5">{t('informationTitle')}</h4>
          <ul>
            <Link href="/tests" className="opacity-60 font-normal">
              {t('test')}
            </Link>
            <Link href="/learn" className="opacity-60 font-normal">
              {t('learn')}
            </Link>
            <Link href="/learning-path" className="opacity-60 font-normal">
              {t('roadmap')}
            </Link>
            <Link href="/contact" className="opacity-60 font-normal">
              {t('contactTitle')}
            </Link>
          </ul>
        </div>

        <div className="text-[#60548A] flex-1">
          <h4 className="font-medium mt-6 mb-5">{t('contactTitle')}</h4>
          <ul>
            <li className="opacity-60 font-normal">+1 891 989-11-91</li>
            <li className="opacity-60 font-normal">help@odl.com</li>
          </ul>
        </div>

        <div className="flex text-[#60548A] opacity-80 gap-2 mt-6">
          <Link
            href="/"
            className={twMerge(
              buttonVariants({ variant: 'outline' }),
              'rounded-full p-2 aspect-square'
            )}
          >
            <FaFacebookF />
          </Link>

          <Link
            href="/"
            className={twMerge(
              buttonVariants({ variant: 'outline' }),
              'rounded-full p-2 aspect-square'
            )}
          >
            <FaInstagram />
          </Link>

          <Link
            href="/"
            className={twMerge(
              buttonVariants({ variant: 'outline' }),
              'rounded-full p-2 aspect-square'
            )}
          >
            <FaYoutube />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
