import { MdCancel } from 'react-icons/md'
import { CiWarning } from 'react-icons/ci'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import F722TestFail from '../../public/images/f7.2.2-fail.svg'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
const TestFail = ({
  totalQuestion = 0,
  requiredCorrectAnswer = 0,
  userCorrectAnswers = 0,
  isFailOnSpecialQuestion = false,
}) => {
  const t = useTranslations('ResultPage')
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-10 mt-[32px] w-[60%] justify-center items-center">
      <div className="flex rounded-[64px] bg-custom-light-violet w-[800px] h-[350px] relative">
        <div className="w-[55%] flex flex-col items-center mt-[32px]">
          <MdCancel className="text-custom-brown text-4xl ml-[350px]" />
          <div className="text-custom-brown font-extrabold text-5xl uppercase">
            {t('fail')}
          </div>
          {isFailOnSpecialQuestion && (
            <div className="flex gap-2 text-yellow-600 justify-center self-end items-center my-2">
              <CiWarning className="text-xl" />
              <div className="font-medium text-lg">
                {t('failSpecialQuestion')}
              </div>
            </div>
          )}
        </div>
        <div className="w-[45%] flex flex-col items-center">
          <div className="flex flex-col gap-3 p-6 w-[340px]">
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
          src={F722TestFail}
          alt=""
          className="absolute -bottom-[50px] -left-[156px]"
        />
      </div>
      <div className="my-2"></div>
    </div>
  )
}

export default TestFail
