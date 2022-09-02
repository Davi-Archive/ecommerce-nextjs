import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

interface ProductProp {
  _id?: any,
  key: any,
  product: any,
}


const Product = ({ product }:ProductProp) => {
  const { image, name, slug, price } =product;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <picture>
            <img src={urlFor(image && image[0])}
              width={250}
              height={250}
              className='product-image'
              alt={name}
            />
          </picture>
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product