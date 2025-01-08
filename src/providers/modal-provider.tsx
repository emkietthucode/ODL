'use client'

import InsertCountryModal from '@/components/insert-country-modal'
import UpdateCountryModal from '@/components/update-country-modal'
import DeleteCountryModal from '@/components/delete-country-modal'
import { useEffect, useState } from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <InsertCountryModal />
      <UpdateCountryModal />
      <DeleteCountryModal />
    </>
  )
}

export default ModalProvider
