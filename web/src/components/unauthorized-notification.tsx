import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const UnauthorizedNotification = () => {
  const router = useRouter()
  const t = useTranslations('unauthorized')

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-2xl font-bold text-red-600">{t('title')}</h1>
      <p className="text-gray-600">{t('message')}</p>
      <Button onClick={() => router.push('/')} className="mt-4">
        {t('returnHome')}
      </Button>
    </div>
  )
}

export default UnauthorizedNotification
