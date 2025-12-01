'use client'

import SignCard from '@/components/sign-card'
import { cn } from '@/lib/utils'
import { Sign } from '@/types/dto/types'
import supabase from '@/utils/supabase/supabase'
import { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'

import Amico from '../../../../../../../public/images/amico.svg'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const sign_types = ['Regulatory signs', 'Warning signs']

const prefix =
  'https://cgtsomijxwpcyqgznjqx.supabase.co/storage/v1/object/public/bienbao//'

function LearnSigns() {
  const [type, setType] = useState<string>(sign_types[0])
  const [signs, setSigns] = useState<Sign[]>([])
  const [search, setSearch] = useState<string>('')
  const t = useTranslations('SignPage')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.rpc('fetch_vietnam_signs', {
          type: type,
        })

        setSigns(data as Sign[])

        console.log(data)
      } catch (error: any) {}
    }

    fetchData()
  }, [type])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.rpc(
        'fetch_vietnam_signs_by_name',
        {
          type: type,
          search_name: search,
        }
      )

      setSigns(data as Sign[])

      console.log(data)
    } catch (error: any) {}
  }
  return (
    <div>
      <div className="max-w-screen-lg mx-auto flex gap-[124px] items-center my-3">
        <div className="max-w-[750px] mx-auto">
          <p className=" text-custom-dark-violet font-bold text-[26px]">
            {t('learnSigns')}
          </p>
          <p className="text-sm text-custom-dark-violet">
            {t('learnSignsDescription')}
          </p>
        </div>
        <Image
          src={Amico}
          alt="something"
          width={126}
          height={120}
          className="w-[126px] h-[120px]"
        />
      </div>

      <div className="max-w-[1400px] mb-5 ">
        <div className="flex gap-2">
          {sign_types.map((item, index) => (
            <button
              key={index}
              onClick={() => setType(item)}
              className={cn(
                'box-content h-[52px] max-w-[180px] font-bold border-transparent text-custom-dark-violet px-3 bg-light-purple-admin border-[5px] rounded-[12px]',
                type === item && 'border-custom-dark-violet'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-h-[760px] rounded-[20px] border-[2px] border-[#A08CE6] pt-6 px-5 ">
        <div className="w-full flex justify-between">
          <p className="font-semibold text-2xl uppercase w-full">
            {t('list')} {type}
          </p>

          <form
            onSubmit={handleSearch}
            className="w-[524px] rounded-[16px] bg-[#F8FAFC] flex gap-2 px-4 py-2 items-center"
          >
            <IoIosSearch width={24} height={24} className="w-6 h-6" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-[#F8FAFC] outline-none border-none"
            />
          </form>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-6 overflow-y-auto max-h-[650px] scrollbar-gutter-stable">
          {signs.map((sign, index) => (
            <SignCard
              key={index}
              id={sign.ma_bien_bao}
              name={sign.ten_bien_bao}
              description={sign.noi_dung}
              url={prefix + sign.id + '.png'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LearnSigns
