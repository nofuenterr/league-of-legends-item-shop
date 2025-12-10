const formatPathname = (pathname) => {
  return pathname.split('').filter((c) => c !== '/').join('')
}

export default formatPathname
