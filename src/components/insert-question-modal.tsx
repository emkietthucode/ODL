'use client'

import useInsertQuestionModal from '@/hooks/useInsertQuestionModal'
import Modal from './Modal'
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
import { Question, Answer, Chuong } from '@/types/types'

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

const InsertQuestionModal = () => {
  const [openComboBox, setOpenComboBox] = useState(false)
  const [countryVal, setCountryVal] = useState('')
  const [countryUUID, setCountryUUID] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const insertQuestionModal = useInsertQuestionModal()
  const [openComboBoxType, setOpenComboType] = useState(false)
  const [questionTypeVal, setQuestionTypeVal] = useState('')
  const [openComboChapter, setOpenComboChapter] = useState(false)
  const [chapterUUID, setChapterUUID] = useState('')
  const [chapters, setChapters] = useState<Chuong[]>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      licenceName: '',
      description: '',
      comboBox: '',
    },
  })

  const getDanhSachChuong = async () => {
    const { data, error } = await supabase.from('chuong').select()
    if (error) {
      return toast.error(error.message)
    }
    setChapters(data)
  }

  useEffect(() => {
    getDanhSachChuong()
  }, [])

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      insertQuestionModal.onClose()
    }
  }
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      if (!values.licenceName || !values.description || !countryVal) {
        return toast.error('Vui lòng điền đầy đủ thông tin.')
      }

      const { error } = await supabase.from('hang_bang').insert({
        ten_hang_bang: values.licenceName,
        mo_ta_hang_bang: values.description,
        ma_khu_vuc: countryUUID,
      })

      if (error) {
        return toast.error('Thêm hạng bằng không thành công.')
      }

      setIsLoading(false)
      toast.success('Thêm hạng bằng mới thành công.')
      insertQuestionModal.triggerRefresh()
      reset()
      insertQuestionModal.onClose()
    } catch (error) {
      toast.error('Thêm mới không thành công.')
    } finally {
      setIsLoading(false)
    }
  }

  const [question, setQuestion] = useState<Question>({
    noi_dung_cau_hoi: '',
    la_cau_diem_liet: false,
    ma_chuong: '',
    loai_cau_hoi: '',
    lua_chon: [
      { noi_dung_lua_chon: '', la_lua_chon_dung: false, so_thu_tu: 1 },
    ],
  })

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion({ ...question, [e.target.name]: e.target.value })
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

  const addAnswer = () => {
    if (question.lua_chon.length > 3)
      return toast.error('Chỉ thêm được tối đa 4 đáp án')
    setQuestion({
      ...question,
      lua_chon: [
        ...question.lua_chon,
        {
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

  return (
    <Dialog.Root
      open={insertQuestionModal.isOpen}
      defaultOpen={insertQuestionModal.isOpen}
      onOpenChange={onChange}
    >
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
              {'THÊM CÂU HỎI MỚI'}
            </Dialog.Title>
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
                        name="noi_dung_cau_hoi"
                        value={question.noi_dung_cau_hoi}
                        onChange={handleQuestionChange}
                        className="mt-1 border-0 bg-gray-100 placeholder:text-neutral-400 "
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="giai_thich">{`Giải thích (nếu có)`}</Label>
                      <Input
                        id="giai_thich"
                        name="giai_thich"
                        value={question.giai_thich || ''}
                        onChange={handleQuestionChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="goi_y">{`Gợi ý (nếu có)`}</Label>
                      <Input
                        id="goi_y"
                        name="goi_y"
                        value={question.goi_y || ''}
                        onChange={handleQuestionChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hinh_anh">{`Hình ảnh (nếu có)`}</Label>
                      <Input
                        type="file"
                        id="hinh_anh"
                        name="hinh_anh"
                        value={question.hinh_anh || ''}
                        onChange={handleQuestionChange}
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
                        id="la_cau_diem_liet"
                        checked={question.la_cau_diem_liet}
                        onCheckedChange={(checked) =>
                          setQuestion({
                            ...question,
                            la_cau_diem_liet: checked as boolean,
                          })
                        }
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
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đảo câu hỏi
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
                    type="submit"
                    onClick={() => {
                      reset()
                      insertQuestionModal.onClose()
                    }}
                  >
                    HỦY
                  </Button>
                </div>
              </div>
            </form>
            <Dialog.Close asChild>
              <button
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

export default InsertQuestionModal
