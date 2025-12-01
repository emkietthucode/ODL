// HangBangTable.tsx
import React, { useState, useMemo } from 'react'
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

import { CauTrucBaiTest, HangBang } from '@/types/types' // Adjust the path as necessary
import useDeleteLicenceModal from '@/hooks/useDeleteLicenceModal'
import useUpdateLicenceModal from '@/hooks/useUpdateLicenceModal'
import supabase from '@/utils/supabase/supabase'
import useUpdateTestStructureModal from '@/hooks/useUpdateTestStructureModal'

interface ChapterTestTableProps {
  data: CauTrucBaiTest[]
  itemsPerPage?: number
}

const ChapterTestTable: React.FC<ChapterTestTableProps> = ({
  data,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { onOpen: updateOnOpen } = useUpdateTestStructureModal()
  const { onOpen: deleteOnOpen } = useDeleteLicenceModal()

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage)
  }, [data.length, itemsPerPage])

  const getCurrentPageData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return data.slice(startIdx, startIdx + itemsPerPage)
  }, [currentPage, itemsPerPage, data])

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-gray-100">
            <TableHead className="px-8 text-xs font-bold text-black w-[20%]">
              CHƯƠNG
            </TableHead>
            <TableHead className="px-8 text-xs font-bold text-black w-[20%]">
              SỐ LƯỢNG
            </TableHead>
            <TableHead className="px-8 text-xs font-bold text-black w-[25%]">
              SỐ CÂU ĐỂ ĐẠT
            </TableHead>
            <TableHead className="font-bold text-xs text-black w-[20%]">
              SỐ CÂU ĐÃ SAI
            </TableHead>
            <TableHead className="font-bold text-xs w-[15%] text-black">
              THỜI GIAN
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData.map((item: CauTrucBaiTest) => (
            <TableRow key={item.id} className="border-b border-gray-100">
              <TableCell className="px-8">{item.ten_chuong}</TableCell>
              <TableCell className="px-8">{item.so_luong_cau_hoi}</TableCell>
              <TableCell className="px-8">{item.so_cau_de_dat}</TableCell>
              <TableCell>{item.so_cau_diem_liet}</TableCell>
              <TableCell>{item.thoi_gian_lam_bai}</TableCell>

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
                    {/* <DropdownMenuItem onClick={() => deleteOnOpen(item)}>
                      <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                      Xóa
                    </DropdownMenuItem> */}
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
  )
}

export default ChapterTestTable
