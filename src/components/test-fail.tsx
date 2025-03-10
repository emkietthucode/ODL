import { MdCancel } from 'react-icons/md'
import { CiWarning } from 'react-icons/ci'
import { Button } from './ui/button'
import Image from 'next/image'
import F722TestFail from '../../public/images/f7.2.2-fail.svg'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
const TestFail = ({
  totalQuestion = 0,
  requiredCorrectAnswer = 0,
  userCorrectAnswers = 0,
  isFailOnSpecialQuestion = false,
}) => {
  const t = useTranslations('ResultPage')
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-10 my-[64px] w-[60%] justify-center items-center">
      <div className="flex rounded-[64px] bg-light-purple-admin w-[70%] h-[350px] relative">
        <div className="w-[50%] flex flex-col items-center  mt-[32px]">
          <MdCancel className="text-custom-brown text-4xl ml-[280px]" />
          <div className="text-custom-brown font-bold text-4xl">
            {t('fail')}
          </div>
          {isFailOnSpecialQuestion && (
            <div className="flex gap-2 text-yellow-600 justify-end items-end my-5">
              <CiWarning className="text-xl" />
              <div className="font-medium text-sm">
                {t('failSpecialQuestion')}
              </div>
            </div>
          )}
        </div>
        <div className="w-[50%] flex flex-col items-center">
          <div className="flex flex-col gap-5 p-7 w-full mb-8">
            <div className="flex justify-between text-purple">
              <div>{t('totalQuestion')}</div>
              <div className="font-bold">{totalQuestion}</div>
            </div>
            <div className="flex justify-between text-purple">
              <div>{t('requirement')}</div>
              <div className="font-bold">
                {requiredCorrectAnswer + '/' + totalQuestion}
              </div>
            </div>
            <div className="flex justify-between text-purple">
              <div>{t('correctAnswers')}</div>
              <div className="font-bold">
                {userCorrectAnswers + '/' + totalQuestion}
              </div>
            </div>
            <div className="flex justify-between text-purple">
              <div>{t('wrongAnswers')}</div>
              <div className="font-bold">
                {totalQuestion - userCorrectAnswers + '/' + totalQuestion}
              </div>
            </div>
          </div>
          <Button
            variant="main"
            className="font-bold text-2xl rounded-full w-[75%]"
            onClick={() => router.push(`${pathname}/detail`)}
          >
            {t('showDetails')}
          </Button>
        </div>
        <Image
          src={F722TestFail}
          alt=""
          className="absolute -bottom-[80px] -left-[156px]"
        />
      </div>
      <div className="my-2"></div>
    </div>
  )
}

export default TestFail
