import React, { createContext, useContext, useState, useEffect, Children } from 'react'
import { toast } from 'react-hot-toast'

interface ConstextProp {
    showCart: boolean,
    cartItems: any,
    totalPrice: any,
    totalQuantities: any,
    qty: any,
    incQty: any,
    decQty: any,
    onAdd: any,
    setShowCart: any,
}

const Context = createContext({} as ConstextProp);

export const StateContext = ({ children }: any) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product: any, quantity: any) => {
        const checkProductInCart = cartItems.find((item: any): any => item?._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct: any) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} adicionado ao carrinho de compras.`)
    }


    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty: number) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1
        });
    }


    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
        }} >
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)