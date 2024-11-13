import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "./contextProvider/LoginContext";
import mnnitimage from "./assets/mnnit.jpg";
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
      toast.error("Password must be at least 6 characters!", {
        position: "top-center",
      });
    } else {
      try {
        const res = await axios.post(
          "/api/login",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );
        localStorage.setItem("usersdatatoken", res.data.result.token);
        history("/homePage");
        setLogindata(true);
        setInpval({ email: "", password: "" });
      } catch (error) {
        console.log(error);
        toast.error("Invalid credentials", { position: "top-center" });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md shadow-lg bg-gray-800 p-8 rounded-lg hover:shadow-2xl transition-shadow duration-200">
          <img
            alt="MNNIT Logo"
            src={mnnitimage}
            className="mx-auto h-28 w-auto drop-shadow-lg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-wide text-yellow-500">
            Sign in to your account
          </h2>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <form className="space-y-6" onSubmit={loginUser}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-yellow-500"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={inpval.email}
                    onChange={setVal}
                    placeholder="Enter your email"
                    required
                    className="block w-full rounded-md bg-gray-900 py-2 px-3 text-white border border-gray-600 shadow focus:border-yellow-500 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-yellow-500"
                >
                  Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={passShow ? "text" : "password"}
                    value={inpval.password}
                    onChange={setVal}
                    placeholder="Enter your password"
                    required
                    className="block w-full rounded-md bg-gray-900 py-2 px-3 text-white border border-gray-600 shadow focus:border-yellow-500 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
                  />
                  <button
                    type="button"
                    onClick={() => setPassShow(!passShow)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-yellow-400 hover:text-yellow-300"
                  >
                    {passShow ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-yellow-500 px-4 py-2 text-gray-900 font-semibold shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-yellow-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-yellow-500 hover:text-yellow-400"
              >
                Sign up
              </Link>
            </p>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            theme="dark"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
