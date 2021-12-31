import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
//Haciendo importes de componentes como niño grande 🚸
import  { Products, Navbar, Cart, Checkout, Home, About, Contact } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => {
    const [products, setProducts] = useState([]); // useState  = empty array
    const [cart, setCart] = useState({}); // useState = empty object.
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

        const fetchProducts = async () => {

        const { data } = await commerce.products.list(); // data = products
        setProducts(data); //products populated
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve()) //get the cart and set the State.
    }

    const handleAddToCart = async (productId, quantity) => { //this is the cart After the product has been added
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    const handleUpdateCartQty = async (lineItemId, quantity) => {
         const response = await commerce.cart.update(lineItemId, { quantity })
         setCart(response.cart);
    }

    const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId);
        setCart(response.cart)
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty()
        setCart(response.cart)
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()

        setCart(newCart)
    }

    const handleCaptureCheckOut = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            setErrorMessage(error.data.error.message)
        }
    }


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
      <div  style={{ display: 'flex'}}>
        <Navbar totalItems={cart.total_items}>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/about" element={<About />}>
          </Route>
          <Route path="/contact" element={<Contact />}>
          </Route>
          <Route  path="/productos" element={<Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />}>
          </Route>
          <Route  path="/cart" element={<Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />}>
          </Route>
          <Route path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckOut={handleCaptureCheckOut} error={errorMessage}  />}>
          </Route>
        </Routes>
      </div>
    </Router>
    )
}
 
export default App
