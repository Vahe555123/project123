import { useState } from "react"
import { adminLogin } from "../api"
export const LoginPage = () => {
    const [value , setValue] = useState({})
    const handleChange = (e) => {
        const {name , value} = e.target
        setValue(pr => {
            return {...pr , [name] : value}
        })
    }
    const login = async() => {
        try {
            const response = await adminLogin(value)
            console.log(response.data);
            
            if(response.status ===200){
                localStorage.setItem('adminToken', response.data.token)
            }
        } catch (error) {
            console.log(error);
                        
        }
    }
    return(
        <>
            <h1>login page</h1>
            <input name="login" onChange={handleChange}/>
            <input name="password" onChange={handleChange}/>
            <button onClick={login}>login</button>
        </>
    )
}