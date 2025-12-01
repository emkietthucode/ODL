'use client'

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
import useInsertTestStructureModal from '@/hooks/useInsertTestStructureModal'
import { Chuong, HangBang } from '@/types/types'

const InsertTestStructureModal = () => {
  const [chapterCombobox, setChapterCombobox] = useState(false)
  const [licenseCombobox, setLicenseCombobox] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [chapters, setChapters] = useState<Chuong[]>([])
  const [selectedChapters, setSelectedChapters] = useState<Chuong | null>(null)
  const [licenses, setLicenses] = useState<HangBang[]>([])
  const [selectedLicense, setSelectedLicense] = useState<HangBang | null>(null)

  const insertTestStructureModal = useInsertTestStructureModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      totalQuestions: 0,
      time: 0,
      criticalQuestions: 0,
      requireQuestions: 0,
    },
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      insertTestStructureModal.onClose()
    }
  }

  const getChapters = async () => {
    if (!selectedLicense) return
    try {
      const { data, error } = await supabase.rpc('fetch_license_chapters', {
        license_id: selectedLicense.id,
      })

      setChapters(data as Chuong[])
    } catch (error) {}
  }

  const getLicenses = async () => {
    try {
      const { data, error } = await supabase.rpc('fetch_region_licenses', {
        region_slug: 'vietnam',
      })
      setLicenses(data as HangBang[])
    } catch (error) {}
  }

  useEffect(() => {
    getLicenses()
  }, [])

  useEffect(() => {
    getChapters()
  }, [selectedLicense])

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      //   const { error } = await supabase.from('hang_bang').insert({
      //     ten_hang_bang: values.licenceName,
      //     mo_ta_hang_bang: values.description,
      //     ma_khu_vuc: countryUUID,
      //   })

      //

      const { error } = await supabase.rpc('insert_chapter_test_structure', {
        license_id: selectedLicense?.id,
        chapter_id: selectedChapters?.id,
        total_questions: values.totalQuestions,
        critical_questions: values.criticalQuestions,
        require_questions: values.requireQuestions,
        test_time: values.time,
      })

      if (error) {
        return toast.error('Thêm mới không thành công.')
      }

      setIsLoading(false)
      toast.success('Thêm cấu trúc đề test mới thành công.')
      insertTestStructureModal.triggerRefresh()
      reset()
      insertTestStructureModal.onClose()
    } catch (error) {
      toast.error('Thêm mới không thành công.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="THÊM CẤU TRÚC ĐỀ THI"
      description=""
      isOpen={insertTestStructureModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-sm">Số lượng câu hỏi</span>
            <Input
              id="totalQuestions"
              disabled={isLoading}
              error={!!errors.totalQuestions}
              {...register('totalQuestions', { required: true })}
              placeholder="Số lượng câu hỏi"
              type="number"
            />
          </div>

          <div>
            <span className="text-sm">Số lượng câu sai</span>
            <Input
              id="criticalQuestions"
              disabled={isLoading}
              error={!!errors.criticalQuestions}
              {...register('criticalQuestions', { required: true })}
              placeholder="Số lượng câu sai"
              type="number"
            />
          </div>

          <div>
            <span className="text-sm">Số câu để đạt</span>
            <Input
              id="requireQuestions"
              disabled={isLoading}
              error={!!errors.requireQuestions}
              {...register('requireQuestions', { required: true })}
              placeholder="Số câu để đạt"
              type="number"
            />
          </div>

          <div>
            <span className="text-sm">Thời gian làm bài</span>
            <Input
              id="time"
              disabled={isLoading}
              error={!!errors.requireQuestions}
              {...register('time', { required: true })}
              placeholder="Thời gian làm bài"
              type="number"
            />
          </div>
        </div>

        <span className="text-sm">Hạng bằng</span>
        <Popover open={licenseCombobox} onOpenChange={setLicenseCombobox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={licenseCombobox}
              className={cn(
                'justify-between',
                !!errors.comboBox && 'border-red-500'
              )}
            >
              {selectedLicense
                ? selectedLicense.ten_hang_bang
                : 'Chọn hạng bằng'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 ">
            <Command>
              <CommandList>
                <CommandGroup {...register('comboBox', { required: true })}>
                  {licenses?.map((license) => (
                    <CommandItem
                      key={license.id}
                      value={license.ten_hang_bang}
                      onSelect={(currentValue) => {
                        setSelectedLicense(
                          (licenses?.find(
                            (item) => item.ten_hang_bang === currentValue
                          ) as HangBang) || null
                        )
                        setLicenseCombobox(false)
                      }}
                    >
                      {license.ten_hang_bang}
                      <Check
                        className={cn(
                          'ml-auto',
                          license.ten_hang_bang ===
                            selectedLicense?.ten_hang_bang
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

        <span className="text-sm">Chương</span>
        <Popover open={chapterCombobox} onOpenChange={setChapterCombobox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={chapterCombobox}
              className={cn(
                'justify-between',
                !!errors.comboBox && 'border-red-500'
              )}
            >
              {selectedChapters ? selectedChapters.ten_chuong : 'Chọn chương'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 ">
            <Command>
              <CommandList>
                <CommandGroup {...register('comboBox', { required: true })}>
                  {chapters?.map((chapter) => (
                    <CommandItem
                      key={chapter.id}
                      value={chapter.ten_chuong}
                      onSelect={(currentValue) => {
                        setSelectedChapters(
                          (chapters?.find(
                            (item) => item.ten_chuong === currentValue
                          ) as Chuong) || null
                        )
                        setChapterCombobox(false)
                      }}
                    >
                      {chapter.ten_chuong}
                      <Check
                        className={cn(
                          'ml-auto',
                          chapter.ten_chuong === selectedChapters?.ten_chuong
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
              insertTestStructureModal.onClose()
            }}
          >
            HỦY
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default InsertTestStructureModal
