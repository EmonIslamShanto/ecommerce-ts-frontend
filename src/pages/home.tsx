import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import { useLatestProductsQuery } from "../redux/api/productAPI"
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";


const Home = () => {

  const dispatch = useDispatch();
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const addToCartHandler = (cartItem: CartItem) => {
    if(cartItem.stock < 1) {
      return toast.error("Out of stock");
    }
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  }

  if(isError) {
    toast.error("Failed to fetch products")
  }
  return (
    <div className="home">
      <section></section>
      <h1>Latest Products 
        <Link to="/search" className="findmore">More</Link>
      </h1>
      <main>
        {
          isLoading ? (<SkeletonLoader width="80vw" />) : (
          data?.products.map((product) =>(
            <ProductCard 
            key={product._id}
            productId={product._id} 
            name={product.name}
            description={product.description}
            price={product.price} 
            stock={product.stock} 
            handler={addToCartHandler} 
            photo={product.photo}/>
          ))
        )}
      </main>
    </div>
  )
}

export default Home