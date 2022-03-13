import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                                <svg
                  width="44"
                  height="38"
                  viewBox="0 0 68 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.3874 1.59015C15.6729 1.21779 16.1119 1 16.5769 1H51.3002C51.8536 1 52.3624 1.30762 52.6257 1.80133L66.8184 28.4126C67.0582 28.8621 67.0607 29.4035 66.825 29.8553L53.0931 56.1861C52.832 56.6868 52.3194 57 51.761 57H16.5769C16.024 57 15.5155 56.6928 15.252 56.1997L1.18217 29.8689C0.940919 29.4174 0.939189 28.8732 1.17757 28.4202L15.0324 2.08938C15.0728 2.01254 15.1197 1.93933 15.1723 1.87059L15.3874 1.59015ZM5.03033 27.5914L16.3649 6.05027L27.7291 27.5489H16.3619C12.5333 27.5489 9.12014 27.5645 6.66404 27.5801C6.05865 27.584 5.5114 27.5878 5.03033 27.5914ZM16.5577 52.2271L5.02779 30.6495C5.51783 30.6459 6.0776 30.6419 6.69822 30.638C9.15079 30.6225 12.5535 30.607 16.3619 30.6069H27.7826L16.5577 52.2271ZM50.8534 53.942H19.074L31.189 30.6073L62.9912 30.668L50.8534 53.942ZM62.9633 27.61L31.1494 27.5493L18.7319 4.05795H50.4022L62.9633 27.61Z"
                    className="fill-current text-black dark:text-white"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
