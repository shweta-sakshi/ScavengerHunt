import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const Gamelistdata = createContext("");

const Gamecontext = ({ children }) => {
    // This is the state that will be shared
    const [games, setGames] = useState([]);
    const [data, setData] = useState(false);

    // Fetching all products
    useEffect(() => {
        const token = localStorage.getItem("usersdatatoken");
        axios
            .get("/api/all-games", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                },
            })
            .then((res) => {
                console.log(res.data);
                setGames(res.data);
                setData(true);
            })
            .catch((error) => {
                setData(false);
                console.error("Error fetching games:", error);
            });
    }, [data]);

    // This is the provider that will wrap the components that need access to the shared state.
    return (
        <>
            <Gamelistdata.Provider value={{ games, setGames, data, setData }}>
                {children}
            </Gamelistdata.Provider>
        </>
    )
}

const useGamelistdata = () => useContext(Gamelistdata);

export { Gamecontext, useGamelistdata }