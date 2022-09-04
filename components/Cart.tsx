import React, { useRef, RefObject } from 'react'
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';


const Cart = () => {
  const cartRef = useRef() as RefObject<HTMLDivElement>;
  const { onRemove, toggleCartItemQuantity, totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    console.log(response)
    if (response?.status === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecionando...')
    stripe.redirectToCheckout({ sessionId: data.id })

  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Seu Carrinho</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Sua sacola de produtos está vazia.</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continuar Comprando
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item: any) => (
            <div className='product' key={item._id}>
              <picture>
                <img src={urlFor(item?.image[0])}
                  className='cart-product-image' alt={item?.name} />
              </picture>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>{item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span
                        className='minus'
                        onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className='num' >
                        {item.quantity}
                      </span>
                      <span
                        className='plus'
                        onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>R${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>
                Pagar com Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart