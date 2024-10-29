import { FaTrash } from "react-icons/fa";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { server } from "../../../redux/store";
import { Order, OrderItem } from "../../../types/types";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/orderAPI";
import { SkeletonLoader } from "../../../components/loader";
import { responseToast } from "../../../utils/features";


const defaultdata: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    phoneNo: "",
    postalCode: ""
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharge: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: {
    name: "",
    _id: ""
  },
  _id: ""

}


const TransactionManagement = () => {

  const params = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

  const { data, isLoading, isError } = useOrderDetailsQuery(params?.id!);

  console.log(data);

  const { shippingInfo: { address, city, state, phoneNo, country, postalCode }, orderItems, user: { name }, subtotal, discount, status, total, tax, shippingCharge } = data?.order || defaultdata;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async() => {
    const res = await updateOrder({ userId: user?._id!, orderId: data?.order?._id! });
    responseToast(res, navigate, "/admin/transaction");
   };

  const deleteHandler = async() => { 
    const res = await deleteOrder({ userId: user?._id || "", orderId: data?.order?._id || "" });
    responseToast(res, navigate, "/admin/transaction");
  };

  if (isError) {
    return <Navigate to="/404" />
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {
          isLoading ? <SkeletonLoader length={20} />:
          <>
         <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>

          {orderItems.map((i) => (
            <ProductCard
              key={i._id}
              name={i.name}
              photo={`${server}/${i.photo}`}
              productId={i.productId}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>

        <article className="shipping-info-card">
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>Phone No: {phoneNo}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${postalCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharge}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                    ? "green"
                    : "red"
              }
            >
              {status}
            </span>
          </p>
          <button className="shipping-btn" onClick={updateHandler}>
            Process Status
          </button>
        </article> 
          </>
        }
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;