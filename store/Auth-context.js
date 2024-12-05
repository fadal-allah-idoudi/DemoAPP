import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
export const AuthContext= createContext({
    token:'',
    isAuthticated:false,
    authenticate:()=>{},
    LogOut:()=>{}
});
function  AuthContextProvider({children}){
    const [Authtoken, setAuthtoken] = useState();
    
    function authenticate(token){
        setAuthtoken(token)
        AsyncStorage.setItem('token',token)
    }
    function LogOut(){
        setAuthtoken(null)
        AsyncStorage.removeItem('token')
    }
    const value={
        token:Authtoken,
        isAuthticated:!!Authtoken,
        LogOut:LogOut,
        authenticate:authenticate
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
export default AuthContextProvider;
