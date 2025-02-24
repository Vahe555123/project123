import { useEffect, useState } from "react"
import productApi from "./api/servicesApi"
export const Basket = () => {
    const [product , setProduct] = useState([])
    useEffect(() => {
        getData()
    } , [])
    const getData = async() => {
        const token = localStorage.getItem("token")
        const response = await productApi.getBasket(token)
        setProduct(response.data)
    }
    return(
        <>
            {product.length > 0 && product.map(e => {
                console.log(e);
                
                return(
                    <div key={e._id}>
                        <img src={`http://localhost:3001/uploads/${e.imageUrl}`} style={{width:"200px"}}/>
                        {e.brand}
                    </div>
                )
            })}
        </>
    )
}