import Image, { StaticImageData } from 'next/image'

interface FeatureCardProps {
  title: string
  description: string
  icon: StaticImageData
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="relative w-60 h-[158px] p-[10px] rounded-[30px] shadow-[2px_4px_10px_4px_rgba(0,0,0,0.18)]">
      <p className="mt-[40px] mb-[12px] text-[14px] font-semibold text-[#7869AD] uppercase ">
        {title}
      </p>
      <p className="text-[14px] text-[#7869AD]">{description}</p>

      <Image
        className="absolute top-[14px] right-[27px]"
        src={icon}
        alt="card-1"
      />
    </div>
  )
}

export default FeatureCard
