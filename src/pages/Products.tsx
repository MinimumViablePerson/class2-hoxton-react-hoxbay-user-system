import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { Product } from '../types'

export function Products () {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(resp => resp.json())
      .then(productsFromServer => setProducts(productsFromServer))
  }, [])

  return (
    <section className='products-container main-wrapper'>
      <ul className='products-container__list'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}
