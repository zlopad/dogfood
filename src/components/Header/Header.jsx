import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPaw } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../images/logo-husky-black.svg'
import logoWithLetters from '../../images/logo-with-letters-black.svg'
import Search from '../Search/Search'
import headerStyles from './Header.module.css'
import { useQueryContext } from '../../contexts/QueryContextProvider'

const vw = window.innerWidth
// const auth = false
function Header() {
  console.log(vw)
  const { token } = useQueryContext()
  let btns = (
    <>
      <button
        type="button"
        className={headerStyles.Button}
      >
        <Link
          to="./signin"
          className={headerStyles.Link}
        >
          Войти
        </Link>
      </button>
      <button
        type="button"
        className={headerStyles.Button}
      >
        <Link
          to="./signup"
          className={headerStyles.Link}
        >
          Зарегистрироваться
        </Link>
      </button>
    </>
  )
  if (token) {
    btns = (
      <>
        <NavLink
          to="/"
          className={classNames(headerStyles.Link)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </NavLink>
        <NavLink
          to="/"
          className={classNames(headerStyles.Link)}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink>
        <NavLink
          to="/profile"
          className={classNames(headerStyles.Link)}
        >
          <FontAwesomeIcon icon={faPaw} />
        </NavLink>
      </>
    )
  }
  return (
    <div className={headerStyles.Header}>
      <div className={headerStyles.wr}>
        <div className={headerStyles.Logo}>
          <Link
            to="/"
            className={headerStyles.Link}
          >
            <img
              src={vw > 768 ? logoWithLetters : logo}
              alt=""
            />
          </Link>
        </div>
        <div className={headerStyles.Search}>
          <Search />
        </div>
        <div className={headerStyles.Buttons}>{btns}</div>
      </div>
    </div>
  )
}

export default Header
