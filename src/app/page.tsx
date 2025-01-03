import ScrollToTopButton from '@/components/scroll-to-top-button'
import { Button } from '../components/ui/button'

const Home = () => {
  return (
    <main className="text-left m-10 p-10 bg-white">
      <div>
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold text-purple w-full text-[40px]">
            ODL - Chinh phục tay lái, vượt mọi giới hạn!
          </h1>
          <p className="text-gray-700 mt-12 text-[28px] max-w-[760px]">
            ODL mang đến giải pháp ôn thi bằng lái xe nhanh chóng và tiện lợi,
            giúp bạn học mọi lúc, mọi nơi. Hệ thống bài thi sát thực tế và hỗ
            trợ đa quốc gia, ODL đồng hành cùng bạn trên hành trình chinh phục
            kỳ thi lái xe dễ dàng nhất.
          </p>

          <Button
            variant="main"
            size="auto"
            className="text-4xl mt-20 px-6 py-3 rounded-full shadow-lg w-fit"
          >
            Luyện thi ngay
          </Button>
        </div>
      </div>

      <div className="mt-12">
        {/* <img src="car-illustration.png" alt="Driving School" className="w-full max-w-md" /> */}
      </div>

      <ScrollToTopButton />
    </main>
  )
}

export default Home
