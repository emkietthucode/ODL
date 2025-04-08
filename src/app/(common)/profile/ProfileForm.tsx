import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Genders } from '@/types/schemas/signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CameraIcon } from 'lucide-react'
import { useState } from 'react'

interface ProfileFormProps {
  onSubmit: (data: ProfileFormType) => void
  user: any
  regions: Array<any>
  states: Array<any>
}

export const ProfileFormSchema = z.object({
  name: z.string().min(6, 'Please enter your name'),
  phoneNumber: z.string().length(10, 'Please enter a valid phone number'),
  gender: z.nativeEnum(Genders),
  country: z.string().length(36, 'Invalid country ID'),
  state: z.string().nullable(),
  dob: z.date(),
  avatar: z
    .union([
      z
        .instanceof(File)
        .refine(
          (file) => ['image/jpeg', 'image/png'].includes(file.type),
          'Avatar must be a JPEG or PNG image'
        ),
      z.string(), // Allow string for existing URL
    ])
    .optional(),
})

export type ProfileFormType = z.infer<typeof ProfileFormSchema>

function ProfileForm({ onSubmit, user, regions, states }: ProfileFormProps) {
  const [preview, setPreview] = useState<string | null>(
    user?.anh_dai_dien || null
  )

  const form = useForm({
    defaultValues: {
      name: user?.ho_ten || '',
      phoneNumber: user?.so_dien_thoai || '',
      gender: user?.gioi_tinh || '',
      country: user?.ma_khu_vuc || '',
      state: user?.ma_tinh || '',
      dob: user?.ngay_sinh || new Date(),
      avatar: user?.anh_dai_dien || null,
    },
    resolver: zodResolver(ProfileFormSchema),
  })

  const errors = form.formState.errors

  const hasStates = () => {
    const currentRegion = form.watch('country')

    const stateList = states.filter((state) => state.quoc_gia === currentRegion)

    return stateList?.length > 0
  }

  const matchStates = () => {
    const currentRegion = form.watch('country')
    return states.filter((state) => state.quoc_gia === currentRegion)
  }

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue('avatar', file, {
        shouldDirty: true,
      })
    }
  }

  const handleSubmit = async (data: ProfileFormType) => {
    await onSubmit(data)
  }

  console.log('errors::', form.formState.errors)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <Avatar className="w-[100px] h-[100px]">
                <AvatarImage src={preview || 'https://github.com/shadcn.png'} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute cursor-pointer -bottom-1.5 left-1/2 -translate-x-1/2 p-0"
              >
                <CameraIcon className="w-8 h-8 fill-[#4182F9] " />
                <Input
                  type="file"
                  accept="image/jpeg, image/png"
                  placeholder={undefined}
                  onChange={handleUploadImage}
                  className="absolute left-0 opacity-0 bottom-0 overflow-hidden w-full outline-none h-full cursor-pointer"
                />
              </button>
            </div>

            <div>
              <span className="text-xl block">{user.ho_ten}</span>
              <span className="text-base block opacity-50">{user.email}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!form.formState.isDirty}
            className="bg-[#4182F9] w-[96px] h-[44px]"
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full my-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-[52px] bg-white"
                    placeholder="Your name"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="h-[52px] bg-white"
                    {...field}
                    placeholder="Your Phone Number"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#696F79]">Gender</FormLabel>
                {errors.gender && (
                  <FormMessage className="text-red-500 mt-1">
                    {/* {errors.gender.message} */}
                  </FormMessage>
                )}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[52px] bg-white">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Genders.Male}>{Genders.Male}</SelectItem>
                    <SelectItem value={Genders.Female}>
                      {Genders.Female}
                    </SelectItem>
                    <SelectItem value={Genders.Other}>
                      {Genders.Other}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#696F79]">Country</FormLabel>
                {errors.gender && (
                  <FormMessage className="text-red-500 mt-1">
                    {/* {errors.gender.message} */}
                  </FormMessage>
                )}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[52px] bg-white">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.ten_khu_vuc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[#696F79]">Country</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'min-w-[180px] text-left font-normal h-[52px] bg-white  w-full flex justify-start items-center',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'd LLL y')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date >= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#696F79]">State</FormLabel>
                {errors.gender && (
                  <FormMessage className="text-red-500 mt-1">
                    {/* {errors.gender.message} */}
                  </FormMessage>
                )}
                <Select
                  disabled={!hasStates()}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[52px] bg-white">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {matchStates().map((state) => (
                      <SelectItem value={state.id} key={state.id}>
                        {state.ten_khu_vuc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm
