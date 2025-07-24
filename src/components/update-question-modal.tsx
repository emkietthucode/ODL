'use client'
import { v4 as uuidv4 } from 'uuid'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Check, ChevronsUpDown } from 'lucide-react'
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
import supabase from '@/utils/supabase/supabase'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Input from '@/components/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Chuong, LuaChon } from '@/types/types'
import useUpdateQuestionModal from '@/hooks/useUpdateQuestionModal'
import { set } from 'date-fns'

const questionTypes = [
  {
    value: 'Luật giao thông',
    label: 'Luật giao thông',
  },
  {
    value: 'Biển báo',
    label: 'Biển báo',
  },
  {
    value: 'Sa hình',
    label: 'Sa hình',
  },
]

const UpdateQuestionModal = () => {
  const [isShuffleAnswer, setIsShuffleAnswer] = useState(false)
  const [isCriticalQuestion, setIsCriticalQuestion] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    isOpen,
    onClose,
    item: cauHoi,
    triggerRefresh,
  } = useUpdateQuestionModal()
  const [openComboBoxType, setOpenComboType] = useState(false)
  const [questionTypeVal, setQuestionTypeVal] = useState('')
  const [openComboChapter, setOpenComboChapter] = useState(false)
  const [chapterUUID, setChapterUUID] = useState('')
  const [chapters, setChapters] = useState<Chuong[]>()
  const [question, setQuestion] = useState({
    lua_chon: [
      { id: '', noi_dung_lua_chon: '', la_lua_chon_dung: false, so_thu_tu: 1 },
    ],
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      noi_dung_cau_hoi: '',
      hinh_anh: null,
      giai_thich: '',
      goi_y: '',
    },
  })

  const getDanhSachChuong = async () => {
    const { data, error } = await supabase.from('chuong').select()
    if (error) {
      return toast.error(error.message)
    }
    setChapters(data)
  }
  const getLuaChon = async (ma_cau_hoi: string) => {
    const { data, error } = await supabase
      .from('lua_chon')
      .select()
      .eq('ma_cau_hoi', ma_cau_hoi)
    if (error) {
      return toast.error(error.message)
    }
    if (data) {
      setQuestion({ lua_chon: data })
      setIsShuffleAnswer(
        question.lua_chon.some((choice) => choice.so_thu_tu === 0)
      )
    }
  }

  useEffect(() => {
    if (cauHoi) {
      reset({
        noi_dung_cau_hoi: cauHoi.noi_dung_cau_hoi || '',
        giai_thich: cauHoi.giai_thich || '',
        goi_y: cauHoi.goi_y || '',
      })
      setIsCriticalQuestion(cauHoi.la_cau_diem_liet)
      setChapterUUID(cauHoi.ma_chuong)
      setQuestionTypeVal(cauHoi.loai_cau_hoi)
      getLuaChon(cauHoi.id)
      getDanhSachChuong()
    }
  }, [cauHoi, reset])

  if (!cauHoi) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      setIsCriticalQuestion(false)
      setIsShuffleAnswer(false)
      setQuestion({
        lua_chon: [
          {
            id: uuidv4(),
            noi_dung_lua_chon: '',
            la_lua_chon_dung: false,
            so_thu_tu: 1,
          },
        ],
      })
      onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      if (question.lua_chon.length === 0) {
        return toast.error('Cần ít nhất một đáp án')
      }
      if (
        !question.lua_chon.some((choice) => choice.la_lua_chon_dung === true)
      ) {
        return toast.error('Cần ít nhất một đáp án đúng')
      }

      if (values.hinh_anh?.[0]) {
        const { error: imageError } = await supabase.storage
          .from('hinh_anh_cau_hoi')
          .upload(`${cauHoi.id}`, values.hinh_anh[0], {
            cacheControl: '3600',
            upsert: true,
          })
        if (imageError) {
          setIsLoading(false)
          return toast.error('Lỗi khi thêm hình ảnh.')
        }
      }

      const { error: errorCauHoi } = await supabase
        .from('cau_hoi')
        .update({
          noi_dung_cau_hoi: values.noi_dung_cau_hoi,
          ...(values.hinh_anh?.[0] && { hinh_anh: `${cauHoi.id}` }),
          giai_thich: values.giai_thich,
          goi_y: values.goi_y,
          la_cau_diem_liet: isCriticalQuestion,
          ma_chuong: chapterUUID || null,
          loai_cau_hoi: questionTypeVal,
        })
        .eq('id', cauHoi.id)

      if (errorCauHoi) {
        return toast.error('Cập nhật câu hỏi không thành công.')
      }

      const luaChonArr: LuaChon[] = question.lua_chon.map((choice, index) => ({
        id: choice.id,
        noi_dung_lua_chon: choice.noi_dung_lua_chon,
        la_lua_chon_dung: choice.la_lua_chon_dung,
        ma_cau_hoi: cauHoi.id,
        so_thu_tu: isShuffleAnswer ? 0 : index + 1,
      }))
      console.log(isShuffleAnswer)
      console.log(luaChonArr)

      // First delete all existing choices for this question
      const { error: deleteError } = await supabase
        .from('lua_chon')
        .delete()
        .eq('ma_cau_hoi', cauHoi.id)

      if (deleteError) {
        return toast.error('Cập nhật câu hỏi không thành công.')
      }

      // Then insert the new choices
      const { error: errorLuaChon } = await supabase
        .from('lua_chon')
        .insert(luaChonArr)

      if (errorLuaChon) {
        return toast.error('Cập nhật câu hỏi không thành công.')
      }

      setIsLoading(false)
      toast.success('Cập nhật câu hỏi mới thành công.')
      triggerRefresh()
      reset()
      onClose()
    } catch (error) {
      console.log(error)
      toast.error('Cập nhật mới không thành công.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...question.lua_chon]
    newAnswers[index] = { ...newAnswers[index], noi_dung_lua_chon: value }
    setQuestion({ ...question, lua_chon: newAnswers })
  }

  const handleCorrectAnswerChange = (index: number) => {
    const newAnswers = question.lua_chon.map((answer, i) => ({
      ...answer,
      la_lua_chon_dung: i === index,
    }))
    setQuestion({ ...question, lua_chon: newAnswers })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setIsShuffleAnswer(checked)
  }

  const handleCriticalQuestionboxChange = (checked: boolean) => {
    setIsCriticalQuestion(checked)
  }

  const addAnswer = () => {
    if (question.lua_chon.length > 3)
      return toast.error('Chỉ thêm được tối đa 4 đáp án')
    setQuestion({
      ...question,
      lua_chon: [
        ...question.lua_chon,
        {
          id: uuidv4(),
          noi_dung_lua_chon: '',
          la_lua_chon_dung: false,
          so_thu_tu: question.lua_chon.length + 1,
        },
      ],
    })
  }

  const removeAnswer = (index: number) => {
    const newAnswers = question.lua_chon.filter((_, i) => i !== index)
    setQuestion({ ...question, lua_chon: newAnswers })
  }

  const handleCancel = () => {
    reset()
    onClose()
    setIsCriticalQuestion(false)
    setIsShuffleAnswer(false)
    setQuestion({
      lua_chon: [
        {
          id: uuidv4(),
          noi_dung_lua_chon: '',
          la_lua_chon_dung: false,
          so_thu_tu: 1,
        },
      ],
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
                  md:max-w-[950px]
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
              {'CHỈNH SỬA CÂU HỎI'}
            </Dialog.Title>
            <Dialog.Description>{''}</Dialog.Description>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col justify-center gap-5">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="noi_dung_cau_hoi">Nội dung câu hỏi</Label>
                      <Textarea
                        id="noi_dung_cau_hoi"
                        {...register('noi_dung_cau_hoi', { required: true })}
                        className={cn(
                          `mt-1 border-0 bg-gray-100 placeholder:text-neutral-400`,
                          !!errors.noi_dung_cau_hoi &&
                            'border border-red-500 focus:border-red-500'
                        )}
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="giai_thich">{`Giải thích (nếu có)`}</Label>
                      <Input
                        id="giai_thich"
                        {...register('giai_thich', { required: false })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="goi_y">{`Gợi ý (nếu có)`}</Label>
                      <Input
                        id="goi_y"
                        {...register('goi_y', { required: false })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hinh_anh">{`Hình ảnh (nếu có)`}</Label>
                      <Input
                        type="file"
                        id="hinh_anh"
                        {...register('hinh_anh', { required: false })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ma_chuong">Chương</Label>
                      <Popover
                        open={openComboChapter}
                        onOpenChange={setOpenComboChapter}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            aria-expanded={openComboChapter}
                            className={cn('w-full justify-between')}
                          >
                            {chapterUUID
                              ? chapters?.find(
                                  (chapter) => chapter.id === chapterUUID
                                )
                                ? `${
                                    chapters.find(
                                      (chapter) => chapter.id === chapterUUID
                                    )?.ten_chuong
                                  } - ${
                                    chapters.find(
                                      (chapter) => chapter.id === chapterUUID
                                    )?.mo_ta_chuong
                                  }`
                                : 'Chương không tồn tại'
                              : 'Chọn chương'}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0 ">
                          <Command>
                            <CommandInput
                              placeholder="Tìm chương..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandGroup>
                                {chapters?.map((chapter) => (
                                  <CommandItem
                                    key={chapter.id}
                                    value={
                                      chapter.ten_chuong + chapter.mo_ta_chuong
                                    }
                                    onSelect={(currentValue) => {
                                      setChapterUUID(
                                        chapter.id === chapterUUID
                                          ? ''
                                          : chapter.id
                                      )
                                      setOpenComboChapter(false)
                                    }}
                                  >
                                    {`${chapter.ten_chuong} - ${chapter.mo_ta_chuong}`}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        chapterUUID === chapter.id
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
                    <div>
                      <Label htmlFor="loai_cau_hoi">Loại câu hỏi</Label>
                      <Popover
                        open={openComboBoxType}
                        onOpenChange={setOpenComboType}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            aria-expanded={openComboBoxType}
                            className={cn('w-full justify-between')}
                          >
                            {questionTypeVal
                              ? questionTypes.find(
                                  (type) => type.value === questionTypeVal
                                )?.label
                              : 'Chọn loại câu hỏi'}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0 ">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {questionTypes.map((type) => (
                                  <CommandItem
                                    key={type.value}
                                    value={type.value}
                                    onSelect={(currentValue) => {
                                      setQuestionTypeVal(
                                        currentValue === questionTypeVal
                                          ? ''
                                          : currentValue
                                      )
                                      setOpenComboType(false)
                                    }}
                                  >
                                    {type.label}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        questionTypeVal === type.value
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

                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={isCriticalQuestion}
                        onCheckedChange={handleCriticalQuestionboxChange}
                      />
                      <Label htmlFor="la_cau_diem_liet">Câu điểm liệt</Label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <RadioGroup
                      value={question.lua_chon
                        .findIndex((a) => a.la_lua_chon_dung)
                        .toString()}
                      onValueChange={(value) =>
                        handleCorrectAnswerChange(parseInt(value))
                      }
                    >
                      {question.lua_chon.map((answer, index) => (
                        <div key={index}>
                          <div className="p-1 text-sm">Đáp án {index + 1}</div>
                          <div
                            key={index}
                            className={cn(
                              'flex items-center space-x-2 p-2 rounded-md transition-colors',
                              question.lua_chon[index].la_lua_chon_dung
                                ? 'bg-green-100'
                                : 'bg-red-100'
                            )}
                          >
                            <RadioGroupItem
                              value={index.toString()}
                              id={`answer-${index}`}
                            />
                            <div className="flex-grow">
                              <Input
                                value={answer.noi_dung_lua_chon}
                                onChange={(e) =>
                                  handleAnswerChange(index, e.target.value)
                                }
                                placeholder={`Nội dung`}
                                className="bg-transparent"
                              />
                            </div>

                            <IoMdClose
                              className="
                          text-neutral-400
                          hover:text-black
                            items-center
                            justify-center
                            rounded-full
                            focus:outline-none
                            "
                              onClick={() => removeAnswer(index)}
                            />
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={isShuffleAnswer}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đảo đáp án
                      </label>
                    </div>
                    <Button
                      className="bg-purple hover:bg-purple/90"
                      type="button"
                      onClick={addAnswer}
                    >
                      Thêm đáp án
                    </Button>
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

export default UpdateQuestionModal
