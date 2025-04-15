import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { cn } from '@/lib/utils'
import { useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { forwardRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

const ButtonGroup = ({ next, previous, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest
  return (
    <div className="carousel-button-group w-full absolute text-[24px]">
      <button
        disabled={currentSlide === 0}
        className={cn(
          'text-center w-8 h-8 text-[#B1B1B1] absolute top-1/2 -translate-y-1/2 -left-3',
          currentSlide === 0 ? 'disable' : ''
        )}
        onClick={() => previous()}
      >
        <ChevronLeft className="hover:text-purple" />
      </button>
      <button
        className="text-center w-8 h-8 text-[#B1B1B1] absolute top-1/2 -translate-y-1/2 -right-0"
        onClick={() => next()}
      >
        <ChevronRight className="hover:text-purple" />
      </button>
    </div>
  )
}

const QuestionCarousel = forwardRef(
  (
    {
      children,
      initialSlide = 0,
    }: { children: React.ReactNode; initialSlide?: number },
    ref
  ) => {
    const carouselRef = useRef<any>(null)

    useLayoutEffect(() => {
      if (carouselRef.current && initialSlide > 0) {
        const timer = setTimeout(() => {
          try {
            carouselRef.current.goToSlide(initialSlide, false)
          } catch (error) {
            console.error('Error calling goToSlide:', error)
          }
        }, 100)

        return () => clearTimeout(timer)
      }
    }, [initialSlide])

    // useImperativeHandle(ref, () => ({
    //   goToFirstSlide: () => {
    //     if (carouselRef.current) {
    //       carouselRef.current.goToSlide(0)
    //     }
    //   },
    // }))

    return (
      <Carousel
        ref={carouselRef}
        className="w-full h-full px-4"
        responsive={responsive}
        arrows={false}
        customButtonGroup={<ButtonGroup />}
      >
        {children}
      </Carousel>
    )
  }
)

export default QuestionCarousel
