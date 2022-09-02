import React, { useState } from 'react'

import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';

const ProductDetails = ({ product, products }: any) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  function teste() {
    console.log('click');
  }
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <picture>
              <img
              className='product-detail-image'
              src={urlFor(image && image[index])}
              alt={name} />
            </picture>
          </div>
          <div className='small-image-container'>
            {image?.map((item:any, i:any) => (
              <picture key={i}>
                <img src={urlFor(item)}
                className={i === index ? 'small-image selected-image':'small-image'}
                onMouseEnter={()=> setIndex(i)}
                alt={name}
                />
              </picture>
            ))}
          </div>
        </div>
        <div className='product-details-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>
            (20)
          </p>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity: </h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={teste}>
                <AiOutlineMinus />
              </span>
              <span className='num' onClick={teste}>
                0
              </span>
              <span className='plus' onClick={teste}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button'
              className='add-to-cart'
              onClick={teste}
            >Adicionar ao Carrinho</button>
            <button type='button'
              className='buy-now'
              onClick={teste}
            >Compre Agora</button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
              {products?.map((item:any) =>(
               <>
               <Product key={item.id} product={item} />
               </>
              )
              )}
          </div>
        </div>
      </div>
    </div>
  )
}




export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }`
  const products = await client.fetch(query);
  const paths = products.map((product: any) => ({
    params: {
      slug: product.slug.current,
    }
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}



//getStaticProps -- special next function

interface staticProps {
  params: any,
  slug: any,
}

export const getStaticProps = async ({ params: { slug } }: staticProps) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product"]`;
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products }
  }
}

export default ProductDetails