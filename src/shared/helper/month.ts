export function getMonths(locale: string) {
  const language: string = locale || 'en'
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1)
    const label = new Intl.DateTimeFormat(language, { month: 'long' }).format(
      date,
    )
    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value: i + 1,
    }
  })
}
