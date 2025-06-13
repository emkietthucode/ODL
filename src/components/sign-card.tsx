import Image from 'next/image'

interface SignCardProps {
  id: string
  name: string
  description?: string
  url: string
}

function SignCard({ name, description, url }: SignCardProps) {
  return (
    <div className="w-[390px] min-h-[180px] rounded-[16px] border-[1px] bg-light-purple-admin border-[#C7C7C7] flex p-[10px] gap-[15px]">
      <Image
        src={url}
        alt="sign"
        width={110}
        height={100}
        className="rounded-[12px] w-[110px] h-[110px]"
      />

      <div>
        <p className="mt-[5px] text-sm font-bold">{name}</p>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  )
}

export default SignCard
