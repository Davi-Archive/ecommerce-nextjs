import React from 'react'
import type { NextPage } from 'next'
import '../styles/Home.module.scss'
import { Product, FooterBanner, HeroBanner} from '../components'
import { client } from '../lib/client'

const Home: NextPage = ({ products, bannerData }:any) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Produtos que mais Vendem</h2>
      </div>

      <div className="products-container">
        {products.map((product:any)=> <Product key={product.name} product={product}/>
        )}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);

  return{
    props: { products, bannerData }
  }
}

export default Home;
