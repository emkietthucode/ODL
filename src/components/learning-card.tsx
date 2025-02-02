import Image from 'next/image'

interface LearningCardProps {
  icon: string
  title: string
  desc: string
}

const LearningCard: React.FC<LearningCardProps> = ({ icon, title, desc }) => {
  return (
    <div
      className="
        w-[300px] h-[400px] 
        bg-custom-light-violet 
        flex flex-col justify-between
        cursor-pointer  
        p-5
        drop-shadow-[13px_5px_5px_rgba(0,0,0,0.25)]
        select-none
      "
    >
      <Image src={icon} alt="" />
      <div className="flex flex-col gap-5 h-[40%]">
        <div className="text-purple font-semibold">{title}</div>
        <div className="text-purple">{desc}</div>
      </div>
    </div>
  )
}

export default LearningCard
