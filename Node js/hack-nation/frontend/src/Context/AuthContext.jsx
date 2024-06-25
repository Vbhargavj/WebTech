import { createContext, useState } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = (props) => {
    const [isAuth,setAuth]=useState(false);
    console.log(isAuth);
    return (

        <AuthContext.Provider value={{isAuth,setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}