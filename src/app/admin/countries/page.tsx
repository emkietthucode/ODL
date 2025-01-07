/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useInsertCountryModal from '@/hooks/useInsertCountryModal'
import useUpdateCountryModal from '@/hooks/useUpdateCountryModal'
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
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import qs from 'query-string'
import useDebounce from '@/hooks/useDebounce'
import { KhuVuc } from '@/types/types'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useDeleteCountryModal from '@/hooks/useDeleteCountryModal'

const ITEMS_PER_PAGE = 10

export default function CountryDashboard() {
  const { onOpen: insertOnOpen, refreshTrigger: insertRefreshTrigger } =
    useInsertCountryModal()
  const { onOpen: updateOnOpen, refreshTrigger: updateRefreshTrigger } =
    useUpdateCountryModal()
  const { onOpen: deleteOnOpen, refreshTrigger: deleteRefreshTrigger } =
    useDeleteCountryModal()
  const [searchText, setSearchText] = useState('')
  const [khuVuc, setKhuVuc] = useState<KhuVuc[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const debounceValue = useDebounce<string>(searchText, 500)

  const getKhuVuc = async (debounceValue: string) => {
    const { data, error } = await supabase.rpc('search_khu_vuc_proc', {
      search_text: debounceValue,
    })
    if (error) {
      return toast.error(error.message)
    }
    setKhuVuc(data)
    setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE))
  }

  useEffect(() => {
    const query = {
      searchInput: debounceValue,
    }
    const url = qs.stringifyUrl({
      url: '/admin/countries',
      query: query,
    })
    router.push(url)
    getKhuVuc(debounceValue)
  }, [
    debounceValue,
    router,
    updateRefreshTrigger,
    deleteRefreshTrigger,
    insertRefreshTrigger,
  ])

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return khuVuc.slice(startIndex, endIndex)
  }

  const getQuocKy = (item: KhuVuc): string => {
    const { data: quoc_ky } = supabase.storage
      .from('quoc_ky')
      .getPublicUrl(`quoc-ky-${item.id}`)
    return quoc_ky.publicUrl
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-light-purple-admin p-8 flex justify-between items-center">
        <h1 className="text-purple text-2xl font-bold ml-10">QUỐC GIA</h1>
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-100">
                <TableHead className="px-8 font-bold text-black w-[28%]">
                  QUỐC GIA
                </TableHead>
                <TableHead className="font-bold text-black w-[28%]">
                  NGÔN NGỮ
                </TableHead>
                <TableHead className="font-bold text-black w-[28%]">
                  QUỐC KỲ
                </TableHead>
                <TableHead className="font-bold w-[10%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentPageData().map((item: KhuVuc) => (
                <TableRow key={item.id} className="border-b border-gray-100">
                  <TableCell className="px-8">{item.ten_khu_vuc}</TableCell>
                  <TableCell>{item.ngon_ngu}</TableCell>
                  <TableCell>
                    <Image
                      src={getQuocKy(item)}
                      alt=""
                      width="30"
                      height="20"
                      sizes="100vw"
                      className="w-[30px] h-[20px]"
                    />
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateOnOpen(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteOnOpen(item)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-5 justify-center items-center p-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              {currentPage}/{totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
