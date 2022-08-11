import { Link } from 'react-router-dom'
import { Product } from '../types'

type Props = {
  product: Product
}

export function ProductCard ({ product }: Props) {
  return (
    <li>
      <Link to={`/products/${product.id}`}>
        <article className='product-item'>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
        </article>
      </Link>
    </li>
  )
}
