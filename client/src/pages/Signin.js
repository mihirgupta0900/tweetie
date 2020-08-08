import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "../components/Button";
import { signin, authenticate, isAuthenticated } from "../helpers/authHelper";

const Signin = () => {
    const [data, setData] = useState({
        userName: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
    });

    const { userName, password, error, loading, didRedirect } = data;

    const { user } = isAuthenticated();

    // Handle change in input fields
    const handleChange = (fieldName) => (e) => {
        setData({ ...data, error: false, [fieldName]: e.target.value });
    };

    // Handle the submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({ ...data, error: false, loading: true });
        signin({ userName, password })
            .then((returnedData) => {
                console.log("returnedData: ", returnedData);
                if (returnedData.error) {
                    setData({
                        ...data,
                        error: returnedData.error,
                        loading: false,
                    });
                    console.log("err in signin");
                } else {
                    authenticate(returnedData, () => {
                        setData({
                            ...data,
                            didRedirect: true,
                        });
                        // console.log('redirect success')
                    });
                    console.log("signin successful");
                }
            })
            .catch(console.log("Signin req failed"));
    };

    // Handle redirect after signin success
    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/feed" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/feed" />;
        }
    };

    return (
        <div className="h-screen text-white bg-main-darkBlue flex justify-center items-center">
            <div className="w-full max-w-sm">
                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border-b-2 bg-main-highlightBlue rounded w-full py-6 px-5 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="username"
                            onChange={handleChange("userName")}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border-b-2 bg-main-highlightBlue rounded w-full py-6 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            onChange={handleChange("password")}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <Button className="w-full hover:bg-main-hover">
                            {/* <Link className="w-full block"> */}
                                Log In
                            {/* </Link> */}
                        </Button>
                        <Link
                            to="/signup"
                            className="border-main-blue mt-4 border-1 text-white font-bold py-2 px-4 w-full rounded-full focus:outline-none focus:shadow-outline text-center"
                        >
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
            {performRedirect()}
        </div>
    );
};

export default Signin;
