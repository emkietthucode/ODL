import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { cn } from '@/lib/utils'
import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
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
      className,
      secondary = false,
      totalSlide = 0,
    }: {
      children: React.ReactNode
      initialSlide?: number
      className?: string
      secondary?: boolean
      totalSlide?: number
    },
    ref
  ) => {
    const carouselRef = useRef<any>(null)
    useLayoutEffect(() => {
      if (carouselRef.current && initialSlide > 0) {
        const timer = setTimeout(() => {
          try {
            carouselRef.current.goToSlide(initialSlide, false)
          } catch (error) {
            console.log('Error calling goToSlide:', error)
          }
        }, 100)

        return () => clearTimeout(timer)
      }
    }, [initialSlide])

    const SecondButtonGroup = ({ next, previous, ...rest }: any) => {
      const isLastSlide = totalSlide - 1 === rest.carouselState.currentSlide
      const {
        carouselState: { currentSlide },
      } = rest
      return (
        <div className="carousel-button-group w-full h-[24px] absolute text-[24px] bottom-4">
          <button
            disabled={currentSlide === 0}
            className={cn(
              'disabled:opacity-50 disabled:cursor-default cursor-pointer text-center bg-[#7869AD] w-6 h-6 text-white absolute left-2 rounded-full hover:opacity-80',
              currentSlide === 0 ? 'disable' : ''
            )}
            onClick={() => previous()}
          >
            <ChevronLeft />
          </button>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px]">
            {currentSlide + 1} / {totalSlide}
          </div>
          <button
            className="disabled:opacity-50 disabled:cursor-default cursor-pointer text-center bg-[#7869AD] w-6 h-6 text-white absolute right-2 rounded-full hover:opacity-80"
            disabled={isLastSlide}
            onClick={() => next()}
          >
            <ChevronRight />
          </button>
        </div>
      )
    }

    return (
      <Carousel
        ref={carouselRef}
        className={cn('w-full h-full', className)}
        responsive={responsive}
        arrows={false}
        customButtonGroup={secondary ? <SecondButtonGroup /> : <ButtonGroup />}
      >
        {children}
      </Carousel>
    )
  }
)

export default QuestionCarousel
