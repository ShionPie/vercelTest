import defaultSettings from '@/settings'

const title = defaultSettings.title || 'δΊεη§ζ'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
