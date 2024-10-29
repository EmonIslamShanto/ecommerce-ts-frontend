import { useState } from "react"
import ProductCard from "../components/product-card";
import { useFindCategoriesQuery, useProductsBySearchQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { SkeletonLoader } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {

  const dispatch = useDispatch();
  const { data: categoriesResponse, isLoading:loadingCategories, isError, error} = useFindCategoriesQuery('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const { data: searchedData, isLoading:loadingProducts, isError: isProductError, error: productError } = useProductsBySearchQuery({page, sort, price: maxPrice, category, search});


  const addToCartHandler = (cartItem: CartItem) => {
    if(cartItem.stock < 1) {
      return toast.error("Out of stock");
    }
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  }

  const isPrevPage = page > 1;
  const isNextPage = searchedData ? page < searchedData.totalPage : false;

  if(isError) {
    toast.error((error as CustomError).data.message);
  }
  if(isProductError) {
    toast.error((productError as CustomError).data.message);
  }
  return (
    <div className="product-search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Select</option>
            <option value="asc">Price Low to High</option>
            <option value="dsc">Price High to Low</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range" min={10} max={100000} value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value))} />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">ALL</option>
            {
              !loadingCategories && categoriesResponse?.categories.map((cat) => (
                <option key={cat} value={cat}>{cat.toUpperCase()}</option>
              ))
            }
           
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search By Name..." value={search}
          onChange={(e) => setSearch(e.target.value)} />
        {
          loadingProducts ? <SkeletonLoader length={20} /> : (
            <div className="search-product-item">
          {
            searchedData?.products.map((product) => (
              <ProductCard 
              key={product._id}  
              productId={product._id}
              name={product.name}
              price={product.price}
              photo={product.photo}
              stock={product.stock}
              description={product.description}
              handler={addToCartHandler} />
            ))
          }
        </div>
          )
        }
        {
          searchedData && searchedData.totalPage > 1 && (
            <article>
          <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>Previous</button>
          <span>{page} of {searchedData.totalPage}</span>
          <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </article>
          )
        }
      </main>
    </div>
  )
}

export default Search