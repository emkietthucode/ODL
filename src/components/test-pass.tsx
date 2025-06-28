import { IoCheckmarkCircle } from 'react-icons/io5'
import { Button } from './ui/button'
import Image from 'next/image'
import F721TestPass from '../../public/images/f7.2.1-pass.svg'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
const TestPass = ({
  totalQuestion = 0,
  requiredCorrectAnswer = 0,
  userCorrectAnswers = 0,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('ResultPage')
  return (
    <div className="flex flex-col gap-10 mt-[32px] w-[60%] justify-center items-center">
      <div className="flex rounded-[64px] bg-custom-light-violet w-[800px] h-[350px] relative">
        <div className="w-[50%] flex flex-col items-center mt-[32px]">
          <IoCheckmarkCircle className="text-custom-green text-4xl ml-[120px]" />
          <div className="text-custom-green font-extrabold text-5xl uppercase  ">
            {t('pass')}
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-center">
          <div className="flex flex-col gap-3 p-6 w-[350px]">
            <div className="flex justify-between text-purple p-2">
              <div>{t('totalQuestion')}</div>
              <div className="font-semibold text-lg">{totalQuestion}</div>
            </div>
            <div className="flex justify-between text-purple p-2">
              <div>{t('requirement')}</div>
              <div className="font-semibold text-lg">
                {requiredCorrectAnswer + '/' + totalQuestion}
              </div>
            </div>
            <div className="flex justify-between text-purple p-2">
              <div>{t('correctAnswers')}</div>
              <div className="font-semibold text-lg">
                {userCorrectAnswers + '/' + totalQuestion}
              </div>
            </div>
            <div className="flex justify-between text-purple p-2">
              <div>{t('wrongAnswers')}</div>
              <div className="font-semibold text-lg">
                {totalQuestion - userCorrectAnswers + '/' + totalQuestion}
              </div>
            </div>
          </div>
          <Link href={`${pathname}/detail`}>
            <Button
              variant="main"
              className="font-bold text-2xl rounded-full w-[240px] h-[40px] uppercase bg-custom-normal-violet twx"
            >
              {t('showDetails')}
            </Button>
          </Link>
        </div>
        <Image
          src={F721TestPass}
          alt=""
          className="absolute -bottom-[50px] -left-[156px]"
        />
      </div>
      <div className="my-2"></div>
    </div>
  )
}

export default TestPass
