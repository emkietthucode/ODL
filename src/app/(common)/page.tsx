import ScrollToTopButton from '@/components/scroll-to-top-button'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import LandingImage from '../../../public/images/Landingpage.png'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Home = () => {
  const t = useTranslations('HomePage')

  return (
    <main className="text-left m-10  max-w-full bg-white">
      <div className="max-w-[1200px] mx-auto left-0 p-10 pb-80">
        <h1 className="text-3xl font-bold text-purple w-full text-[40px]">
          ODL - {t('title')}
        </h1>
        <p className="text-gray-700 mt-12 text-[28px] max-w-[740px]">
          {t('description')}
        </p>
        <Link href="/tests">
          <Button
            variant="main"
            size="auto"
            className="text-4xl mt-20 px-6 py-3 rounded-full shadow-lg w-fit"
          >
            Luyện thi ngay
          </Button>
        </Link>

        <div className="absolute top-32 right-0 h-[800px] w-[800px] object-right">
          <Image src={LandingImage} alt="Landing image" />
        </div>
      </div>

      <ScrollToTopButton />
    </main>
  )
}

export default Home
