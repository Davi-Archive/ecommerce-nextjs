import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Obrigado pela Compra</h2>
        <p className="email-msg">Verifique o seu e-mail para mais informações sobre a nota fiscal.</p>
        <p className="description">
          Se voce tiver alguma dúvida, por favor envie um email para:
          <a className="email" href="mailto:order@example.com">
            duvida@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" style={{width: '300px'}} className="btn">
            Continuar Comprando
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success