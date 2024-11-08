import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

const Activationpage = () => {
    const { ActivationToken } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        // Only activate if the token exists and hasn't been used
        if (ActivationToken) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post("/api/activation", {
                        ActivationToken,
                    });
                } catch (err) {
                    setError(true);
                    console.log(error);
                }
            };
            activationEmail();
        }
    }, [ActivationToken]);

    return (
        <div className=" max-w-md mx-auto mt-10 px-4 text-2xl flex">
            {error ? (
                <div className="border-2 border-red-500 flex p-2 text-red-500">
                    <ExclamationCircleIcon className="h-12 w-12  mb-4" />
                    <p className="pt-2 ">Activation token Expired</p>
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
