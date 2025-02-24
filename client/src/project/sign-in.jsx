import { useState } from "react"
import productApi from "./api/servicesApi"
export const SignIn = () => {
    const [value, setValue] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setValue(pr => {
            return { ...pr, [name]: value }
        })
    }
    const loginUser = async () => {
        try {
            const response = await productApi.signIn(value)
            console.log(response);
            if(response.status === 200){
                localStorage.setItem('token', response.data.token)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <h1>LOGIN</h1>
            <input name="email" onChange={handleChange} />
            <input  name="password" onChange={handleChange} />
            <button  onClick={loginUser}>sign in</button>
        </>
    )
}