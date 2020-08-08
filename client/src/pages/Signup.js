import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
    });

    const handleChange = (fieldName) => (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            [fieldName]: e.target.value,
        });
    };

    const handleSubmit = () => {
        return fetch("/api/signup", {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    return (
        <div className="h-screen text-white bg-main-darkBlue flex justify-center items-center">
            <div className="w-full max-w-lg">
                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-bold mb-2"
                            for="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border-b-2 bg-main-highlightBlue rounded w-full py-6 px-5 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="hello@test.com"
                            onChange={handleChange("email")}
                        />
                    </div>
                    <div className="flex">
                        <div className="mb-4 mr-5">
                            <label
                                className="block text-sm font-bold mb-2"
                                for="firstName"
                            >
                                First Name
                            </label>
                            <input
                                className="shadow appearance-none border-b-2 bg-main-highlightBlue rounded w-full py-6 px-5 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                onChange={handleChange("firstName")}
                            />
                        </div>
                        <div className="mb-4 ml-5">
                            <label
                                className="block text-sm font-bold mb-2"
                                for="lastName"
                            >
                                Last Name
                            </label>
                            <input
                                className="shadow appearance-none border-b-2 bg-main-highlightBlue rounded w-full py-6 px-5 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                onChange={handleChange("lastName")}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mb-4 mr-5">
                            <label
                                className="block text-sm font-bold mb-2"
                                for="username"
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
                        <div className="mb-6 ml-5">
                            <label
                                className="block text-sm font-bold mb-2"
                                for="password"
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
                    </div>

                    <div className="flex flex-col items-center justify-between">
                        <button
                            className="border-main-blue border-1 text-white font-bold py-2 px-4 w-full rounded-full bg-main-blue focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Sign Up
                        </button>
                        <button
                            className="border-main-blue border-1 text-white font-bold py-2 px-4 w-full rounded-full my-4 focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            <Link to="/signup">Log In</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
