'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoCloseCircle } from 'react-icons/io5'

import PassImage from '../../../../../../public/images/f7.2.1-pass.svg'
import FailImage from '../../../../../../public/images/f7.2.2-fail.svg'
import { useEffect, useState } from 'react'
import supabase from '@/utils/supabase/supabase'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

function TestResult() {
  const { testResultId } = useParams<{ testResultId: string }>()
  const [result, setResult] = useState<{
    so_luong_cau_hoi: number
    so_cau_dung: number
    pass: boolean
    yeu_cau: number
    ma_de_thi: string
    ten_hang_bang: string
    ma_chuong: string
  }>({
    so_luong_cau_hoi: 0,
    so_cau_dung: 0,
    pass: false,
    yeu_cau: 0,
    ma_de_thi: '',
    ten_hang_bang: '',
    ma_chuong: '',
  })
  const pathname = usePathname()
  const selectedCountry = localStorage.getItem('selectedCountry') || 'vietnam'
  const t = useTranslations('TestResultPage')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.rpc('fetch_test_result', {
          result_id: testResultId,
        })

        if (selectedCountry.includes('australia')) {
          if (data.ten_hang_bang == 'RIDER (R)') {
            data.ten_hang_bang = 'rider'
          } else {
            data.ten_hang_bang = 'car'
          }
        }

        setResult(data)
      } catch (error: any) {
        console.log('Error in TestResult:', error)
      }
    }

    fetchData()
  }, [testResultId])

  console.log(result)

  return (
    <div className="w-full max-w-screen-lg mx-auto mt-[60px]">
      <div className="w-[800px] h-[340px] mx-auto rounded-[60px] bg-[#F6F4FD] pr-[72px] flex relative pt-[34px] pb-[40px]">
        <p
          className={cn(
            'text-[44px] font-extrabold mx-auto relative text-center',
            result.pass ? 'text-[#93B597]' : 'text-[#C88572]'
          )}
        >
          {result.pass ? t('passed') : t('fail')}
          {result.pass ? (
            <FaCircleCheck
              fill="#93B597"
              className="w-8 h-8 absolute -top-4 -right-9"
            />
          ) : (
            <IoCloseCircle
              fill="#C88572"
              className="w-8 h-8 absolute -top-4 -right-9"
            />
          )}
        </p>

        <div className="flex flex-col">
          <div className="flex items-center gap-[96px] mb-7">
            <p className="text-[#7869AD] flex-1">{t('totalQuestion')}</p>
            <p className="font-semibold text-purple text-lg text-end">
              {result.so_luong_cau_hoi}
            </p>
          </div>

          <div className="flex items-center gap-[96px] mb-7">
            <p className="text-[#7869AD] flex-1">{t('requirement')}</p>
            <p className="font-semibold text-purple text-lg text-end">
              {result.yeu_cau}/{result.so_luong_cau_hoi}
            </p>
          </div>

          <div className="flex items-center gap-[96px] mb-7">
            <p className="text-[#7869AD] flex-1">{t('correctAnswers')}</p>
            <p className="font-semibold text-custom-green text-lg text-end">
              {result.so_cau_dung}/{result.so_luong_cau_hoi}
            </p>
          </div>

          <div className="flex items-center gap-[96px] mb-7">
            <p className="text-[#7869AD] flex-1">{t('wrongAnswers')}</p>
            <p className="font-semibold text-custom-brown text-lg text-end">
              {result.so_luong_cau_hoi - result.so_cau_dung}/
              {result.so_luong_cau_hoi}
            </p>
          </div>

          <Link
            href={pathname + '/details'}
            className="w-60 h-10 text-2xl font-bold mx-auto bg-[#A08CE6] text-white rounded-full flex items-center justify-center"
          >
            {t('showDetails')}
          </Link>
        </div>

        <Image
          src={result.pass ? PassImage : FailImage}
          alt="Pass/Failed"
          className="absolute top-[90px] -left-44"
        />
      </div>

      <div className="w-full h-[3px] mt-[56px] bg-[#907ECF] mb-[14px]"></div>

      <div className="w-[661px] mx-auto space-y-7 my-7">
        <div className="flex justify-between items-center">
          <p className="text-[#5297CC] font-medium">{t('notSatisfied')}</p>
          <Link
            href={`/learning-path/${selectedCountry}/${result.ten_hang_bang}/${result.ma_chuong}/${result.ma_de_thi}`}
            className="h-9 text-[#5297CC] bg-[#D0EBFF] rounded-full px-2 flex items-center"
          >
            {t('retestButton')}
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#5297CC] font-medium">{t('continueLearning')}</p>
          <Link
            href={`/learning-path/${selectedCountry}/${result.ten_hang_bang}/${result.ma_chuong}`}
            className="h-9 text-[#5297CC] bg-[#D0EBFF] rounded-full px-2 flex items-center"
          >
            {t('learningButton')}
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#5297CC] font-medium">{t('challengeBank')}</p>
          <Link
            href="/missed-questions"
            className="h-9 text-[#5297CC] bg-[#D0EBFF] rounded-full px-2 flex items-center"
          >
            {t('challengeBankButton')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TestResult
