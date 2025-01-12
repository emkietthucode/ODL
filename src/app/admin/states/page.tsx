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
import { KhuVuc } from '@/types/types'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useInsertStateModal from '@/hooks/useInsertStateModal'
import useDeleteStateModal from '@/hooks/useDeleteStateModal'
import useUpdateStateModal from '@/hooks/useUpdateStateModal'

const ITEMS_PER_PAGE = 8

export default function StateDashboard() {
  const { onOpen: insertOnOpen, refreshTrigger: insertRefreshTrigger } =
    useInsertStateModal()
  const { onOpen: updateOnOpen, refreshTrigger: updateRefreshTrigger } =
    useUpdateStateModal()
  const { onOpen: deleteOnOpen, refreshTrigger: deleteRefreshTrigger } =
    useDeleteStateModal()
  const [searchText, setSearchText] = useState('')
  const [khuVuc, setKhuVuc] = useState<KhuVuc[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const debounceValue = useDebounce<string>(searchText, 500)

  const getKhuVuc = async (debounceValue: string) => {
    const { data, error } = await supabase.rpc('search_tieu_bang', {
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
      url: '/admin/states',
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
        <h1 className="text-purple text-2xl font-bold ml-10">TIỂU BANG</h1>
      </div>
      <div className="flex gap-10 container mx-auto p-8">
        <div className="flex flex-col justify-start items-center bg-white min-w-64 h-[735px] rounded-lg drop-shadow-lg">
          <div className="mt-10 text-sm font-semibold text-purple">
            DANH SÁCH QUỐC GIA
          </div>
          <hr className="my-6 w-[235px] h-px mx-auto bg-light-purple border-0 rounded dark:bg-purple"></hr>
          <button className="my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] pl-2">
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-100">
                  <TableHead className="px-8 font-bold text-black w-[28%]">
                    TIỂU BANG
                  </TableHead>
                  {/* <TableHead className="font-bold text-black w-[28%]">
                  NGÔN NGỮ
                </TableHead> */}
                  <TableHead className="font-bold text-black w-[28%]">
                    BIỂU TƯỢNG
                  </TableHead>
                  <TableHead className="font-bold w-[10%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPageData().map((item: KhuVuc) => (
                  <TableRow key={item.id} className="border-b border-gray-100">
                    <TableCell className="px-8">{item.ten_khu_vuc}</TableCell>
                    {/* <TableCell>{item.ngon_ngu}</TableCell> */}
                    <TableCell>
                      <Image
                        src={getQuocKy(item)}
                        alt=""
                        sizes="100vw"
                        width={55}
                        height={48}
                        style={{ width: '55px', height: '48px' }}
                      />
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateOnOpen(item)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteOnOpen(item)}>
                            <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
    </div>
  )
}
