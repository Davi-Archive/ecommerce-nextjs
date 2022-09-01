import React from 'react'
import type { NextPage } from 'next'
import '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      HeroBanner
      
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
      </div>

      <div className="products-container">
        {['Product 1', ' Product 2'].map((product:string)=> product
        )}
      </div>
    </>
  )
}

export default Home
