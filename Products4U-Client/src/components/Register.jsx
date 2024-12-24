import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

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
                updateUserProfile({displayName: name, photoURL: photo})
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
        <div className="pt-6 min-h-screen flex justify-center items-center bg-white">
            <div className="card bg-base-100 w-full max-w-lg mx-auto shrink-0 rounded-none p-10">
                <h2 className="font-bold text-center text-3xl pt-5">Register your Account</h2>
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
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
                            <span className="label-text">Photo URL</span>
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
                            <span className="label-text">Email</span>
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
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required name="password" />
                        {
                            <label className="label text-xs text-rose-500">
                                {error.password}
                            </label>
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-neutral rounded-none">Register</button>
                    </div>
                </form>
                <p className="text-center font-semibold">Already Have An Account? <Link className="text-red-500" to="/auth/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;