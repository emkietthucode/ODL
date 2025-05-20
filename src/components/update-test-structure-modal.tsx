'use client'
import Modal from './Modal'
import Input from '@/components/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'
import useUpdateUserModal from '@/hooks/useUpdateUserModal'
import {
  Command,
  CommandEmpty,
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
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { Chuong, KhuVuc } from '@/types/types'
import useUpdateTestStructureModal from '@/hooks/useUpdateTestStructureModal'

const UpdateTestStructureModal = () => {
  const {
    isOpen,
    onClose,
    item: testStructure,
    triggerRefresh,
  } = useUpdateTestStructureModal()
  //   const [isLoading, setIsLoading] = useState(false)
  //   const [dateOfBirth, setDateOfBirth] = useState<Date>()
  //   const [openComboBox, setOpenComboBox] = useState(false)
  //   const [openComboBoxRole, setOpenComboBoxRole] = useState(false)
  //   const [roleVal, setRoleVal] = useState('')
  //   const [listKhuVuc, setListKhuVuc] = useState<KhuVuc[]>([])
  //   const [tenKhuVuc, setTenKhuVuc] = useState<string>()
  //   const [khuVucUUID, setKhuVucUUID] = useState<string>()

  const [chapters, setChapters] = useState<Chuong[]>([])

  const [selectedChapter, setSelectedChapter] = useState<Chuong | null>(null)
  const [openComboBox, setOpenComboBox] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: '',
      gender: '',
    },
  })
  const getChapters = async () => {
    try {
      const { data, error } = await supabase.rpc('fetch_license_chapters', {
        license_id: testStructure?.ma_hang_bang,
      })

      setChapters(data as Chuong[])
      setSelectedChapter(
        data?.find(
          (chapter: Chuong) => chapter.id === testStructure?.chuong_test
        ) || null
      )
    } catch (error) {}
  }

  useEffect(() => {
    if (testStructure) {
      reset({
        chapter: testStructure.chuong_test,
        totalQuestions: testStructure.so_luong_cau_hoi,
        requiredQuestions: testStructure.so_cau_de_dat,
        criticalQuestions: testStructure.so_cau_diem_liet,
        time: testStructure.thoi_gian_lam_bai,
      })

      setSelectedChapter(
        chapters?.find((chapter) => chapter.id === testStructure.chuong_test) ||
          null
      )
    }
    getChapters()
  }, [testStructure, reset])

  if (!testStructure) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      //   setIsLoading(true)

      const { data, error } = await supabase.rpc('update_test_structure', {
        structure_id: testStructure.id,
        test_chapter: selectedChapter?.id,
        total: values.totalQuestions,
        require: values.requiredQuestions,
        critical: values.criticalQuestions,
        test_time: values.time,
      })

      if (error) {
        console.log(error)
        return toast.error('Cập nhật không thành công.')
      }

      //   setIsLoading(false)
      toast.success('Cập nhật cấu trúc đề thi thành công.')
      triggerRefresh()
      reset()
      onClose()
    } catch (error) {
      toast.error('Cập nhật không thành công.')
    } finally {
      //   setIsLoading(false)
    }
  }

  return (
    <Modal
      title="CHỈNH SỬA CẤU TRÚC BÀI TEST"
      description=""
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-sm">Tổng số câu hỏi</span>
            <Input
              id="totalQuestions"
              type="number"
              error={!!errors.totalQuestions}
              {...register('totalQuestions', { required: true })}
              placeholder="Tổng số câu hỏi"
              className="my-2"
            />
          </div>
          <div className="w-full">
            <span className="text-sm">Số câu cần đạt</span>
            <Input
              id="requiredQuestions"
              type="number"
              error={!!errors.requiredQuestions}
              {...register('requiredQuestions', { required: true })}
              placeholder="Số câu hỏi để đạt"
              className="my-2"
            />
          </div>
          <div>
            <span className="text-sm">Số đã làm sai</span>
            <Input
              id="criticalQuestions"
              type="number"
              error={!!errors.criticalQuestions}
              {...register('criticalQuestions', { required: true })}
              placeholder="Số câu đã làm sai"
              className="my-2"
            />
          </div>
          <div>
            <span className="text-sm">Thời gian làm bài</span>
            <Input
              id="time"
              type="number"
              error={!!errors.criticalQuestions}
              {...register('time', { required: true })}
              placeholder="Số câu đã làm sai"
              className="my-2"
            />
          </div>
        </div>

        <div>
          <span className="text-sm">Chương</span>
          <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                aria-expanded={openComboBox}
                className={cn('w-full justify-between font-normal')}
              >
                {selectedChapter ? selectedChapter.ten_chuong : 'Chọn chương'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[420px] p-0 ">
              <Command>
                <CommandInput placeholder="Tìm khu vực..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy chương.</CommandEmpty>
                  <CommandGroup>
                    {chapters?.map((chapter: Chuong) => (
                      <CommandItem
                        key={chapter.id}
                        value={chapter.ten_chuong || ''}
                        onSelect={(currentValue) => {
                          setSelectedChapter(
                            chapters.find(
                              (chapter) => chapter.ten_chuong === currentValue
                            ) || null
                          )
                          setOpenComboBox(false)
                        }}
                      >
                        {chapter.ten_chuong}
                        <Check
                          className={cn(
                            'ml-auto',
                            selectedChapter?.ten_chuong === chapter.ten_chuong
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

        <div className="mt-3 flex gap-10 justify-center">
          <Button
            className="bg-purple hover:bg-purple/90 text-white font-semibold min-w-36 self-center"
            type="submit"
          >
            XÁC NHẬN
          </Button>
          <Button
            className="bg-neutral-400 hover:bg-neutral-400/90 text-white font-semibold min-w-36 self-center"
            type="submit"
            onClick={() => {
              reset()
              onClose()
            }}
          >
            HỦY
          </Button>
        </div>
      </form>
      {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4"> */}
      {/* <Input
          id="fullName"
          disabled={isLoading}
          error={!!errors.fullName}
          {...register('fullName', { required: true })}
          placeholder="Họ và tên"
        />
        <Input readOnly placeholder={nguoiDung.email} />
        <Input
          id="gender"
          disabled={isLoading}
          error={!!errors.gender}
          {...register('gender', { required: false })}
          placeholder="Giới tính"
        />
        <div className="flex gap-5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !dateOfBirth && 'text-muted-foreground'
                )}
              >
                <CalendarIcon />
                {dateOfBirth ? (
                  format(dateOfBirth, 'PPP', { locale: vi })
                ) : (
                  <span>Chọn ngày sinh</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateOfBirth}
                onSelect={setDateOfBirth}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover open={openComboBoxRole} onOpenChange={setOpenComboBoxRole}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                aria-expanded={openComboBoxRole}
                className={cn('w-full justify-between')}
              >
                {roleVal
                  ? roles.find((role) => role.value === roleVal)?.label
                  : 'Chọn vai trò'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 ">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {roles.map((role) => (
                      <CommandItem
                        key={role.value}
                        value={role.value}
                        onSelect={(currentValue) => {
                          setRoleVal(
                            currentValue === roleVal ? '' : currentValue
                          )
                          setOpenComboBoxRole(false)
                        }}
                      >
                        {role.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            roleVal === role.value ? 'opacity-100' : 'opacity-0'
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

        <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              aria-expanded={openComboBox}
              className={cn('w-full justify-between')}
            >
              {tenKhuVuc
                ? listKhuVuc.find((khuVuc) => khuVuc.ten_khu_vuc === tenKhuVuc)
                    ?.ten_khu_vuc
                : 'Chọn khu vực'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[420px] p-0 ">
            <Command>
              <CommandInput placeholder="Tìm khu vực..." className="h-9" />
              <CommandList>
                <CommandEmpty>Không tìm thấy khu vực.</CommandEmpty>
                <CommandGroup>
                  {listKhuVuc.map((khuVuc: KhuVuc) => (
                    <CommandItem
                      key={khuVuc.id}
                      value={khuVuc.ten_khu_vuc || ''}
                      onSelect={(currentValue) => {
                        setTenKhuVuc(currentValue)
                        setKhuVucUUID(
                          listKhuVuc.find(
                            (khuVuc) => khuVuc.ten_khu_vuc === currentValue
                          )?.id
                        )
                        setOpenComboBox(false)
                      }}
                    >
                      {khuVuc.ten_khu_vuc}
                      <Check
                        className={cn(
                          'ml-auto',
                          tenKhuVuc === khuVuc.ten_khu_vuc
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
              onClose()
            }}
          >
            HỦY
          </Button>
        </div>
      </form> */}
    </Modal>
  )
}

export default UpdateTestStructureModal
