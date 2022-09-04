import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }:any) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <picture>
              <img src={urlFor(image && image[index])} className="product-detail-image" alt='imagem' />
            </picture>
          </div>
          <div className="small-images-container">
            {image?.map((item: any, i: any) => (
              <picture key={i}>
                <img
                  key={i}
                  src={urlFor(item)}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                  alt='Image do Produto'
                />
              </picture>
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Detalhes: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantidade:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Adicionar ao Carrinho</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Compre Agora</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>Você pode gostar</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item:any) => (
              <Product key={item._id} product={item} />
            ))}
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
  const paths = products?.map((product: any) => ({
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