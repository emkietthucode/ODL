import ScrollToTopButton from '@/components/scroll-to-top-button'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import HomeImage from '../../../public/images/Home.svg'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Home = () => {
  const t = useTranslations('HomePage')

  return (
    <main className="text-left m-10 mb-40 max-w-full bg-white">
      <div className="max-w-[1200px] mx-auto left-0 p-10 pb-80">
        <h1 className="text-3xl font-bold text-purple w-full text-[36px]">
          ODL - {t('title')}
        </h1>
        <p className="text-gray-700 mt-10 text-[22px] max-w-[640px]">
          {t('description')}
        </p>
        <Link href="/tests">
          <Button
            variant="main"
            size="auto"
            className="text-[28px] h-[54px] ml-20 mt-36 p-[10px] rounded-full shadow-lg w-[246px]"
          >
            Luyện thi ngay
          </Button>
        </Link>

        <div className="absolute top-24 right-0 h-[550px] w-[680px] object-right">
          <Image src={HomeImage} alt="Landing image" />
        </div>
      </div>

      <ScrollToTopButton />
    </main>
  )
}

export default Home
