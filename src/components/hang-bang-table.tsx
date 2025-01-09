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

import { HangBang } from '@/types/types' // Adjust the path as necessary
import useDeleteLicenceModal from '@/hooks/useDeleteLicenceModal'
import useUpdateLicenceModal from '@/hooks/useUpdateLicenceModal'

interface HangBangTableProps {
  data: HangBang[]
  itemsPerPage?: number
}

const HangBangTable: React.FC<HangBangTableProps> = ({
  data,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { onOpen: updateOnOpen } = useUpdateLicenceModal()
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
            <TableHead className="px-8 font-bold text-black w-[28%]">
              HẠNG BẰNG
            </TableHead>
            <TableHead className="font-bold text-black w-[28%]">
              MÔ TẢ
            </TableHead>
            <TableHead className="font-bold w-[10%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData.map((item: HangBang) => (
            <TableRow key={item.id} className="border-b border-gray-100">
              <TableCell className="px-8">{item.ten_hang_bang}</TableCell>
              <TableCell>{item.mo_ta_hang_bang}</TableCell>
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
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteOnOpen(item)}>
                      <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                      Delete
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

export default HangBangTable
