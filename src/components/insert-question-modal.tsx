'use client'

import useInsertQuestionModal from '@/hooks/useInsertQuestionModal'
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'
import {
  Command,
  CommandGroup,
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Question, Answer } from '@/types/types'

const countries = [
  {
    value: 'Việt Nam',
    label: 'Việt Nam',
    uuid: 'd078c695-a8b8-4bab-988f-f5bb2094b0e4',
  },
  {
    value: 'Úc',
    label: 'Úc',
    uuid: '6f784311-f8b9-48ce-a202-ac32e5877057',
  },
]

const InsertQuestionModal = () => {
  const [openComboBox, setOpenComboBox] = useState(false)
  const [countryVal, setCountryVal] = useState('')
  const [countryUUID, setCountryUUID] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const insertQuestionModal = useInsertQuestionModal()
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
      { noi_dung_lua_chon: '', la_lua_chon_dung: false, so_thu_tu: 2 },
      { noi_dung_lua_chon: '', la_lua_chon_dung: false, so_thu_tu: 3 },
      { noi_dung_lua_chon: '', la_lua_chon_dung: false, so_thu_tu: 4 },
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
                  md:max-h-[85vh]
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
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="noi_dung_cau_hoi">Question</Label>
                    <Textarea
                      id="noi_dung_cau_hoi"
                      name="noi_dung_cau_hoi"
                      value={question.noi_dung_cau_hoi}
                      onChange={handleQuestionChange}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hinh_anh">Image URL</Label>
                    <Input
                      id="hinh_anh"
                      name="hinh_anh"
                      value={question.hinh_anh || ''}
                      onChange={handleQuestionChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="giai_thich">Explanation</Label>
                    <Input
                      id="giai_thich"
                      name="giai_thich"
                      value={question.giai_thich || ''}
                      onChange={handleQuestionChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goi_y">Hint</Label>
                    <Input
                      id="goi_y"
                      name="goi_y"
                      value={question.goi_y || ''}
                      onChange={handleQuestionChange}
                      className="mt-1"
                    />
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
                    <Label htmlFor="la_cau_diem_liet">
                      Is critical question
                    </Label>
                  </div>
                  <div>
                    <Label htmlFor="ma_chuong">Chapter ID</Label>
                    <Input
                      id="ma_chuong"
                      name="ma_chuong"
                      value={question.ma_chuong}
                      onChange={handleQuestionChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loai_cau_hoi">Question Type</Label>
                    <Input
                      id="loai_cau_hoi"
                      name="loai_cau_hoi"
                      value={question.loai_cau_hoi}
                      onChange={handleQuestionChange}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <RadioGroup
                    value={question.lua_chon
                      .findIndex((a) => a.la_lua_chon_dung)
                      .toString()}
                    onValueChange={(value) =>
                      handleCorrectAnswerChange(parseInt(value))
                    }
                    className="space-y-4"
                  >
                    {question.lua_chon.map((answer, index) => (
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
                            placeholder={`Answer ${index + 1}`}
                            className="border-none bg-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
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
