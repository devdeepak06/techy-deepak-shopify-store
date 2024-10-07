import { useEffect, useState } from "react";
import { HeaderNav } from "../types/header";
import { Link } from "react-router-dom";
interface HeaderProps {
  totalItems: number;
}
const Header = ({ totalItems }: HeaderProps) => {
  const [navs, setNavs] = useState<HeaderNav[]>([]);
  useEffect(() => {
    async function fetchedAllNavs() {
      try {
        const navs = {
          nab_items: [
            { id: 1, handle: "home", name: "Home", url: "/home" },
            {
              id: 2,
              handle: "catalog",
              name: "Catalog",
              url: "/collections/catalog",
            },
            {
              id: 3,
              handle: "contact",
              name: "Contact",
              url: "/pages/contact",
            },
            {
              id: 4,
              handle: "tasklist",
              name: "ToDo List",
              url: "/pages/task",
            },
          ],
        };
        setNavs(navs.nab_items);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchedAllNavs();
  }, []);
  return (
    <header className="header z-20 grid items-center grid-cols-[auto_auto_1fr] gap-x-8 mx-auto my-0 px-20 py-5 sticky top-0 bg-white">
      <h2 className="col-start-1 col-end-2 row-start-1 row-end-2 m-0 leading-none justify-self-start ">
        <Link
          to="/home"
          className="header__heading-link link link--text focus-inset inline-block p-3 no-underline break-words"
        >
          <span className="h2 leading-none">techydeepak</span>
        </Link>
      </h2>

      <nav className="header__inline-menu block mx-0 col-start-2">
        <ul
          className="list-menu inline-flex flex-wrap list-none p-0 m-0"
          role="list"
        >
          {navs.map((nav) => (
            <li key={nav.id}>
              <Link
                to={`${nav.url}`}
                id={`HeaderMenu-${nav.handle}`}
                className="header__menu-item list-menu__item link link--text focus-inset"
              >
                <span>{nav.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header__icons flex col-start-3 justify-self-end header__icons--localization header-localization">
        <div className="desktop-localization-wrapper"></div>
        <Link
          to="/account"
          className="header__icon header__icon--account link focus-inset small-hide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            className="icon icon-account"
            fill="none"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z"
              fill="currentColor"
            ></path>
          </svg>

          <span className="visually-hidden">Account</span>
        </Link>
        <Link to="/pages/wishlist" className="button-floating">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x={0} fill="none" width={24} height={24} />
            <g>
              <path d="M16.5 4.5c2.206 0 4 1.794 4 4 0 4.67-5.543 8.94-8.5 11.023C9.043 17.44 3.5 13.17 3.5 8.5c0-2.206 1.794-4 4-4 1.298 0 2.522.638 3.273 1.706L12 7.953l1.227-1.746c.75-1.07 1.975-1.707 3.273-1.707m0-1.5c-1.862 0-3.505.928-4.5 2.344C11.005 3.928 9.362 3 7.5 3 4.462 3 2 5.462 2 8.5c0 5.72 6.5 10.438 10 12.85 3.5-2.412 10-7.13 10-12.85C22 5.462 19.538 3 16.5 3z" />
            </g>
          </svg>
          {/* <span className="wishCount wishListCount">2</span> */}
        </Link>
        <Link
          to="/cart"
          className="header__icon header__icon--cart link focus-inset"
          id="cart-icon-bubble"
          role="button"
          aria-haspopup="dialog"
        >
          <svg
            className="icon icon-cart-empty"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <div className="cart-count-bubble">
            <span aria-hidden="true">{totalItems}</span>
            <span className="visually-hidden">{totalItems} items</span>
          </div>
          <span className="visually-hidden">Cart</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
