import { Link } from 'react-router-dom'
import { getRandomColor } from '../helpers'
import { User } from '../types'

type Props = {
  signOut: () => void
  user: User | null
}

function Header ({ signOut, user }: Props) {
  const randomColor = getRandomColor()
  return (
    <header
      className='header'
      style={{
        // @ts-ignore
        ['--random-colour']: `var(--${randomColor})`
      }}
    >
      <div className='header__logo' style={{ color: randomColor }}>
        Hoxbay
      </div>
      <nav className='header__nav'>
        <ul>
          <li>
            <Link to='/products'>Home</Link>
          </li>
          <li>
            <Link to='/categories'>Categories</Link>
          </li>
          <li>
            <Link to='/basket'>Basket</Link>
          </li>

          {user !== null ? <li>Welcome back, {user.name}!</li> : null}

          {user === null ? (
            <li>
              <Link to='/sign-in'>Sign In</Link>
            </li>
          ) : (
            <li>
              <button onClick={signOut}>Sign Out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
export default Header
