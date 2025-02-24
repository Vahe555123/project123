import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {  SignUp } from "./sign-up"
import { SignIn } from "./sign-in"
import { Profile } from "./profile"
import { HomePage } from "./homePage"
import { Header } from "./header"
import { Products } from "./products"
import { Basket } from "./basket"
export const MyProject = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products />} />
                <Route path="/basket" element={<Basket />} />
                <Route />
            </Routes>
        </Router>
    )
}