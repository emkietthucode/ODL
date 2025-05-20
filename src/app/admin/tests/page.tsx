'use client'

import ChapterTestTable from '@/components/chapter-test-table'
import { Tab } from '@/components/tab'
import useUpdateTestStructureModal from '@/hooks/useUpdateTestStructureModal'
import { cn } from '@/lib/utils'
import { CauTrucBaiTest } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import qs from 'query-string'
import useInsertTestStructureModal from '@/hooks/useInsertTestStructureModal'

const tabsVN = [
  { label: 'A1' },
  { label: 'A' },
  { label: 'B1' },
  { label: 'B' },
  { label: 'C' },
]

function TestDashboard() {
  const [nation, setNation] = useState<string>('vn')
  const [activeTab, setActiveTab] = useState<string>(tabsVN[0].label)
  const [tests, setTests] = useState<CauTrucBaiTest[]>([])
  const { onOpen: insertOnOpen, refreshTrigger: insertRefreshTrigger } =
    useInsertTestStructureModal()
  const router = useRouter()

  const { onOpen: updateOnOpen, refreshTrigger: updateRefreshTrigger } =
    useUpdateTestStructureModal()

  const fetchData = async () => {
    const { data, error } = await supabase.rpc('fetch_license_test_chapters', {
      license_name: activeTab,
    })

    setTests(data as CauTrucBaiTest[])
  }

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: '/admin/tests',
    })
    router.push(url)

    fetchData()
  }, [router, updateRefreshTrigger, insertRefreshTrigger])

  return (
    <div>
      <div className="bg-light-purple-admin p-8 flex justify-between items-center">
        <h1 className="text-purple text-2xl font-bold ml-10 uppercase">
          bài test
        </h1>
      </div>
      <div className="flex gap-10 container mx-auto p-8">
        <div className=" flex flex-col justify-start items-center px-[11px] bg-white w-[192px] h-[735px] rounded-lg drop-shadow-lg">
          <div className="mt-10 text-sm font-semibold text-purple">
            DANH SÁCH QUỐC GIA
          </div>
          <hr className="my-6 w-full h-px mx-auto bg-light-purple border-0 rounded dark:bg-purple"></hr>
          <button
            onClick={() => {
              setNation('vn')
            }}
            className={cn(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] px-2`,
              nation !== 'vn' ? `bg-neutral-500 hover:bg-neutral-500/90` : ''
            )}
          >
            VIỆT NAM
          </button>
          <button
            onClick={() => {
              setNation('au')
            }}
            className={cn(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] pl-2`,
              nation !== 'au' ? `bg-neutral-500 hover:bg-neutral-500/90` : ''
            )}
          >
            ÚC
          </button>
        </div>

        <div>
          <div className="w-full text-end">
            <button
              onClick={insertOnOpen}
              className="bg-blue-500 hover:bg-blue-500/90 w-[120px] text-white px-4 py-2 rounded-md"
            >
              + Thêm
            </button>
          </div>

          {nation === 'vn' && (
            <div className="flex flex-col text-sm rounded-xl flex-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <div className="pl-[50px] pt-5 flex gap-5 justify-start items-center bg-white rounded-md border-b border-zinc-400 border-opacity-60">
                {tabsVN.map((tab) => (
                  <div
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className="cursor-pointer self-center"
                  >
                    <Tab label={tab.label} isActive={tab.label === activeTab} />
                  </div>
                ))}
              </div>
              <ChapterTestTable data={tests} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestDashboard
