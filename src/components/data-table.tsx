'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'

// Simulated data
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'User', 'Editor'][Math.floor(Math.random() * 3)]
  }))
}

const ITEMS_PER_PAGE = 10

export default function DataTable() {
  const [data, setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    // Simulating data fetch
    const fetchData = async () => {
      const result = generateData(50) // Generate 50 items
      setData(result)
      setTotalPages(Math.ceil(result.length / ITEMS_PER_PAGE))
    }
    fetchData()
  }, [])

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return data.slice(startIndex, endIndex)
  }

  const handleEdit = (id: number) => {
    console.log(`Edit item with id: ${id}`)
    // Implement edit logic here
  }

  const handleDelete = (id: number) => {
    console.log(`Delete item with id: ${id}`)
    // Implement delete logic here
  }

  return (
    <div className="container m-auto p-5">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-100">
                    <TableHead className="font-bold text-black w-[20%]">ID</TableHead>
                    <TableHead className="font-bold text-black w-[20%]">Name</TableHead>
                    <TableHead className="font-bold text-black w-[20%]">Email</TableHead>
                    <TableHead className="font-bold text-black w-[20%]">Role</TableHead>
                    <TableHead className="font-bold w-[20%]"></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {getCurrentPageData().map((item) => (
                    <TableRow key={item.id} className="border-b border-gray-100">
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell className="text-right w-[20%]">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item.id)}>
                        <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                >
                <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>        
  )
}

