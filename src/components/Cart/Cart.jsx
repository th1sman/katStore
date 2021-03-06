import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import CartItem from './CartItem/CartItem';



const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {

    const classes = useStyles();

    const handleEmptyCart = () => onEmptyCart();

    const renderEmptyCart = () => (
        <Typography variant="subtitle1">No tienes productos en tu carrito,
            <Link to="/productos" className={classes.link} >Haz click aqui para agregar algunos</Link>
        </Typography>
    );

    if(!cart.line_items) return <Spinner />;

    const renderCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((lineItem) => (
                    <Grid item xs={12} sm={4} key={lineItem.id}>
                        <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">SubTotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
                        Vaciar carrito
                    </Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Pagar</Button>
                </div>
            </div>
        </>
    );



    return (
        <Container className={classes.root}>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Tu Carrito</Typography>
            {  !cart.line_items.length ? renderEmptyCart() : renderCart() }
        </Container> 
    )
}

export default Cart
