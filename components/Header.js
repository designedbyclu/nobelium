import { useEffect, useRef } from "react";
import Link from "next/link";
import BLOG from "@/blog.config";
import { useLocale } from "@/lib/locale";

const NavBar = () => {
  const locale = useLocale();
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || "/", show: true },
    { id: 1, name: locale.NAV.ABOUT, to: "/about", show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: "/feed", show: true },
    { id: 3, name: locale.NAV.SEARCH, to: "/search", show: true },
  ];
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          (link) =>
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
  );
};

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef(null);
  const sentinalRef = useRef([]);
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add("sticky-nav-full");
      } else {
        navRef.current.classList.remove("sticky-nav-full");
      }
    } else {
      navRef.current.classList.add("remove-sticky");
    }
  };
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
  }, [sentinalRef]);
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? "max-w-3xl px-4" : "px-4 md:px-24"
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a>
              <div className="h-6">
                <svg
                  width="26"
                  height="24"
                  viewBox="0 0 26 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M6.44978 1.2213C6.55793 1.08167 6.7242 1 6.90034 1H20.0531C20.2627 1 20.4554 1.11536 20.5552 1.3005L25.9312 11.2797C26.022 11.4483 26.023 11.6513 25.9337 11.8207L20.7322 21.6948C20.6333 21.8826 20.4392 22 20.2277 22H6.90034C6.69091 22 6.49831 21.8848 6.39845 21.6999L1.06901 11.8259C0.977621 11.6566 0.976966 11.4524 1.06726 11.2825L6.31532 1.40852C6.33062 1.3797 6.34834 1.35225 6.36833 1.32647L6.44978 1.2213ZM2.52664 10.9718L6.82 2.89385L11.1246 10.9558H6.81889C5.36867 10.9558 4.07581 10.9617 3.14547 10.9675C2.91616 10.969 2.70886 10.9704 2.52664 10.9718ZM6.89306 20.2102L2.52568 12.1186C2.7113 12.1172 2.92333 12.1157 3.15842 12.1142C4.08742 12.1084 5.37631 12.1026 6.81889 12.1026H11.1449L6.89306 20.2102ZM19.8839 20.8533H7.84624L12.4352 12.1028L24.4815 12.1255L19.8839 20.8533ZM24.471 10.9788L12.4202 10.956L7.71663 2.14673H19.713L24.471 10.9788Z"
                      fill="fill-current text-black dark:text-white"
                      stroke="stroke-current text-black dark:text-white"
                      stroke-width="0.2"
                      stroke-miterlimit="10"
                    />
                  </g>
                </svg>
              </div>
            </a>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{" "}
              <span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
