import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
}

// const server = "ddfdsfdf"
const productCard = ({
  productId,
  photo,
  name,
  // description
  price,
  stock,
  handler
}: ProductsProps) => {
  return (
    <div className="productCard">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>BDT{price}</span>
      <span>Stock: {stock}</span>
      <div>
        <button onClick={() => handler({
          productId, price, name, photo, stock, quantity: 1
        })}>
        <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default productCard