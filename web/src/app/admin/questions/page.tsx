/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from 'react'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import qs from 'query-string'
import useDebounce from '@/hooks/useDebounce'
import { CauHoi } from '@/types/types'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import useInsertQuestionModal from '@/hooks/useInsertQuestionModal'
import useDeleteQuestionModal from '@/hooks/useDeleteQuestionModal'
import CauHoiTable from '@/components/cau-hoi-table'
import useUpdateQuestionModal from '@/hooks/useUpdateQuestionModal'
import { cn } from '@/lib/utils'
import { Tab } from '@/components/tab'

const tabsVN = [
  { label: 'Tất cả' },
  { label: 'Câu điểm liệt' },
  { label: 'Luật giao thông' },
  { label: 'Biển báo' },
  { label: 'Sa hình' },
]

const tabsAU = [
  { label: 'All' },
  { label: 'Defensive' },
  { label: 'Substances' },
  { label: 'General' },
  { label: 'Negligence' },
  { label: 'Signs' },
  { label: 'Pedestrians' },
  { label: 'Lights/Lanes' },
  { label: 'Seatbelts' },
  { label: 'Intersections' },
  { label: 'Speed' },
]

// Add a new interface for questions with language info
interface CauHoiWithLanguage extends CauHoi {
  chuong?: {
    khu_vuc?: {
      ngon_ngu: string
    }
  }
}

export default function QuestionDashboard() {
  const { onOpen: insertOnOpen, refreshTrigger: insertRefreshTrigger } =
    useInsertQuestionModal()
  const { refreshTrigger: updateRefreshTrigger } = useUpdateQuestionModal()
  const { refreshTrigger: deleteRefreshTrigger } = useDeleteQuestionModal()
  const [searchText, setSearchText] = useState('')
  const [cauHoi, setCauHoi] = useState<CauHoiWithLanguage[]>([])
  const router = useRouter()
  const debounceValue = useDebounce<string>(searchText, 500)
  const [flipCountry, setFlipCountry] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>(tabsVN[0].label)

  const handleTabClick = (label: string) => {
    setActiveTab(label)
  }

  // Reset active tab when switching countries
  useEffect(() => {
    if (flipCountry) {
      setActiveTab(tabsVN[0].label)
    } else {
      setActiveTab(tabsAU[0].label)
    }
  }, [flipCountry])

  const getCauHoi = async (debounceValue: string) => {
    // Use a direct query instead of RPC to get language information
    const { data, error } = await supabase
      .from('cau_hoi')
      .select(
        `
        *,
        chuong:ma_chuong (
          khu_vuc:ma_khu_vuc (
            ngon_ngu
          )
        )
      `
      )
      .ilike('noi_dung_cau_hoi', `%${debounceValue}%`)

    if (error) {
      return toast.error(error.message)
    }
    setCauHoi(data || [])
  }

  useEffect(() => {
    const query = {
      searchInput: debounceValue,
    }
    const url = qs.stringifyUrl({
      url: '/admin/questions',
      query: query,
    })
    router.push(url)
    getCauHoi(debounceValue)
  }, [
    debounceValue,
    router,
    updateRefreshTrigger,
    deleteRefreshTrigger,
    insertRefreshTrigger,
  ])

  const getFilterData = (): CauHoiWithLanguage[] => {
    if (flipCountry) {
      // For Vietnam, use the existing logic
      if (activeTab === tabsVN[0].label) {
        return cauHoi // Return all rows for "Tất cả"
      }
      if (activeTab === tabsVN[1].label) {
        return cauHoi.filter((row) => row.la_cau_diem_liet === true)
      }
      return cauHoi.filter((row) => row.loai_cau_hoi === activeTab)
    } else {
      // For Australia, filter by language
      const englishQuestions = cauHoi.filter(
        (row) => row.chuong?.khu_vuc?.ngon_ngu?.toLowerCase() === 'english'
      )

      if (activeTab === 'All') {
        return englishQuestions // Return all English questions for "Tất cả"
      }

      // Map short tab labels to actual question types in the database
      const tabToQuestionTypeMap: { [key: string]: string } = {
        [tabsAU[1].label]: 'Defensive Driving', // Defensive -> Defensive Driving
        [tabsAU[2].label]: 'Alcohol and Drugs', // Substances -> Alcohol and Drugs
        [tabsAU[3].label]: 'General Knowledge', // General -> General Knowledge
        [tabsAU[4].label]: 'Negligent Driving', // Negligence -> Negligent Driving
        [tabsAU[5].label]: 'Traffic Signs', // Signs -> Traffic Signs
        [tabsAU[6].label]: 'Pedestrians', // Pedestrians -> Pedestrians
        [tabsAU[7].label]: 'Traffic Lights and Lanes', // Lights/Lanes -> Traffic Lights and Lanes
        [tabsAU[8].label]: 'Seat Belts and Restraints', // Seatbelts -> Seat Belts and Restraints
        [tabsAU[9].label]: 'Intersections', // Intersections -> Intersections
        [tabsAU[10].label]: 'Speed Limits', // Speed -> Speed Limits
      }

      const questionType = tabToQuestionTypeMap[activeTab]
      if (questionType) {
        return englishQuestions.filter(
          (row) => row.loai_cau_hoi === questionType
        )
      }

      return englishQuestions
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-light-purple-admin p-8 flex justify-between items-center">
        <h1 className="text-purple text-2xl font-bold ml-10">
          CÂU HỎI - ĐÁP ÁN
        </h1>
      </div>
      <div className="flex gap-10 container mx-auto p-8">
        <div className="ml-4 flex flex-col items-center bg-white min-w-64 h-[735px] rounded-lg drop-shadow-lg">
          <div className="mt-10 text-sm font-semibold text-purple">
            DANH SÁCH QUỐC GIA
          </div>
          <hr className="my-6 w-[200px] h-px mx-auto bg-light-purple border-0 rounded dark:bg-purple"></hr>
          <button
            onClick={() => {
              setFlipCountry(true)
            }}
            className={cn(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] px-2`,
              !flipCountry ? `bg-neutral-500 hover:bg-neutral-500/90` : ''
            )}
          >
            VIỆT NAM
          </button>
          <button
            onClick={() => {
              setFlipCountry(false)
            }}
            className={cn(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] pl-2`,
              flipCountry ? `bg-neutral-500 hover:bg-neutral-500/90` : ''
            )}
          >
            ÚC
          </button>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center space-x-4 mb-6">
            <Input
              type="text"
              placeholder="Search"
              className="bg-white border w-full sm:w-[200px] md:w-[300px] lg:w-[400px] max-w-full rounded-full px-4 py-2"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              onClick={insertOnOpen}
              className="bg-blue-500 hover:bg-blue-500/90 w-[120px] text-white px-4 py-2 rounded-md"
            >
              + Thêm
            </button>
          </div>

          {flipCountry === true ? (
            <div className="flex flex-col justify-between text-sm h-[670px] rounded-xl w-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <div className="pr-5 pl-[50px] pt-5 flex gap-5 justify-start items-center w-full bg-white rounded-md border-b border-zinc-400 border-opacity-60">
                {tabsVN.map((tab) => (
                  <div
                    key={tab.label}
                    onClick={() => handleTabClick(tab.label)}
                    className="cursor-pointer self-center"
                  >
                    <Tab label={tab.label} isActive={tab.label === activeTab} />
                  </div>
                ))}
              </div>
              <CauHoiTable data={getFilterData()} />
            </div>
          ) : (
            <div className="flex flex-col justify-between text-sm h-[670px] rounded-xl w-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <div className="pl-5 pt-5 flex gap-5 justify-start items-center w-full bg-white rounded-md border-b border-zinc-400 border-opacity-60">
                {tabsAU.map((tab) => (
                  <div
                    key={tab.label}
                    onClick={() => handleTabClick(tab.label)}
                    className="cursor-pointer self-center"
                  >
                    <Tab label={tab.label} isActive={tab.label === activeTab} />
                  </div>
                ))}
              </div>
              <CauHoiTable data={getFilterData()} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
