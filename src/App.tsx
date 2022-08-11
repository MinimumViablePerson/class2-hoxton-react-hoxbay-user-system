import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import { Basket } from './pages/Basket'
import { Categories } from './pages/Categories'
import { CategoryItems } from './pages/CategoryItems'
import { PageNotFound } from './pages/PageNotFound'
import { ProductDetails } from './pages/ProductDetails'
import { Products } from './pages/Products'
import { SignIn } from './pages/SignIn'
import { BasketItem, Product, User } from './types'

function App () {
  const [user, setUser] = useState<null | User>(null)
  const [itemToBeAdded, setItemToBeAdded] = useState<Product | null>(null)

  console.log('current user:', user)

  function signIn (user: User) {
    localStorage.id = user.id
    setUser(user)
  }

  function signOut () {
    localStorage.removeItem('id')
    setUser(null)
  }

  const navigate = useNavigate()

  function createItem (product: Product) {
    if (user === null) {
      return
    }
    // if not: create a new basket item
    fetch(`http://localhost:4000/basket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: 1,
        userId: user.id
      })
    })
  }

  function updateQuantity (item: BasketItem) {
    // if the item is already in the basket: increase quantity
    fetch(`http://localhost:4000/basket/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: item.quantity + 1 })
    })
  }

  function addItemToBasket (product: Product) {
    if (user === null) {
      navigate('/sign-in')
      setItemToBeAdded(product)
      return
    }
    // check if the item is already in the basket
    fetch(
      `http://localhost:4000/basket?productId=${product.id}&userId=${user.id}`
    )
      .then(resp => resp.json())
      .then(results => {
        if (results.length === 0) createItem(product)
        else updateQuantity(results[0])
      })
      .then(() => navigate('/basket'))
  }

  useEffect(() => {
    const userId = localStorage.id
    if (userId) {
      fetch(`http://localhost:4000/users/${userId}`)
        .then(resp => resp.json())
        .then(userFromServer => {
          setUser(userFromServer)
          navigate('/basket')
        })
    } else {
      navigate('/sign-in')
    }
  }, [localStorage.id])

  useEffect(() => {
    if (user && itemToBeAdded) {
      console.log('Adding item to basket', user, itemToBeAdded)
      addItemToBasket(itemToBeAdded)
      setItemToBeAdded(null)
    }
  }, [itemToBeAdded, user])

  return (
    <>
      <Header signOut={signOut} user={user} />
      <main>
        <Routes>
          <Route index element={<Navigate to='/products' />} />
          <Route path='/products' element={<Products />} />
          <Route
            path='/products/:id'
            element={<ProductDetails addItemToBasket={addItemToBasket} />}
          />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<CategoryItems />} />
          <Route path='/basket' element={<Basket user={user} />} />
          <Route path='/sign-in' element={<SignIn signIn={signIn} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
