import { useState } from "react"
import productApi from "./api/servicesApi"

export const SignUp = () => {
    const [value, setValue] = useState({})
    const [isRegister, setIsRegister] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target
        setValue(pr => {
            return { ...pr, [name]: value }
        })
    }
    const addUser = async () => {
        const response = await productApi.signUp(value)
        console.log(response);
        setIsRegister(true)
    }
    const verifyUser = async () => {
        try {
            const response = await productApi.verify({ code: value.code, email: value.email })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <input disabled={isRegister} name="name" onChange={handleChange} />
            <input disabled={isRegister} name="lastName" onChange={handleChange} />
            <input disabled={isRegister} name="email" onChange={handleChange} />
            <input disabled={isRegister} name="password" onChange={handleChange} />
            <button disabled={isRegister} onClick={addUser}>sign up</button>
            {isRegister && <>
                <input name="code" onChange={handleChange} />
                <button onClick={verifyUser}>verify</button>
            </>}
        </>
    )
}