/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import qs from 'query-string'
import useDebounce from '@/hooks/useDebounce'
import { HangBang } from '@/types/types'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import useInsertLicenceModal from '@/hooks/useInsertLicenceModal'
import useDeleteLicenceModal from '@/hooks/useDeleteLicenceModal'
import HangBangTable from '@/components/hang-bang-table'
import useUpdateLicenceModal from '@/hooks/useUpdateLicenceModal'
import { cn } from '@/lib/utils'
import { Tab } from '@/components/tab'

export const tabsVN = [
  { label: 'Tất cả' },
  { label: 'Xe máy' },
  { label: 'Ô tô' },
  { label: 'Xe khách' },
  { label: 'Rơ-mooc' },
]

export default function LicenceDashboard() {
  const { onOpen: insertOnOpen, refreshTrigger: insertRefreshTrigger } =
    useInsertLicenceModal()
  const { refreshTrigger: updateRefreshTrigger } = useUpdateLicenceModal()
  const { refreshTrigger: deleteRefreshTrigger } = useDeleteLicenceModal()
  const [searchText, setSearchText] = useState('')
  const [hangBang, setHangBang] = useState<HangBang[]>([])
  const router = useRouter()
  const debounceValue = useDebounce<string>(searchText, 500)
  const [flipCountry, setFlipCountry] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>(tabsVN[0].label)

  const handleTabClick = (label: string) => {
    setActiveTab(label)
  }

  const getHangBang = async (debounceValue: string) => {
    const { data, error } = await supabase.rpc('search_hang_bang', {
      search_text: debounceValue,
    })
    if (error) {
      return toast.error(error.message)
    }
    setHangBang(data)
  }

  useEffect(() => {
    const query = {
      searchInput: debounceValue,
    }
    const url = qs.stringifyUrl({
      url: '/admin/licences',
      query: query,
    })
    router.push(url)
    getHangBang(debounceValue)
  }, [
    debounceValue,
    router,
    updateRefreshTrigger,
    deleteRefreshTrigger,
    insertRefreshTrigger,
  ])

  const getFilterData = (): HangBang[] => {
    if (activeTab === 'Tất cả') {
      return hangBang
    } else if (activeTab === 'Xe máy') {
      return hangBang.filter((row) => row.ten_hang_bang.startsWith('A'))
    } else if (activeTab === 'Ô tô') {
      return hangBang.filter(
        (row) =>
          row.ten_hang_bang.startsWith('B') || row.ten_hang_bang.startsWith('C')
      )
    } else if (activeTab === 'Xe khách') {
      return hangBang.filter((row) => row.ten_hang_bang.startsWith('D'))
    } else if (activeTab === 'Rơ-mooc') {
      return hangBang.filter((row) => row.ten_hang_bang.startsWith('F'))
    }
    return []
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-light-purple-admin p-8 flex justify-between items-center">
        <h1 className="text-purple text-2xl font-bold ml-10">HẠNG BẰNG</h1>
      </div>
      <div className="flex gap-10 container mx-auto p-8">
        <div className="flex flex-col items-center bg-white min-w-64 h-[735px] rounded-lg drop-shadow-lg">
          <div className="mt-10 text-sm font-semibold text-purple">
            DANH SÁCH QUỐC GIA
          </div>
          <hr className="my-6 w-[200px] h-px mx-auto bg-light-purple border-0 rounded dark:bg-purple"></hr>
          <button
            onClick={() => {
              setFlipCountry(true)
            }}
            className={cn(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] pl-2`,
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

          <div className="flex flex-col text-sm rounded-xl w-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="pl-[50px] pt-5 flex gap-5 justify-start items-center w-full bg-white rounded-md border-b border-zinc-400 border-opacity-60">
              {flipCountry === true ? (
                tabsVN.map((tab) => (
                  <div
                    key={tab.label}
                    onClick={() => handleTabClick(tab.label)}
                    className="cursor-pointer self-center"
                  >
                    <Tab label={tab.label} isActive={tab.label === activeTab} />
                  </div>
                ))
              ) : (
                <Tab label="Learner" isActive />
              )}
            </div>
            {/* <HangBangTable isVN={flipCountry} data={getFilterData()} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
