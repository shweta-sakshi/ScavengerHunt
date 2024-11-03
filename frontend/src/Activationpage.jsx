import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

const Activationpage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post("/api/activation", {
                        activation_token,
                    });
                    console.log(res.data.message);
                } catch (err) {
                    setError(!error);
                }
            };
            activationEmail();
        }
    }, [activation_token]);

    return (
        <div className=" max-w-md mx-auto mt-10 px-4 text-2xl flex">
            {error ? (
                <div className="border-2 border-red-500 flex p-2 text-red-500">
                    <ExclamationCircleIcon className="h-12 w-12  mb-4" />
                    <p className="pt-2 ">Email not verified. Sign Up again.</p>
                </div>
            ) : (
                <div className="border-2 border-green-500 flex p-2 text-green-500">
                    <CheckCircleIcon className="h-12 w-12 mb-4" />{" "}
                    <p className="pt-2">
                        Your account has been created successfully, you can login now !!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Activationpage;
