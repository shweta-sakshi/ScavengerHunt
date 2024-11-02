import React, { createContext, useState } from 'react'

export const LoginContext = createContext("");

const Context = ({ children }) => {

    // This is the state that will be shared
    const [logindata, setLogindata] = useState(false);

    //// This is the provider that will wrap the components that need access to the shared state
    return (
        <>
            <LoginContext.Provider value={{ logindata, setLogindata }}>
                {children}
            </LoginContext.Provider>
        </>
    )
}

export default Context