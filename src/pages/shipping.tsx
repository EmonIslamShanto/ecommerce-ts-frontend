import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { server } from "../redux/store";


const Shipping = () => {

    const { cartItems, total } = useSelector((state: {cartReducer: CartReducerInitialState}) => state.cartReducer);

    console.log(total);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        phoneNo: "",
        postalCode: "",
        country: ""

    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(saveShippingInfo(shippingInfo));
        try {
            const {data} = await axios.post(`${server}/api/v1/payment/create`,{amount: total},{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            navigate("/pay", {
                state: data.client_secret,
            })

        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again later");
        }
    }

    useEffect(() => {
        if(cartItems.length === 0) {
            navigate("/cart");
        }
    }, [cartItems, navigate])
  return (
    <div className="shipping">
        <button className="back-btn" onClick={()=> navigate("/cart")}>
            <BiArrowBack />
        </button>

        <form onSubmit={submitHandler}>
            <h1>Shipping Info</h1>
            <input type="text" name="address" id="address" placeholder="Address" required value={shippingInfo.address} onChange={changeHandler} />

            <input type="text" name="city" id="city" placeholder="City" required value={shippingInfo.city} onChange={changeHandler} />

            <input type="text" name="state" id="state" placeholder="State" required value={shippingInfo.state} onChange={changeHandler} />

            <input type="text" name="phoneNo" id="phoneNo" placeholder="Phone No." required value={shippingInfo.phoneNo} onChange={changeHandler} />

            <input type="number" name="postalCode" id="postalCode" placeholder="Post Code" required value={shippingInfo.postalCode} onChange={changeHandler} />

            <select name="country" id="country" required value={shippingInfo.country} onChange={changeHandler}>
                <option value="">Select country</option>
                <option value="Bangladesh">Bangladsh</option>
            </select>

            <button type="submit">Pay Now</button>
        </form>
    </div>
  )
}

export default Shipping