import { IoCheckmarkCircle } from 'react-icons/io5'
import { Button } from './ui/button'
import Image from 'next/image'
import F721TestPass from '../../public/images/f7.2.1-pass.svg'
import { usePathname, useRouter } from 'next/navigation'
const TestPass = ({
  totalQuestion = 0,
  requiredCorrectAnswer = 0,
  userCorrectAnswers = 0,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-10 my-[64px] w-[60%] justify-center items-center">
      <div className="flex rounded-[64px] bg-light-purple-admin w-[70%] h-[350px] relative">
        <div className="w-[50%] flex flex-col items-center  mt-[32px]">
          <IoCheckmarkCircle className="text-custom-green text-4xl ml-[120px]" />
          <div className="text-custom-green font-bold text-5xl">ĐẠT</div>
        </div>
        <div className="w-[50%] flex flex-col items-center">
          <div className="flex flex-col gap-5 p-7 w-full mb-8">
            <div className="flex justify-between text-purple">
              <div>Tổng số câu hỏi</div>
              <div className="font-bold">{totalQuestion}</div>
            </div>
            <div className="flex justify-between text-purple">
              <div>Yêu cầu</div>
              <div className="font-bold">
                {requiredCorrectAnswer + '/' + totalQuestion}
              </div>
            </div>
            <div className="flex justify-between text-purple">
              <div>Số câu đúng</div>
              <div className="font-bold">
                {userCorrectAnswers + '/' + totalQuestion}
              </div>
            </div>
            <div className="flex justify-between text-purple">
              <div>Số câu sai</div>
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
            XEM CHI TIẾT
          </Button>
        </div>
        <Image
          src={F721TestPass}
          alt=""
          className="absolute -bottom-[80px] -left-[156px]"
        />
      </div>
      <div className="my-2"></div>
      <div className="flex flex-col gap-3 text-blue-400 w-full justify-center items-center">
        <hr className="h-1 my-5 bg-purple border-0 dark:bg-purple w-full"></hr>
        <div className="flex justify-between items-center gap-[96px] w-[60%] font-medium">
          <div>Chưa hài lòng với kết quả? Làm bài lại ngay</div>
          <Button className="bg-blue-100 hover:bg-blue-100/90 rounded-2xl text-xs text-blue-400 h-full shadow-md">
            LÀM BÀI LẠI
          </Button>
        </div>
        <div className="flex justify-between items-center gap-[96px] w-[60%] font-medium">
          <div>Chúng tôi còn nhiều đề khác, xem ngay!</div>
          <Button className="bg-blue-100 hover:bg-blue-100/90 rounded-2xl text-xs text-blue-400 h-full shadow-md">
            LÀM ĐỀ KHÁC
          </Button>
        </div>
        <div className="flex justify-between items-center gap-[96px] w-[60%] font-medium">
          <div>Ôn tập lại những câu mà bạn đã làm sai</div>
          <Button className="bg-blue-100 hover:bg-blue-100/90 rounded-2xl text-xs text-blue-400 h-full shadow-md">
            CHALLENGE BANK
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TestPass
