'use client'
import { v4 as uuidv4 } from 'uuid'
import useUpdateChapterModal from '@/hooks/useUpdateChapterModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Check, ChevronsUpDown, CirclePlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MoreHorizontal, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import supabase from '@/utils/supabase/supabase'
import { Button } from '@/components/ui/button'
import Input from '@/components/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CauHoi, Chuong, KhuVuc, LuaChon } from '@/types/types'

const itemsPerPage = 8

const UpdateChapterModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    isOpen,
    onClose,
    item: chuong,
    triggerRefresh,
  } = useUpdateChapterModal()
  const [openComboBoxQuestions, setOpenComboQuestions] = useState(false)
  const [questions, setQuestions] = useState<CauHoi[]>([])
  const [currentQuestions, setCurrentQuestions] = useState<CauHoi[]>([])
  const [initialQuestions, setInitialQuestions] = useState<CauHoi[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<CauHoi>()
  const [questionContent, setQuestionContent] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [regions, setRegions] = useState<KhuVuc[]>([])
  const [region, setRegion] = useState<KhuVuc>()
  const [regionName, setRegionName] = useState<string>('')
  const [openComboBox, setOpenComboBox] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      ten_chuong: '',
      mo_ta_chuong: null,
    },
  })

  useEffect(() => {
    if (!chuong) return

    reset({
      ten_chuong: chuong.ten_chuong || '',
      mo_ta_chuong: chuong.mo_ta_chuong || '',
    })

    const fetchData = async () => {
      try {
        const [
          { data: questionsData, error: questionsError },
          { data: chapterQuestions, error: chapterQuestionsError },
        ] = await Promise.all([
          supabase.from('cau_hoi').select().is('ma_chuong', null),
          supabase.from('cau_hoi').select().eq('ma_chuong', chuong?.id),
        ])

        if (questionsError) toast.error(questionsError.message)
        if (chapterQuestionsError) toast.error(chapterQuestionsError.message)

        setQuestions(questionsData || [])
        setCurrentQuestions(chapterQuestions || [])
        setInitialQuestions(chapterQuestions || [])

        // Set currentPage to 1 if there are questions, otherwise 0
        setCurrentPage(chapterQuestions && chapterQuestions.length > 0 ? 1 : 0)

        console.log()
        const { data: regionsData, error: regionsError } = await supabase
          .from('khu_vuc')
          .select()
        if (regionsError) toast.error(regionsError.message)

        setRegions(regionsData || [])

        const selectedRegion = regionsData?.find(
          (region) => region.id === chuong.ma_khu_vuc
        )
        setRegion(selectedRegion)
        setRegionName(selectedRegion?.ten_khu_vuc || '')
      } catch (error) {
        console.log(error)
        toast.error('Lỗi khi lấy dữ liệu câu hỏi.')
      }
    }

    fetchData()
  }, [chuong, isLoading])

  const onChange = (open: boolean) => {
    if (!open) {
      handleCancel()
    }
  }

  if (!chuong) {
    return null
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      if (!values.ten_chuong || !values.mo_ta_chuong) {
        return toast.error('Vui lòng điền đầy đủ thông tin.')
      }

      const { error: errorUpdate } = await supabase
        .from('chuong')
        .update({
          ten_chuong: values.ten_chuong,
          mo_ta_chuong: values.mo_ta_chuong,
          ma_khu_vuc: region?.id,
        })
        .eq('id', chuong.id)

      if (errorUpdate) {
        return toast.error('Thêm chương mới không thành công')
      }

      await updateQuestions(chuong.id)

      setIsLoading(false)
      toast.success('Thêm chương mới thành công.')
      triggerRefresh()
      reset()
      onClose()
    } catch (error) {
      console.log(error)
      toast.error('Thêm mới không thành công.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuestions = async (uniqueID: string) => {
    try {
      const questionsToRemove = initialQuestions.filter(
        (initialQuestion) =>
          !currentQuestions.some(
            (currentQuestion) => currentQuestion.id === initialQuestion.id
          )
      )

      const questionsToAddOrUpdate = currentQuestions.filter(
        (currentQuestion) =>
          !initialQuestions.some(
            (initialQuestion) => initialQuestion.id === currentQuestion.id
          )
      )

      const removePromises = questionsToRemove.map((question) =>
        supabase
          .from('cau_hoi')
          .update({ ma_chuong: null })
          .eq('id', question.id)
      )

      const updatePromises = questionsToAddOrUpdate.map((question) =>
        supabase
          .from('cau_hoi')
          .update({ ma_chuong: uniqueID })
          .eq('id', question.id)
      )

      const [removeResults, updateResults] = await Promise.all([
        Promise.all(removePromises),
        Promise.all(updatePromises),
      ])

      // Handle errors for remove
      removeResults.forEach((result, index) => {
        if (result.error) {
          console.log(result.error)
          toast.error(
            `Xóa liên kết của câu hỏi ${questionsToRemove[index].id} không thành công`
          )
        }
      })

      // Handle errors for update
      updateResults.forEach((result, index) => {
        if (result.error) {
          console.log(result.error)
          toast.error(
            `Cập nhật liên kết của câu hỏi ${questionsToAddOrUpdate[index].id} không thành công`
          )
        }
      })
    } catch (error) {
      console.log(error)
      toast.error('Đã xảy ra lỗi khi cập nhật câu hỏi.')
    }
  }

  const handleCancel = () => {
    reset()
    setCurrentQuestions([])
    setCurrentQuestion(undefined)
    setQuestionContent(undefined)
    setCurrentPage(0)

    setRegion(undefined)
    setRegionName('')
    onClose()
  }
  const totalPages = () => {
    return currentQuestions.length === 0
      ? 0
      : Math.ceil(currentQuestions.length / itemsPerPage)
  }

  const getCurrentPageData = () => {
    if (currentPage === 0 || currentQuestions.length === 0) {
      return []
    }
    const startIdx = (currentPage - 1) * itemsPerPage
    return currentQuestions.slice(startIdx, startIdx + itemsPerPage)
  }

  const handleAddQuestion = () => {
    if (!currentQuestion) {
      return
    }

    setCurrentQuestions((prevQuestions) => {
      const exists = prevQuestions.some(
        (question) => question.id === currentQuestion.id
      )

      if (!exists) {
        // If this is the first question being added, set currentPage to 1
        if (prevQuestions.length === 0) {
          setCurrentPage(1)
        }
        return [...prevQuestions, currentQuestion]
      } else {
        return prevQuestions
      }
    })

    // Clear the current selection after adding
    setCurrentQuestion(undefined)
    setQuestionContent('')
  }

  const handleRemoveQuestion = (currentQuestionId: string) => {
    setCurrentQuestions((prevQuestions) => {
      const newQuestions = prevQuestions.filter(
        (question) => question.id !== currentQuestionId
      )

      // If all questions are removed, set currentPage to 0
      if (newQuestions.length === 0) {
        setCurrentPage(0)
      }

      return newQuestions
    })
  }

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-sm fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
          <Dialog.Content
            className="
                  shadow-md
                  drop-shadow-md
                  border
                  border-neutral-400
                  max-h-full
                  h-full
                  md:h-auto
                  md:max-h-[90vh]
                  w-full
                  md:w-[90vw]
                  md:max-w-[1250px]
                  rounded-md
                  bg-white
                  p-[50px]
                  focus:outline-none
                  overflow-scroll
                "
          >
            <Dialog.Title
              className="
                    text-lg
                    text-center
                    font-bold
                    mb-3
                    text-purple
                  "
            >
              {'CHỈNH SỬA CHƯƠNG'}
            </Dialog.Title>
            <Dialog.Description>{''}</Dialog.Description>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col justify-center gap-5">
                <div className="flex gap-6">
                  <div className="space-y-4 w-[30%]">
                    <div>
                      <Label htmlFor="ten_chuong">Tên chương</Label>
                      <Input
                        id="ten_chuong"
                        {...register('ten_chuong', { required: true })}
                        className={cn(
                          `mt-1 border-0 bg-gray-100 placeholder:text-neutral-400`,
                          !!errors.ten_chuong &&
                            'border border-red-500 focus:border-red-500'
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mo_ta_chuong">Mô tả chương</Label>
                      <Textarea
                        id="mo_ta_chuong"
                        {...register('mo_ta_chuong', { required: true })}
                        className={cn(
                          `mt-1 border-0 bg-gray-100 placeholder:text-neutral-400`,
                          !!errors.mo_ta_chuong &&
                            'border border-red-500 focus:border-red-500'
                        )}
                        rows={4}
                      />
                    </div>
                    <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openComboBox}
                          className={cn('w-full justify-between')}
                        >
                          {regionName
                            ? regions.find(
                                (region) => region.ten_khu_vuc === regionName
                              )?.ten_khu_vuc
                            : 'Chọn khu vực'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0 ">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {regions.map((region) => (
                                <CommandItem
                                  key={region.id}
                                  value={region.ten_khu_vuc}
                                  onSelect={(currentValue) => {
                                    setRegion(region)
                                    setRegionName(currentValue)
                                    setOpenComboBox(false)
                                  }}
                                >
                                  {region.ten_khu_vuc}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      regionName === region.ten_khu_vuc
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex flex-col gap-5 w-[70%]">
                    <div className="flex gap-2">
                      <Popover
                        open={openComboBoxQuestions}
                        onOpenChange={setOpenComboQuestions}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            aria-expanded={openComboBoxQuestions}
                            className={cn('w-full justify-between')}
                          >
                            <span className="truncate text-left w-[600px]">
                              {questionContent
                                ? questions.find(
                                    (curr) =>
                                      curr.noi_dung_cau_hoi === questionContent
                                  )?.noi_dung_cau_hoi
                                : 'Chọn câu hỏi'}
                            </span>
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="xl:w-[750px] md:w-[650px] sm:w-[450px] p-0 ">
                          <Command>
                            <CommandInput
                              placeholder="Tìm câu hỏi.."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandGroup>
                                {questions.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={item.noi_dung_cau_hoi}
                                    onSelect={(currentValue) => {
                                      const selectedQuestion = questions.find(
                                        (e) =>
                                          e.noi_dung_cau_hoi === currentValue
                                      )
                                      setCurrentQuestion(selectedQuestion)
                                      setQuestionContent(currentValue)
                                      setOpenComboQuestions(false)
                                    }}
                                  >
                                    {item.noi_dung_cau_hoi}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        questionContent ===
                                          item.noi_dung_cau_hoi
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={handleAddQuestion}
                      >
                        <CirclePlus />
                      </Button>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="h-[400px] overflow-y-auto">
                        <Table>
                          <TableHeader className="bg-gray-50 sticky top-0 z-10">
                            <TableRow className="border-b border-gray-100">
                              <TableHead className="px-8 font-bold text-black w-[85%]">
                                CÂU HỎI
                              </TableHead>
                              <TableHead className="font-bold w-[10%]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getCurrentPageData().map((item: CauHoi) => (
                              <TableRow
                                key={item.id}
                                className="border-b border-gray-100"
                              >
                                <TableCell className="px-8">
                                  {item.noi_dung_cau_hoi}
                                </TableCell>
                                <TableCell className="pr-8 text-right">
                                  <Trash2
                                    className="h-4 w-4 mr-2 text-red-600 cursor-pointer"
                                    onClick={() =>
                                      handleRemoveQuestion(item.id)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex gap-5 justify-center items-center p-4 border-t border-gray-100">
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage <= 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">
                          {totalPages() === 0
                            ? '0/0'
                            : `${currentPage}/${totalPages()}`}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages())
                            )
                          }
                          disabled={
                            currentPage >= totalPages() || totalPages() === 0
                          }
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-10 justify-center">
                  <Button
                    className="bg-purple hover:bg-purple/90 text-white font-semibold min-w-36 self-center"
                    disabled={isLoading}
                    type="submit"
                  >
                    XÁC NHẬN
                  </Button>
                  <Button
                    className="bg-neutral-400 hover:bg-neutral-400/90 text-white font-semibold min-w-36 self-center"
                    disabled={isLoading}
                    type="button"
                    onClick={handleCancel}
                  >
                    HỦY
                  </Button>
                </div>
              </div>
            </form>
            <Dialog.Close asChild>
              <button
                onClick={handleCancel}
                className="
                      text-neutral-400
                      hover:text-black
                      absolute
                      top-[10px]
                      right-[10px]
                      inline-flex
                      h-[25px]
                      w-[25px]
                      appearance-none
                      items-center
                      justify-center
                      rounded-full
                      focus:outline-none
                    "
              >
                <IoMdClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default UpdateChapterModal
