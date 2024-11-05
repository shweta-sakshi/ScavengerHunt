import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "./contextProvider/LoginContext";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { logindata, setLogindata } = useContext(LoginContext);
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({ email: "", password: "" });
  const history = useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prev) => ({ ...prev, [name]: value }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (email === "") {
      toast.error("Email is required!", { position: "top-center" });
    } else if (!email.includes("@")) {
      toast.warning("Include @ in your email!", { position: "top-center" });
    } else if (password === "") {
      toast.error("Password is required!", { position: "top-center" });
    } else if (password.length < 6) {
      toast.error("Password must be 6 characters!", { position: "top-center" });
    } else {
      axios
        .post(
          "/api/login",
          { email: email, password: password },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          localStorage.setItem("usersdatatoken", res.data.result.token);
          history("/dashboard");
          setLogindata(true);
          setInpval({ ...inpval, email: "", password: "" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Invalid Credentials", { position: "top-center" });
        });
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/path/to/your/gaming-bg.jpg')` }}
      >
        <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <img
              alt="GameZone"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Sign in to GameZone
            </h2>
            <p className="mt-2 text-sm text-gray-400">Get back in the game!</p>
          </div>

          <form onSubmit={loginUser} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  value={inpval.email}
                  onChange={setVal}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={passShow ? "text" : "password"}
                  name="password"
                  value={inpval.password}
                  onChange={setVal}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setPassShow(!passShow)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-indigo-500"
                >
                  {passShow ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-500 hover:text-indigo-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* React Toastify Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
