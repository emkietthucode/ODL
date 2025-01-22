import ScrollToTopButton from '@/components/scroll-to-top-button'
import { Button } from '@/components/ui/button'

const CountrySelection = () => {
  return (
    <main className="max-w-full bg-white">
      <div className="h-screen">
        <div className="flex flex-col justify-between h-full">
          <div className="bg-worldMapImg bg-repeat bg-cover bg-bottom w-full h-screen flex flex-col items-center">
            <div className="flex flex-col justify-center items-center my-[128px]">
              <div className="text-6xl font-extrabold text-purple">
                CHỌN QUỐC GIA
              </div>
              <hr className="w-[450px] h-1 mx-auto my-7 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className="my-10 w-[650px] break text-center text-purple text-2xl font-medium">
                ODL là website ôn thi bằng lái xe đa quốc gia, giúp bạn học và
                thi thử theo quy định của nhiều nước trên thế giới.
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <ScrollToTopButton />
    </main>
  )
}

export default CountrySelection
