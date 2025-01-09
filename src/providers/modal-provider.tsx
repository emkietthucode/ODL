'use client'

import InsertCountryModal from '@/components/insert-country-modal'
import UpdateCountryModal from '@/components/update-country-modal'
import DeleteCountryModal from '@/components/delete-country-modal'
import { useEffect, useState } from 'react'
import UpdateStateModal from '@/components/update-state-modal'
import InsertStateModal from '@/components/insert-state-modal'
import DeleteStateModal from '@/components/delete-state-modal'

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
      <InsertStateModal />
      <UpdateStateModal />
      <DeleteStateModal />
    </>
  )
}

export default ModalProvider
