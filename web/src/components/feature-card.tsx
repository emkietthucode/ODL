import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

interface FeatureCardProps {
  title: string
  description: string
  icon: StaticImageData
  to: string
}

function FeatureCard({ title, description, icon, to }: FeatureCardProps) {
  return (
    <Link
      href={to}
      className="relative py-7 px-[15px] shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)]"
    >
      <Image width={45} height={45} src={icon} alt="card-1" />
      <p className="mt-[27px] w-[230px] mb-[12px] text-[14px] font-semibold text-purple uppercase ">
        {title}
      </p>
      <p className="text-[14px] w-[230px] text-purple">{description}</p>
    </Link>
  )
}

export default FeatureCard
