/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from 'lucide-react'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import qs from 'query-string'
import useDebounce from '@/hooks/useDebounce'
import { HangBang } from '@/types/types'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useInsertLicenceModal from '@/hooks/useInsertLicenceModal'
import useUpdateCountryModal from '@/hooks/useUpdateCountryModal'
import useDeleteCountryModal from '@/hooks/useDeleteCountryModal'
import HangBangTable from '@/components/hang-bang-table'

const ITEMS_PER_PAGE = 10
const NEXT_PUBLIC_VIETNAM_UUID = process.env.VIETNAM_UUID
const AUSTRALIA_UUID = process.env.AUSTRALIA_UUID

export default function CountryDashboard() {
  const { onOpen: insertOnOpen, refreshTrigger: insertRefreshTrigger } =
    useInsertLicenceModal()
  const { onOpen: updateOnOpen, refreshTrigger: updateRefreshTrigger } =
    useUpdateCountryModal()
  const { onOpen: deleteOnOpen, refreshTrigger: deleteRefreshTrigger } =
    useDeleteCountryModal()
  const [searchText, setSearchText] = useState('')
  const [hangBang, setHangBang] = useState<HangBang[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
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
    setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE))
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
        <div className="flex items-center space-x-4">
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
      </div>
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <Button
              className="w-[100px] h-14"
              variant="outline"
              onClick={() => setFlipCountry(false)}
            >
              Việt Nam
            </Button>
            <Button
              className="w-[100px] h-14"
              variant="outline"
              onClick={() => setFlipCountry(true)}
            >
              Úc
            </Button>
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
