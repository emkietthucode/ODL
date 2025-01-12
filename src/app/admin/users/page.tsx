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
import { format, parseISO } from 'date-fns'
import useDebounce from '@/hooks/useDebounce'
import { NguoiDung } from '@/types/types'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useDeleteUserModal from '@/hooks/useDeleteUserModal'
import useUpdateUserModal from '@/hooks/useUpdateUserModal'

const ITEMS_PER_PAGE = 8
const ADMIN_ROLE = 'admin'

export default function UserDashboard() {
  const { onOpen: updateOnOpen, refreshTrigger: updateRefreshTrigger } =
    useUpdateUserModal()
  const { onOpen: deleteOnOpen, refreshTrigger: deleteRefreshTrigger } =
    useDeleteUserModal()
  const [searchText, setSearchText] = useState('')
  const [nguoiDung, setNguoiDung] = useState<NguoiDung[]>([])
  const [totalUserPages, setTotalUserPages] = useState(0)
  const [totalAdminPages, setTotalAdminPages] = useState(0)
  const [currentUserPage, setCurrentUserPage] = useState(1)
  const [currentAdminPage, setCurrentAdminPage] = useState(1)
  const router = useRouter()
  const debounceValue = useDebounce<string>(searchText, 500)

  const getNguoiDung = async (debounceValue: string) => {
    const { data, error } = await supabase.rpc('search_nguoi_dung', {
      search_text: debounceValue,
    })
    if (error) {
      return toast.error(error.message)
    }
    setNguoiDung(data)
    setTotalUserPages(
      Math.ceil(
        data.filter((nguoiDung: NguoiDung) => nguoiDung.vai_tro !== ADMIN_ROLE)
          .length / ITEMS_PER_PAGE
      )
    )
    setTotalAdminPages(
      Math.ceil(
        data.filter((nguoiDung: NguoiDung) => nguoiDung.vai_tro === ADMIN_ROLE)
          .length / ITEMS_PER_PAGE
      )
    )
  }

  useEffect(() => {
    const query = {
      searchInput: debounceValue,
    }
    const url = qs.stringifyUrl({
      url: '/admin/users',
      query: query,
    })
    router.push(url)
    getNguoiDung(debounceValue)
  }, [debounceValue, router, updateRefreshTrigger, deleteRefreshTrigger])

  const getCurrentPageData = (isAdmin: boolean) => {
    if (isAdmin) {
      const startIndex = (currentAdminPage - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      return nguoiDung
        .filter((nguoiDung: NguoiDung) => nguoiDung.vai_tro === ADMIN_ROLE)
        .slice(startIndex, endIndex)
    } else {
      const startIndex = (currentUserPage - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      return nguoiDung
        .filter((nguoiDung: NguoiDung) => nguoiDung.vai_tro !== ADMIN_ROLE)
        .slice(startIndex, endIndex)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-light-purple-admin p-8 flex justify-between items-center">
        <h1 className="text-purple text-2xl font-bold ml-10">NGƯỜI SỬ DỤNG</h1>
      </div>
      <div className="flex gap-10 container mx-auto p-8">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center space-x-4 mb-6">
            <Input
              type="text"
              placeholder="Search"
              className="bg-white border w-full sm:w-[200px] md:w-[300px] lg:w-[400px] max-w-full rounded-full px-4 py-2"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              onClick={() => {}}
              className="bg-neutral-500 hover:bg-neutral-500/90 w-[120px] text-white px-4 py-2 rounded-md"
            >
              + Thêm
            </button>
          </div>
          <hr className=" w-[95%] h-px mx-auto bg-neutral-400 border-0 rounded dark:bg-neutral-400"></hr>
          <div className="ml-5 py-5 font-bold text-neutral-500 text-xl">
            NGƯỜI DÙNG
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-100">
                  <TableHead className="px-8 font-bold text-black w-[25%]">
                    HỌ TÊN
                  </TableHead>
                  <TableHead className="px-8 font-bold text-black w-[20%]">
                    EMAIL
                  </TableHead>
                  <TableHead className="px-8 font-bold text-black w-[15%]">
                    NGÀY SINH
                  </TableHead>
                  <TableHead className="px-8 font-bold text-black w-[15%]">
                    GIỚI TÍNH
                  </TableHead>
                  <TableHead className="px-8 font-bold text-black w-[25%]">
                    KHU VỰC
                  </TableHead>
                  <TableHead className="font-bold w-[10%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPageData(false).map((item: NguoiDung) => (
                  <TableRow key={item.id} className="border-b border-gray-100">
                    <TableCell className="px-8">{item.ho_ten}</TableCell>
                    <TableCell className="px-8">{item.email}</TableCell>
                    <TableCell className="px-8">
                      {item.ngay_sinh &&
                        format(new Date(item.ngay_sinh), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="px-8">{item.gioi_tinh}</TableCell>
                    <TableCell className="px-8">{item.ten_khu_vuc}</TableCell>
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
                          <DropdownMenuItem
                            onClick={() => {} /*deleteOnOpen(item)*/}
                          >
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
                onClick={() =>
                  setCurrentUserPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentUserPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {currentUserPage}/{totalUserPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentUserPage((prev) =>
                    Math.min(prev + 1, totalUserPages)
                  )
                }
                disabled={currentUserPage === totalUserPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <hr className="mt-6 w-[95%] h-px mx-auto bg-neutral-400 border-0 rounded dark:bg-neutral-400"></hr>
          <div className="ml-5 py-5 font-bold text-neutral-500 text-xl">
            QUẢN TRỊ VIÊN
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-100">
                  <TableHead className="px-8 font-bold text-black w-[25%]">
                    HỌ TÊN
                  </TableHead>
                  <TableHead className="px-8 font-bold text-black w-[20%]">
                    EMAIL
                  </TableHead>
                  <TableHead className="px-8 font-bold text-black w-[15%]">
                    NGÀY SINH
                  </TableHead>
                  <TableHead className="px-8 font-bold text-black w-[15%]">
                    GIỚI TÍNH
                  </TableHead>
                  <TableHead className="px-8 font-bold text-black w-[25%]">
                    KHU VỰC
                  </TableHead>
                  <TableHead className="font-bold w-[10%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPageData(true).map((item: NguoiDung) => (
                  <TableRow key={item.id} className="border-b border-gray-100">
                    <TableCell className="px-8">{item.ho_ten}</TableCell>
                    <TableCell className="px-8">{item.email}</TableCell>
                    <TableCell className="px-8">
                      {item.ngay_sinh &&
                        format(new Date(item.ngay_sinh), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="px-8">{item.gioi_tinh}</TableCell>
                    <TableCell className="px-8">{item.ten_khu_vuc}</TableCell>
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
                          <DropdownMenuItem
                            onClick={() => {} /*deleteOnOpen(item)*/}
                          >
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
                onClick={() =>
                  setCurrentAdminPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentAdminPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {currentAdminPage}/{totalAdminPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentAdminPage((prev) =>
                    Math.min(prev + 1, totalAdminPages)
                  )
                }
                disabled={currentAdminPage === totalAdminPages}
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
