import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import { urlFor } from '../lib/client'

interface HeroProps {
  heroBanner: any,
}

const HeroBanner = ({ heroBanner }: HeroProps) => {
  return (
    <>
      <div className='hero-banner-container'>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <picture>
          <img src={urlFor(heroBanner.image)} alt='headphones' className='hero-banner-image' />
        </picture>
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>Descrição</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default HeroBanner