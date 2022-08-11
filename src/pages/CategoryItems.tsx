import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { Product } from '../types'

export function CategoryItems () {
  const [products, setProducts] = useState<Product[]>([])

  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/products?categoryId=${params.id}`)
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
