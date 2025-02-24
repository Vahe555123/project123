import { useNavigate } from "react-router-dom"

export const Header = () => {
    const nav = useNavigate()
    const logOut = () => {
        localStorage.removeItem("token")
        nav("/sign-in") 
    }
    return (
        <>
            {localStorage.getItem("token") && <button onClick={logOut}>logOut</button>}
        </>
    )
}