'use client'
import { Button } from './ui/button'
import { ArrowUp } from 'lucide-react'

import {
  motion,
  Variants,
  useAnimationControls,
  useScroll,
} from 'framer-motion'
import { useEffect } from 'react'

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
}

function ScrollToTopButton() {
  const { scrollYProgress } = useScroll()
  const controls = useAnimationControls()

  const isBrowser = typeof window !== 'undefined'

  const scrollToTop = () => {
    if (!isBrowser) {
      return
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    return scrollYProgress.on('change', (latestValue) => {
      if (latestValue > 0.5) {
        controls.start('show')
      } else {
        controls.start('hide')
      }
    })
  })

  return (
    // <Button
    //   onClick={scrollToTop}
    //   variant="main"
    //   className="fixed bottom-4 right-4 rounded-full p-2 aspect-square"
    // >
    //   <ArrowUp />
    // </Button>

    <motion.button
      onClick={scrollToTop}
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={controls}
      className="fixed bottom-4 right-4 rounded-full p-2 aspect-square bg-purple text-white"
    >
      <ArrowUp />
    </motion.button>
  )
}

export default ScrollToTopButton
