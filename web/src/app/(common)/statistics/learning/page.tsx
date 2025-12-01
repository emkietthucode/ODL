import ChapterTests from '@/components/user-statistics/ChapterTests'
import CircularProgressChart from '@/components/user-statistics/CircularProgressChart'
import ProgressCard from '@/components/user-statistics/ProgressCard'
import SegmentedCircularChart from '@/components/user-statistics/SegmentedCircularChart'
import { ChevronRight } from 'lucide-react'

interface LicenseCategoryProps {
  category: string
  status: string
  percentage: number
  completed: boolean
}

function LicenseCategory({
  category,
  status,
  percentage,
  completed,
}: LicenseCategoryProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">
        <div className="w-12 h-8 bg-white border border-purple-200 rounded flex items-center justify-center">
          <span className="text-sm font-medium text-purple">{percentage}%</span>
        </div>
      </div>

      <div className="flex-1">
        <h4 className="font-medium text-gray-800 mb-1">{category}</h4>
        <p className="text-xs text-gray-500">{status}</p>
      </div>

      <div className="flex-shrink-0">
        <ChevronRight className="h-5 w-5 text-purple" />
      </div>
    </div>
  )
}

function LearningStatistic() {
  return (
    <div className="flex mt-8 gap-[44px]">
      <div className="max-w-[640px]">
        <p>
          Xin chào <span className="font-semibold">PHƯƠNG NAM!</span>
        </p>
        <span className="text-[26px] font-semibold">TIẾN ĐỘ LUYỆN THI</span>
        <div className="flex flex-wrap gap-10">
          <ProgressCard
            title="A1 - Chương 1"
            subtitle="125 câu hỏi"
            percentage={75}
            color="#3b82f6"
            backgroundColor="#ffffff"
            textColor="#ffffff"
            className="h-[150px] w-[300px]"
          />
          <ProgressCard
            title="Luyện thi"
            subtitle="Tổng số câu đã làm"
            percentage={75}
            color="#F2943C"
            backgroundColor="#ffffff"
            textColor="#ffffff"
            className="h-[150px] w-[300px]"
          />
          <ProgressCard
            title="Luyện thi"
            subtitle="Tổng số câu đã làm"
            percentage={75}
            color="#91C54D"
            backgroundColor="#ffffff"
            textColor="#ffffff"
            className="h-[150px] w-[300px]"
          />
          <ProgressCard
            title="Luyện thi"
            subtitle="Tổng số câu đã làm"
            percentage={75}
            color="#F1C84D"
            backgroundColor="#ffffff"
            textColor="#ffffff"
            className="h-[150px] w-[300px]"
          />
        </div>

        <div className="my-8">
          <ChapterTests />
        </div>

        <div>
          <p className="text-[22px] font-semibold">Tỷ lệ làm bài đúng</p>
          <div className="flex gap-[53px]">
            <div className="w-[200px] h-[157px] rounded-[20px] border-[1px] border-[#D5D5D5] relative p-3">
              <span>Trung bình</span>
              <div className="w-[200px] h-[200px] absolute  top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] my-4">
                {' '}
                <CircularProgressChart
                  color="#A08CE6"
                  percentage={98}
                  rounded={true}
                />
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex flex-1 pt-[10px] pl-5 relative border-[1px] border-[#8E98A8] rounded-[12px] h-[64px] min-w-[375px]">
                <div>
                  <p className="font-medium text-[13px]">
                    Chương đạt tỉ lệ đúng cao nhất
                  </p>
                  <p className="font-light text-xs">Chương 1 - Tên chương 1</p>
                </div>
                <div className="w-[100px] h-[100px] absolute top-1/2 right-[10px] translate-y-[-50%]">
                  <SegmentedCircularChart
                    percentage={70}
                    className="text-sm"
                    fontSize="12px"
                    segments={10}
                  />
                </div>
              </div>

              <div className="flex flex-1 pt-[10px] pl-5 relative border-[1px] border-[#8E98A8] rounded-[12px] h-[64px] min-w-[375px]">
                <div>
                  <p className="font-medium text-[13px]">
                    Chương có nhiều câu trả lời sai
                  </p>
                  <p className="font-light text-xs">Chương 1 - Tên chương 1</p>
                </div>
                <div className="w-[100px] h-[100px] absolute top-1/2 right-[10px] translate-y-[-50%]">
                  <SegmentedCircularChart
                    percentage={70}
                    className="text-sm"
                    fontSize="12px"
                    segments={10}
                    color="#A71644"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[400px]">
        <p className="text-[22px] font-semibold">Tỷ lệ làm bài đúng</p>
        <div className="flex gap-[30px] flex-wrap">
          <div className="w-[180px] h-[180px] rounded-[20px] bg-light-purple-admin py-[30px] px-6 flex flex-col justify-between">
            <p className="max-w-[138px] text-[#979797]">
              Tổng số câu thường sai
            </p>
            <div className="flex justify-between items-end">
              <div className="w-1 h-[30px] rounded-full bg-[#8070B8]"></div>
              <p className="text-[#8070B8] font-bold text-[40px] leading-[30px]">
                65
              </p>
            </div>
          </div>

          <div className="w-[180px] h-[180px] rounded-[20px] bg-light-purple-admin py-[30px] px-6 flex flex-col justify-between">
            <p className="max-w-[138px] text-[#979797]">Đã ôn luyện</p>
            <div className="flex justify-between items-end">
              <div className="w-1 h-[30px] rounded-full bg-[#8070B8]"></div>
              <p className="text-[#8070B8] font-bold text-[40px] leading-[30px]">
                40
              </p>
            </div>
          </div>

          <div className="w-[180px] h-[180px] rounded-[20px] bg-light-purple-admin py-[30px] px-6 flex flex-col justify-between">
            <p className="max-w-[138px] text-[#979797]">Số câu mới thêm vào</p>
            <div className="flex justify-between items-end">
              <div className="w-1 h-[30px] rounded-full bg-[#8070B8]"></div>
              <p className="text-[#8070B8] font-bold text-[40px] leading-[30px]">
                03
              </p>
            </div>
          </div>

          <div className="w-[180px] h-[180px] rounded-[20px] bg-light-purple-admin py-[30px] px-6 flex flex-col justify-between">
            <p className="max-w-[138px] text-[#979797]">Số câu đã làm đúng</p>
            <div className="flex justify-between items-end">
              <div className="w-1 h-[30px] rounded-full bg-[#8070B8]"></div>
              <p className="text-[#8070B8] font-bold text-[40px] leading-[30px]">
                12
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[44px]">
          <p className="text-[22px] font-semibold">Ôn luyện câu điểm liệt</p>
          <div className="space-y-3">
            <LicenseCategory
              category="Hạng bằng A1"
              status="Trạng thái: Đã hoàn thành"
              percentage={100}
              completed={true}
            />
            <LicenseCategory
              category="Hạng bằng A"
              status="Trạng thái: Chưa hoàn thành"
              percentage={20}
              completed={false}
            />
            <LicenseCategory
              category="Hạng bằng B"
              status="Trạng thái: Đã hoàn thành"
              percentage={0}
              completed={true}
            />
            <LicenseCategory
              category="Hạng bằng C"
              status="Trạng thái: Đã hoàn thành"
              percentage={0}
              completed={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningStatistic
