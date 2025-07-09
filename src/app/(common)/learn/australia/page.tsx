'use client'

import Link from 'next/link'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { GrFormNextLink } from 'react-icons/gr'

const states = [
  {
    name: 'New South Wales',
    slug: 'new-south-wales',
    description: 'Bang đông dân nhất, bao gồm thành phố Sydney.',
    disabled: false,
  },
  {
    name: 'VICTORIA',
    slug: 'victoria',
    description: 'Bang phía đông nam, thủ phủ là Melbourne.',
    disabled: true,
  },
  {
    name: 'QUEENSLAND',
    slug: 'queensland',
    description: 'Bang nhiệt đới phía đông bắc, nổi tiếng với Gold Coast.',
    disabled: true,
  },
  {
    name: 'WESTERN AUSTRALIA',
    slug: 'western-australia',
    description: 'Bang lớn nhất, nằm ở phía tây, thủ phủ là Perth.',
    disabled: true,
  },
  {
    name: 'SOUTH AUSTRALIA',
    slug: 'south-australia',
    description: 'Bang ở trung-nam nước Úc, nổi bật với thành phố Adelaide.',
    disabled: true,
  },
  {
    name: 'TASMANIA',
    slug: 'tasmania',
    description: 'Hòn đảo phía nam, khí hậu mát mẻ quanh năm.',
    disabled: true,
  },
  {
    name: 'CAPITAL TERRITORY',
    slug: 'capital-territory',
    description: 'Vùng thủ đô, nơi đặt trụ sở chính phủ ở Canberra.',
    disabled: true,
  },
  {
    name: 'NORTHERN TERRITORY',
    slug: 'northern-territory',
    description: ' Vùng phía bắc, có khí hậu nhiệt đới và thưa dân cư.',
    disabled: true,
  },
]

function AustraliaHomePage() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const nation = JSON.parse(localStorage.getItem('nation') || '')
    const slug = nation?.slug

    if (!slug) {
      return
    }

    if (!slug.includes('australia')) {
      router.push('/learn')
      return
    }

    router.push(`${pathname}/${slug}`)
  }, [])

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="h-[3px] w-20 rounded-full bg-purple my-5"></div>
      <p className="text-[36px] font-extrabold">TIỂU BANG</p>
      <p className="text-sm font-light max-w-[612px]">
        Mỗi tiểu bang tại Úc có quy định và bộ đề khác nhau. Việc chọn đúng nơi
        cư trú giúp bạn ôn tập sát với bài thi thực tế.
      </p>

      <div className="mt-[70px] mb-[30px] grid grid-cols-4 gap-14">
        {states.map((state, index) => (
          <button
            disabled={state.disabled}
            key={index}
            className="w-[263px] h-[200px] p-6 pt-10 
            flex flex-col justify-between rounded-[10px] border-[2px] border-[#D8D8D8]
            disabled:opacity-50 disabled:cursor-auto"
            onClick={() => {
              router.push(`${pathname}/${state.slug}`)
            }}
          >
            <div className="text-start">
              <p className="text-lg font-bold text-purple">{state.name}</p>
              <p className="text-sm font-light mt-3">{state.description}</p>
            </div>
            <div className="w-full flex justify-end">
              <GrFormNextLink className="text-[#A08CE6] w-6 h-6" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AustraliaHomePage
