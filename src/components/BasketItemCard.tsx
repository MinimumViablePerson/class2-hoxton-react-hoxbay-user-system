import { BasketItem } from '../types'

type Props = {
  item: BasketItem
  updateOrRemoveItem: (item: BasketItem, newQuantity: number) => void
}

export function BasketItemCard ({ item, updateOrRemoveItem }: Props) {
  return (
    <li key={item.id}>
      <article className='basket-container__item'>
        <img src={item.product.image} alt={item.product.title} width='90' />
        <p>{item.product.title}</p>
        <p>
          Qty:
          <select
            value={item.quantity}
            onChange={event => {
              const newQuantity = Number(event.target.value)
              updateOrRemoveItem(item, newQuantity)
            }}
          >
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
        </p>
        <p>Item total: £{(item.product.price * item.quantity).toFixed(2)}</p>
      </article>
    </li>
  )
}
