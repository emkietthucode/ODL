'use client'

import useInsertLicenceModal from '@/hooks/useInsertLicenceModal'
import Modal from './Modal'
import Input from '@/components/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
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
import { Textarea } from '@/components/ui/textarea'

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

const InsertLicenceModal = () => {
  const [openComboBox, setOpenComboBox] = useState(false)
  const [countryVal, setCountryVal] = useState('')
  const [countryUUID, setCountryUUID] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const insertLicenceModal = useInsertLicenceModal()
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
      insertLicenceModal.onClose()
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
      insertLicenceModal.triggerRefresh()
      reset()
      insertLicenceModal.onClose()
    } catch (error) {
      toast.error('Thêm mới không thành công.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="THÊM HẠNG BẰNG"
      description="Điền thông tin Hạng bằng mới vào đây"
      isOpen={insertLicenceModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="licenceName"
          disabled={isLoading}
          error={!!errors.licenceName}
          {...register('licenceName', { required: true })}
          placeholder="Tên hạng bằng"
        />

        <Textarea
          id="description"
          className={cn(
            `h-[100px]
            bg-gray-100
            placeholder:text-neutral-400
            placeholder:text-xs
            focus:outline-none
            `,
            !!errors.description && 'border-red-500' // Highlight error visually
          )}
          placeholder="Mô tả"
          {...register('description', { required: true })}
        />
        <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openComboBox}
              className={cn(
                'w-[200px] justify-between',
                !!errors.comboBox && !countryVal && 'border-red-500'
              )}
            >
              {countryVal
                ? countries.find((country) => country.value === countryVal)
                    ?.label
                : 'Chọn quốc gia'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 ">
            <Command>
              <CommandList>
                <CommandGroup {...register('comboBox', { required: true })}>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.value}
                      onSelect={(currentValue) => {
                        setCountryVal(
                          currentValue === countryVal ? '' : currentValue
                        )
                        setCountryUUID(country.uuid)
                        setOpenComboBox(false)
                      }}
                    >
                      {country.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          countryVal === country.value
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
              insertLicenceModal.onClose()
            }}
          >
            HỦY
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default InsertLicenceModal
