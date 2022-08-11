import { useLocation, useParams } from 'react-router-dom'
import { User } from '../types'

type Props = {
  signIn: (user: User) => void
}

export function SignIn ({ signIn }: Props) {
  function handleSubmit (event: any) {
    event.preventDefault()
    let email = event.target.email.value
    let password = event.target.password.value

    fetch(`http://localhost:4000/users/${email}`)
      .then(resp => resp.json())
      .then(user => {
        if (user.password === password) {
          // the user exists AND their password is valid
          signIn(user)
        } else {
          alert('Your email/password is invalid.')
        }
      })
  }

  return (
    <section className='sign-in-section'>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='email' />
        <input type='password' name='password' placeholder='password' />
        <button>SIGN IN</button>
      </form>
    </section>
  )
}
