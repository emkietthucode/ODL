function setLanguageCookie(locale: string) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000` // 1 year
}

export default setLanguageCookie
