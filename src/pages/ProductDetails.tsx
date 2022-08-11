import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../types'

type Props = {
  addItemToBasket: (item: Product) => void
}

export function ProductDetails ({ addItemToBasket }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/products/${params.id}`)
      .then(resp => resp.json())
      .then(productFromServer => setProduct(productFromServer))
  }, [])

  if (product === null) return <h2>Loading...</h2>

  return (
    <section className='product-detail main-wrapper'>
      <img src={product.image} alt={product.title} />
      <div
        className='product-detail__side'
        style={{ borderColor: 'var(--yellow)' }}
      >
        <h3></h3>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>£{product.price}</p>
        <button
          onClick={() => {
            addItemToBasket(product)
          }}
        >
          Add to basket
        </button>
      </div>
    </section>
  )
}
