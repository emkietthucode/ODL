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
import UpdateUserModal from '@/components/update-user-modal'
import DeleteUserModal from '@/components/delete-user-modal'
import InsertQuestionModal from '@/components/insert-question-modal'
import DeleteQuestionModal from '@/components/delete-question-modal'
import UpdateQuestionModal from '@/components/update-question-modal'
import InsertChapterModal from '@/components/insert-chapter-modal'
import DeleteChapterModal from '@/components/delete-chapter-modal'

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
      <UpdateUserModal />
      <DeleteUserModal />
      <InsertQuestionModal />
      <UpdateQuestionModal />
      <DeleteQuestionModal />
      <InsertChapterModal />
      <DeleteChapterModal />
    </>
  )
}

export default ModalProvider
