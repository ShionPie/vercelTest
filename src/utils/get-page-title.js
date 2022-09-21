import defaultSettings from '@/settings'

const title = defaultSettings.title || '五域科技'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
