import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/cart-item";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { addToCart, calculateTotalPrice, discountApplied, removeFromCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {

  const dispatch = useDispatch();
  const { cartItems, subtotal, tax, total, shippingCharges, discount} = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isvalidCouponCode, setIsvalidCouponCode] = useState<boolean>(false);

  const incrementHandeler = (cartItem: CartItem) => {

    if(cartItem.quantity >= cartItem.stock) {
      return toast.error("You are adding more than stock");
    }
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1}));
  }
  const decrementHandeler = (cartItem: CartItem) => {
    if(cartItem.quantity <= 1) {
      return toast.error("Minimum quantity is 1");
    }
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1}));
  }
  const removetHandeler = (productId: string) => {
    dispatch(removeFromCart(productId));
  }

  useEffect(() => {
    const {token: cancelToken, cancel} = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{
        cancelToken,
      }).then((res) => {
        dispatch(discountApplied(res.data.discount));
        setIsvalidCouponCode(true);
        dispatch(calculateTotalPrice());
      }).catch(() => {
        dispatch(discountApplied(0));
        setIsvalidCouponCode(false);
        dispatch(calculateTotalPrice());
      });
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsvalidCouponCode(false);
    }
  }, [couponCode, dispatch]);

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cartItems, dispatch]);
  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? cartItems.map((item, index) => (
            <CartItemCard
            incrementHandeler={incrementHandeler}
            decrementHandeler={decrementHandeler}
            removetHandeler={removetHandeler}
            key={index} cartItem={item} />
          )) : <h1>No Items in Cart</h1>
        }
      </main>
      <aside>
        <p>Subtotal: ৳ {subtotal}</p>
        <p>Shipping Charges: ৳ {shippingCharges}</p>
        <p>Tax: ৳ {tax}</p>
        <p>Discount: <em className="red"> - ৳ {discount}</em></p>
        <p><b>Total: ৳ {total}</b></p>
        <input 
         type="text"
         placeholder="Enter Cupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
         />
         {
          couponCode && (isvalidCouponCode ? (
            <span className="green">
              BDT{discount} off using <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">Invalid Cupon Code <VscError /></span>
          ))
         }

         {
          cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
         }
      </aside>
    </div>
  )
}

export default Cart