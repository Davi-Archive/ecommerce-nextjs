import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

interface BannerProp {
  footerBanner: any,
  discount: string,
  largeText1:string,
  largeText2:string,
  saleTime:string,
}

const FooterBanner = ({footerBanner:{discount, largeText1, largeText2, saleTime}}: BannerProp) => {
  return (
    <>
      <div className='footer-banner-container'>
        <div className='banner-desc'>
          <div className='left'>
            <p>{discount}</p>
            <h3>{largeText1}</h3>
            <h3>{largeText2}</h3>
            <p>{saleTime}</p>
          </div>
          <div className='right'>

          </div>
        </div>
      </div>
    </>
  )
}

export default FooterBanner