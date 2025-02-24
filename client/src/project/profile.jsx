import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import productApi from "./api/servicesApi"
export const Profile = () => {
    const [value, setValue] = useState({})
    const nav = useNavigate()
    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                nav("/sign-in")
            }
            try {
                const response = await productApi.profile(token)
                setValue(response.data)
            } catch (error) {
                localStorage.removeItem("token")
                nav("/sign-in")
                console.log(error);
            }
        }
        getData()
    }, [])
    
    return (
        <>
            <h1>PROFILE</h1>
            <h2>{value.name}</h2>
            <h2>{value.lastName}</h2>
            <h2>{value.email}</h2>
        </>
    )
}