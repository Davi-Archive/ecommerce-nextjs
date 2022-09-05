import React, { createContext, useContext, useState, useEffect, Children } from 'react'
import { toast } from 'react-hot-toast'
import product from '../sanity-ecommerce/schemas/product';

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
    toggleCartItemQuantity: any,
    onRemove: any,
    setCartItems: any,
    setTotalPrice: any,
    setTotalQuantities: any,

}

const Context = createContext({} as ConstextProp);

export const StateContext = ({ children }: any) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct: any;
    let index: number;

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
            setCartItems([...cartItems, { ...product }])
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

    const onRemove = (product: any) => {
        foundProduct = cartItems.find((item: any) => item._id === product._id)
        const newCartItems = cartItems.filter((item: any) => item._id !== product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice = foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems)
    }

    const toggleCartItemQuantity = (id: any, value: any) => {
        foundProduct = cartItems.find((item: any) => item._id === id)
        index = cartItems.findIndex((product: any) => product._id === id);

        const newCartItems = cartItems.filter((item: any) => item._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, {
                ...foundProduct, quantity: foundProduct.quantity + 1
            }]);
            setTotalPrice((prevTotalPrice: any) => prevTotalPrice +
                foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, {
                    ...foundProduct, quantity: foundProduct.quantity - 1
                }]);
                setTotalPrice((prevTotalPrice: any) => prevTotalPrice -
                    foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }

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
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
        }} >
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)