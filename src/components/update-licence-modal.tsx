'use client'

import useUpdateLicenceModal from '@/hooks/useUpdateLicenceModal'
import Modal from './Modal'
import Input from '@/components/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
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
import { set } from 'date-fns'

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

const UpdateLicenceModal = () => {
  const [openComboBox, setOpenComboBox] = useState(false)
  const [countryVal, setCountryVal] = useState('')
  const [countryUUID, setCountryUUID] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    isOpen,
    onClose,
    item: hangBang,
    triggerRefresh,
  } = useUpdateLicenceModal()
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

  useEffect(() => {
    if (hangBang) {
      reset({
        licenceName: hangBang.ten_hang_bang || '',
        description: hangBang.mo_ta_hang_bang || '',
      })
      const currentCountry = countries.find(
        (country) => country.uuid === hangBang.ma_khu_vuc
      )
      setCountryVal(currentCountry?.label || '')
    }
  }, [hangBang, reset])

  if (!hangBang) {
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

      if (!values.licenceName || !values.description || !countryVal) {
        return toast.error('Vui lòng điền đầy đủ thông tin.')
      }

      const { error } = await supabase
        .from('hang_bang')
        .update({
          ten_hang_bang: values.licenceName,
          mo_ta_hang_bang: values.description,
          ma_khu_vuc: countryUUID,
        })
        .eq('id', hangBang.id)

      if (error) {
        return toast.error('Cập nhật hạng bằng không thành công.')
      }

      setIsLoading(false)
      toast.success('Cập nhật hạng bằng mới thành công.')
      triggerRefresh()
      reset()
      onClose()
    } catch (error) {
      toast.error('Cập nhật mới không thành công.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="Cập nhật hạng bằng mới"
      description="Điền thông tin hạng bằng mới"
      isOpen={isOpen}
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
            'h-[100px]',
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
                : countryVal && 'Chọn quốc gia'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 ">
            <Command>
              <CommandList>
                <CommandGroup {...register('comboBox', { required: false })}>
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
        <Button
          className="bg-blue-500 hover:bg-blue-400"
          disabled={isLoading}
          type="submit"
        >
          Cập nhật
        </Button>
      </form>
    </Modal>
  )
}

export default UpdateLicenceModal
