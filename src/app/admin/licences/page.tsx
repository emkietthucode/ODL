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
import { twMerge } from 'tailwind-merge'

export default function LicenceDashboard() {
  const { onOpen: insertOnOpen, refreshTrigger: insertRefreshTrigger } =
    useInsertLicenceModal()
  const { refreshTrigger: updateRefreshTrigger } = useUpdateLicenceModal()
  const { refreshTrigger: deleteRefreshTrigger } = useDeleteLicenceModal()
  const [searchText, setSearchText] = useState('')
  const [hangBang, setHangBang] = useState<HangBang[]>([])
  const router = useRouter()
  const debounceValue = useDebounce<string>(searchText, 500)
  const [flipCountry, setFlipCountry] = useState(false)

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
            onClick={() => setFlipCountry(false)}
            className={twMerge(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple flex h-[43px] items-center w-[150px] pl-2`,
              flipCountry && `bg-neutral-500 hover:bg-neutral-500/90`
            )}
          >
            VIỆT NAM
          </button>
          <button
            onClick={() => setFlipCountry(true)}
            className={twMerge(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] pl-2`,
              !flipCountry && `bg-neutral-500 hover:bg-neutral-500/90`
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
              className="bg-blue-500 w-[120px] text-white px-4 py-2 rounded-md"
            >
              + Thêm
            </button>
          </div>
          {!flipCountry ? (
            <HangBangTable
              data={hangBang.filter(
                (row) => row.ma_khu_vuc === process.env.NEXT_PUBLIC_VIETNAM_UUID
              )}
            />
          ) : (
            <HangBangTable
              data={hangBang.filter(
                (row) =>
                  row.ma_khu_vuc === process.env.NEXT_PUBLIC_AUSTRALIA_UUID
              )}
            />
          )}
        </div>
      </div>
    </div>
  )
}
