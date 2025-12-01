import { Tab } from '@/components/tab'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// flipCountry ? `bg-neutral-500 hover:bg-neutral-500/90` : ''

const tabsVN = [
  { label: 'Tất cả' },
  { label: 'Mô tô' },
  { label: 'Ô tô - Tải - Khách' },
  { label: 'Rơ-mooc' },
]

function RoadmapDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-light-purple-admin p-8 flex justify-between items-center">
        <h1 className="text-purple text-2xl font-bold ml-10">ROADMAP</h1>
      </div>
      <div className="flex gap-10 container mx-auto p-8">
        <div className="ml-4 flex flex-col items-center bg-white min-w-64 h-[735px] rounded-lg drop-shadow-lg">
          <div className="mt-10 text-sm font-semibold text-purple">
            DANH SÁCH QUỐC GIA
          </div>
          <hr className="my-6 w-[200px] h-px mx-auto bg-light-purple border-0 rounded dark:bg-purple"></hr>
          <button
            //   onClick={() => {
            //     setFlipCountry(true)
            //   }}
            className={cn(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] px-2`
            )}
          >
            VIỆT NAM
          </button>
          <button
            // onClick={() => {
            //   setFlipCountry(false)
            // }}
            className={cn(
              `my-3 font-semibold text-sm rounded-lg text-white bg-purple hover:bg-purple/90 flex h-[43px] items-center w-[150px] pl-2`
            )}
          >
            ÚC
          </button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center space-x-4 mb-6">
            <Input
              type="text"
              placeholder="Search"
              className="bg-white border w-full sm:w-[200px] md:w-[300px] lg:w-[400px] max-w-full rounded-full px-4 py-2"
              //   onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              //   onClick={insertOnOpen}
              className="bg-blue-500 hover:bg-blue-500/90 w-[120px] text-white px-4 py-2 rounded-md"
            >
              + Thêm
            </button>
          </div>

          <div className="flex flex-col text-sm  rounded-xl w-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="pl-[50px] pt-5 flex gap-5 justify-start items-center w-full bg-white rounded-md border-b border-zinc-400 border-opacity-60">
              {tabsVN.map((tab) => (
                <div
                  key={tab.label}
                  //   onClick={() => handleTabClick(tab.label)}
                  className="cursor-pointer self-center"
                >
                  <Tab label={tab.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadmapDashboard
