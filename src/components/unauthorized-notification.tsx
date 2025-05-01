import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const UnauthorizedNotification = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-2xl font-bold text-red-600">
        Không có quyền truy cập
      </h1>
      <p className="text-gray-600">
        Bạn không có quyền truy cập vào trang này.
      </p>
      <Button onClick={() => router.push('/')} className="mt-4">
        Quay về trang chủ
      </Button>
    </div>
  )
}

export default UnauthorizedNotification
