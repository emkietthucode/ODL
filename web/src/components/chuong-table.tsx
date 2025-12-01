import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

import { Chuong } from '@/types/types'
import useDeleteChapterModal from '@/hooks/useDeleteChapterModal'
import useUpdateChapterModal from '@/hooks/useUpdateChapterModal'

interface ChuongTableProps {
  data: Chuong[]
  itemsPerPage?: number
}

const ChuongTable: React.FC<ChuongTableProps> = ({
  data,
  itemsPerPage = 10,
}) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { onOpen: deleteOnOpen } = useDeleteChapterModal()
  const { onOpen: updateOnOpen } = useUpdateChapterModal()

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage)
  }, [data.length, itemsPerPage])

  const getCurrentPageData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return data.slice(startIdx, startIdx + itemsPerPage)
  }, [currentPage, itemsPerPage, data, data.length])

  useEffect(() => {
    setCurrentPage(1)
  }, [data.length])

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-gray-100">
            <TableHead className="px-8 font-bold text-black w-[20%]">
              TÊN CHƯƠNG
            </TableHead>
            <TableHead className="px-8 font-bold text-black w-[80%]">
              MÔ TẢ CHƯƠNG
            </TableHead>
            <TableHead className="font-bold w-[10%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData.map((item: Chuong) => (
            <TableRow key={item.id} className="border-b border-gray-100">
              <TableCell className="px-8">{item.ten_chuong}</TableCell>
              <TableCell className="px-8">{item.mo_ta_chuong}</TableCell>
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
  )
}

export default ChuongTable
