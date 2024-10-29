import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import type { CartItem } from "../types/types";

type CartItemProps = {
    cartItem: CartItem;
    incrementHandeler: (cartItem: CartItem) => void;
    decrementHandeler: (cartItem: CartItem) => void;
    removetHandeler: (id: string) => void;
};

const CartItemCard = ({ cartItem, incrementHandeler, decrementHandeler, removetHandeler}: CartItemProps) => {
    const {productId, name, price, quantity, photo} = cartItem;
  return (
    <div className="cart-item">
        <img src={`${server}/${photo}`} alt={name} />
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span>BDT{price}</span>     
        </article>

        <div>
            <button onClick={() => decrementHandeler(cartItem)}> - </button>
            <span>{quantity}</span>
            <button onClick={() => incrementHandeler(cartItem)}> + </button>
        </div>

        <button onClick={() => removetHandeler(productId)}>
            <FaTrash />
        </button>
    </div>
  )
}

export default CartItemCard