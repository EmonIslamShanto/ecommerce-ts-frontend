import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MesssageResponse } from "../types/api-types";


const Login = () => {
    const [gender, setGender] = useState('');
    const [date, setDate] = useState('');

    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const res = await login({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL || '',
                gender,
                role: "user",
                dob: new Date(date),
                _id: user.uid,
            })

            if (res.data) {
                toast.success(res.data.message);
            } else {
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as MesssageResponse).message;
                toast.error(message);
            }

        } catch (error) {
            toast.error('Error in Login');
        }
    };
    return (
        <div className="login">
            <main>
                <h1 className="heading">Login with Goggle</h1>

                <div>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <p>Fill the requiremnet and Click to Google</p>
                    <button onClick={loginHandler}>
                        <FcGoogle /> <span>Sign In with Google</span>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login