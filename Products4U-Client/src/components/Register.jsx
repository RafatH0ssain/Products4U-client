import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import SocialsLogin from "./SocialsLogin.jsx";

const Register = () => {
    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");

        const photo = form.get("photo");
        const password = form.get("password");
        if (password.length < 5) {
            setError({ ...error, name: "Password must be more than 6 characters long!" });
            return;
        }
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate("/");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    };

    return (
        <div className="pt-6 min-h-screen justify-center items-center text-center bg-black">
            <div className="card bg-white w-full max-w-lg mx-auto shrink-0 rounded-2xl p-10">
                <h2 className="font-bold text-center text-3xl pt-10">Register your Account</h2>
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-white font-bold">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered" required name="name" />
                        {
                            <label className="label text-xs text-rose-500">
                                {error.name}
                            </label>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-white font-bold">Photo URL</span>
                        </label>
                        <input type="text" placeholder="www.exampleImageURL.com" className="input input-bordered" required name="photo" />
                        {
                            <label className="label text-xs text-rose-500">
                                {error.photo}
                            </label>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-white font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required name="email" />
                        {
                            <label className="label text-xs text-rose-500">
                                {error.email}
                            </label>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-white font-bold">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required name="password" />
                        {
                            <label className="label text-xs text-rose-500">
                                {error.password}
                            </label>
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-success text-white rounded-xl border-none hover:bg-gray-500">Register</button>
                    </div>
                </form>
                <p className="text-center font-semibold pb-5">Already Have An Account? <Link className="text-red-500" to="/auth/login">Login</Link></p>
            </div>
            <h2 className="text-white text-3xl font-extrabold pt-16 pb-10">OR</h2>
            <SocialsLogin />
        </div>
    );
};

export default Register;