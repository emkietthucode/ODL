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
import { KhuVuc } from '@/types/types'

const roles = [
  {
    value: 'admin',
    label: 'Quản vị viên',
  },
  {
    value: 'user',
    label: 'Người dùng',
  },
]
const UpdateUserModal = () => {
  const {
    isOpen,
    onClose,
    item: nguoiDung,
    triggerRefresh,
  } = useUpdateUserModal()
  const [isLoading, setIsLoading] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [openComboBox, setOpenComboBox] = useState(false)
  const [openComboBoxRole, setOpenComboBoxRole] = useState(false)
  const [roleVal, setRoleVal] = useState('')
  const [listKhuVuc, setListKhuVuc] = useState<KhuVuc[]>([])
  const [tenKhuVuc, setTenKhuVuc] = useState<string>()
  const [khuVucUUID, setKhuVucUUID] = useState<string>()
  //const {user} = useUser();
  //const supabaseClient = useSupabaseClient();
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
  const getKhuVuc = async () => {
    const { data, error } = await supabase.from('khu_vuc').select()
    if (error) {
      return toast.error('Lỗi lấy danh sách khu vực')
    }
    setListKhuVuc(data)
  }

  useEffect(() => {
    if (nguoiDung) {
      reset({
        fullName: nguoiDung.ho_ten || '',
        email: nguoiDung.email || '',
        gender: nguoiDung.gioi_tinh || '',
      })
      setTenKhuVuc(nguoiDung.ten_khu_vuc)
      setKhuVucUUID(nguoiDung.ma_khu_vuc)
      setRoleVal(nguoiDung.vai_tro || '')
      setDateOfBirth(new Date(nguoiDung.ngay_sinh))
    }
    getKhuVuc()
  }, [nguoiDung, reset])

  if (!nguoiDung) {
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
      setIsLoading(true)

      if (!values.fullName) {
        return toast.error('Vui lòng điền đầy đủ thông tin.')
      }

      const { error } = await supabase
        .from('nguoi_dung')
        .update({
          ho_ten: values.fullName,
          ngay_sinh: dateOfBirth,
          vai_tro: roleVal,
          gioi_tinh: values.gender,
          ma_khu_vuc: khuVucUUID === '' ? null : khuVucUUID,
        })
        .eq('id', nguoiDung.id)

      if (error) {
        console.log(error)
        return toast.error('Cập nhật người dùng không thành công.')
      }

      setIsLoading(false)
      toast.success('Cập nhật người dùng thành công.')
      triggerRefresh()
      reset()
      onClose()
    } catch (error) {
      toast.error('Cập nhật không thành công.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="CHỈNH SỬA HỒ SƠ NGƯỜI DÙNG"
      description="Điền thông tin vào đây"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
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
      </form>
    </Modal>
  )
}

export default UpdateUserModal
