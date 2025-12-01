import React, { useState, useMemo, useEffect } from 'react'
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

import { CauHoi } from '@/types/types'
import useDeleteQuestionModal from '@/hooks/useDeleteQuestionModal'
import useUpdateQuestionModal from '@/hooks/useUpdateQuestionModal'

// Add interface for questions with language info
interface CauHoiWithLanguage extends CauHoi {
  chuong?: {
    khu_vuc?: {
      ngon_ngu: string
    }
  }
}

interface CauHoiTableProps {
  data: CauHoiWithLanguage[]
  itemsPerPage?: number
}

const CauHoiTable: React.FC<CauHoiTableProps> = ({
  data,
  itemsPerPage = 9,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { onOpen: updateOnOpen } = useUpdateQuestionModal()
  const { onOpen: deleteOnOpen } = useDeleteQuestionModal()

  // Reset to page 1 when data changes (e.g., when switching tabs)
  useEffect(() => {
    setCurrentPage(1)
  }, [data])

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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[735px] flex flex-col">
      <div className="flex-1 overflow-auto">
        <Table className="h-full">
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-100">
              <TableHead className="px-8 font-bold text-black w-[85%]">
                CÂU HỎI
              </TableHead>
              <TableHead className="font-bold w-[10%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentPageData.map((item: CauHoiWithLanguage) => (
              <TableRow key={item.id} className="border-b border-gray-100">
                <TableCell className="px-8">{item.noi_dung_cau_hoi}</TableCell>
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
      </div>
      <div className="flex items-center justify-center space-x-2 py-4 border-t border-gray-100">
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

export default CauHoiTable
