import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { GoTriangleRight } from 'react-icons/go'
import { GoTriangleLeft } from 'react-icons/go'
import { cn } from '@/lib/utils'
import { useImperativeHandle, useRef } from 'react'
import { forwardRef } from 'react'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

interface QuestionCarouselProps {
  children: React.ReactNode
}

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest
  return (
    <div className="carousel-button-group absolute left-4 -bottom-2 text-[24px] ">
      <button
        className={cn(
          'hover:bg-slate-400 rounded-full pr-1 text-center',
          currentSlide === 0 ? 'disable' : ''
        )}
        onClick={() => previous()}
      >
        <GoTriangleLeft />
      </button>
      <button
        className="hover:bg-slate-400 rounded-full pl-1 text-center"
        onClick={() => next()}
      >
        <GoTriangleRight />
      </button>
    </div>
  )
}

const QuestionCarousel = forwardRef(
  ({ children }: { children: React.ReactNode }, ref) => {
    const carouselRef = useRef<any>(null)

    useImperativeHandle(ref, () => ({
      goToFirstSlide: () => {
        if (carouselRef.current) {
          console.log('into')
          carouselRef.current.goToSlide(0)
        }
      },
    }))

    return (
      <Carousel
        ref={carouselRef}
        className="w-full h-[40%]"
        responsive={responsive}
        customButtonGroup={<ButtonGroup />}
        arrows={false}
      >
        {children}
      </Carousel>
    )
  }
)

export default QuestionCarousel
