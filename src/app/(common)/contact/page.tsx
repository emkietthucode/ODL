'use client'

import { useTranslations } from 'next-intl'

import { FaPhoneVolume } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'
import { FaMapMarkerAlt } from 'react-icons/fa'

import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'

const options = [
  { id: 'system-error', label: 'Lỗi hệ thống' },
  { id: 'technical-support', label: 'Hỗ trợ kỹ thuật' },
  { id: 'partnership', label: 'Liên hệ hợp tác' },
  { id: 'other', label: 'Khác (Chi rõ nội dung)' },
]

function ContactPage() {
  const t = useTranslations('ContactPage')
  const [selectedOption, setSelectedOption] = useState('system-error')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success(t('successMessage'))
  }

  return (
    <div>
      <p className="w-full text-[40px] font-extrabold text-purple text-center">
        {t('contact')}
      </p>
      <p className="text-lg w-full text-center">{t('contactNow')}</p>

      <div className="w-[1200px] h-[667px] mt-9 shadow-[0px_0px_50px_26px_rgba(0,0,0,0.04)] rounded-[10px] mx-auto p-[10px] flex">
        <div className="w-[491px] h-full p-10 text-white flex flex-col justify-between bg-[#7869AD] rounded-tl-[10px] rounded-bl-[10px]">
          <div>
            <p className="font-bold text-[32px]">{t('info')}</p>
            <p className="max-w-[329px] text-lg">{t('description')}</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-[25px]">
              <FaPhoneVolume className="w-6 h-6" />
              <p>+84 000 00000</p>
            </div>

            <div className="flex items-center gap-[25px]">
              <IoMdMail className="w-6 h-6" />
              <p>demo@gmail.com</p>
            </div>

            <div className="flex items-center gap-[25px]">
              <FaMapMarkerAlt className="w-6 h-6" />
              <p>{t('address')}</p>
            </div>
          </div>

          <div className="flex gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#483F67]"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white text-[#483F67]"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#483F67]"
            >
              <FaDiscord className="w-4 h-4" />
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 px-[50px] pt-[54px] pb-8 flex-1 gap-10"
        >
          <div className="h-[80px] min-w-[240px] overflow-hidden">
            <Label htmlFor="firstname">{t('firstName')}</Label>
            <input
              id="firstname"
              type="text"
              className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-2 bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-gray-300"
              placeholder=""
            />
          </div>

          <div className="h-[80px] min-w-[240px] overflow-hidden">
            <Label htmlFor="lastname">{t('lastName')}</Label>
            <input
              id="lastname"
              type="text"
              className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-2 bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-gray-300"
              placeholder=""
            />
          </div>

          <div className="h-[80px] min-w-[240px] overflow-hidden">
            <Label htmlFor="email">{t('email')}</Label>
            <input
              id="email"
              type="text"
              className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-2 bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-gray-300"
              placeholder=""
            />
          </div>

          <div className="h-[80px] min-w-[240px] overflow-hidden">
            <Label htmlFor="phone">{t('phone')}</Label>
            <input
              id="phone"
              type="text"
              className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-2 bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-gray-300"
              placeholder=""
            />
          </div>

          <div className="col-span-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                {t('topic')}
              </h3>

              <div className="flex text-xs justify-between">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="contact-subject"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === option.id
                            ? 'bg-black border-black'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {selectedOption === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-sm ${
                        selectedOption === option.id
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-600'
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <Label htmlFor="content">{t('content')}</Label>
            <Textarea id="content" className="resize-none h-32" />
          </div>

          <div className="col-span-2 text-end">
            <button
              type="submit"
              className="w-[134px] h-[54px] bg-[#7869AD] text-white rounded-[5px] font-bold text-xl"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
