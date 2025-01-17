/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import qs from 'query-string'
import useDebounce from '@/hooks/useDebounce'
import { Chuong } from '@/types/types'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import useInsertChapterModal from '@/hooks/useInsertChapterModal'
import useDeleteChapterModal from '@/hooks/useDeleteChapterModal'
import ChuongTable from '@/components/chuong-table'
import { cn } from '@/lib/utils'

export default function ChapterDashboard() {
  const { onOpen: insertOnOpen, refreshTrigger: insertRefreshTrigger } =
    useInsertChapterModal()
  const { refreshTrigger: deleteRefreshTrigger } = useDeleteChapterModal()
  const [searchText, setSearchText] = useState('')
  const [chuong, setChuong] = useState<Chuong[]>([])
  const router = useRouter()
  const debounceValue = useDebounce<string>(searchText, 500)
  const [flipCountry, setFlipCountry] = useState<boolean>(true)

  const getChuong = async (debounceValue: string) => {
    const { data, error } = await supabase.rpc('search_chuong', {
      search_text: debounceValue,
    })
    if (error) {
      return toast.error(error.message)
    }
    setChuong(data)
  }

  useEffect(() => {
    const query = {
      searchInput: debounceValue,
    }
    const url = qs.stringifyUrl({
      url: '/admin/questions/chapters',
      query: query,
    })
    router.push(url)
    getChuong(debounceValue)
  }, [debounceValue, router, deleteRefreshTrigger, insertRefreshTrigger])

  const getFilterData = (isVN: boolean): Chuong[] => {
    if (isVN) {
      return chuong.filter(
        (c) => c.ma_khu_vuc === process.env.NEXT_PUBLIC_VIETNAM_UUID
      )
    } else {
      return chuong.filter(
        (c) => c.ma_khu_vuc !== process.env.NEXT_PUBLIC_VIETNAM_UUID
      )
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-light-purple-admin p-8 flex justify-between items-center">
        <h1 className="text-purple text-2xl font-bold ml-10">CHƯƠNG</h1>
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
            <div className="flex flex-col text-sm  rounded-xl w-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <ChuongTable data={getFilterData(flipCountry)} />
            </div>
          ) : (
            <div className="flex flex-col text-sm  rounded-xl w-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <ChuongTable data={getFilterData(flipCountry)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
