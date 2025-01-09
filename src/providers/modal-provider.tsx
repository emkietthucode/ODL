'use client'

import InsertCountryModal from '@/components/insert-country-modal'
import UpdateCountryModal from '@/components/update-country-modal'
import DeleteCountryModal from '@/components/delete-country-modal'
import { useEffect, useState } from 'react'
import UpdateStateModal from '@/components/update-state-modal'
import InsertStateModal from '@/components/insert-state-modal'
import DeleteStateModal from '@/components/delete-state-modal'
import InsertLicenceModal from '@/components/insert-licence-modal'
import DeleteLicenceModal from '@/components/delete-licence-modal'
import UpdateLicenceModal from '@/components/update-licence-modal'

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
      <InsertLicenceModal />
      <UpdateLicenceModal />
      <DeleteLicenceModal />
    </>
  )
}

export default ModalProvider
