import { useEffect, useState } from "react"
import productApi from "./api/servicesApi"
export const Products = () => {
    const [product, setProduct] = useState([])
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const response = await productApi.getProduct()
        setProduct(response.data)
    }
    const addToBasket = async (id) => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("You must be logged in")
            return
        }
        console.log(token, id);
        const response = await productApi.addToBasket(token, id)
        console.log(response.data);
    }
    const handleChangeFilter = (e) => {
        const newArr = product.filter(el => el.name.toLowerCase()
            .includes(e.target.value.toLowerCase()))
        setFiltered(newArr)
    }
    return (
        <>
            <input placeholder="search..." onChange={handleChangeFilter} />
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "50px", padding: "200px" }}>
                {filtered.length > 0 ? filtered.map(e => {
                    return (
                        <div key={e._id}>
                            <div>
                                <img src={`http://localhost:3001/uploads/${e.imageUrl}`} style={{ width: "200px" }} />
                            </div>
                            <div>
                                Name - {e.name}
                            </div>
                            <div>
                                Brand - {e.brand}
                            </div>
                            <div>
                                price - {e.price}
                            </div>
                            <button onClick={() => addToBasket(e._id)}>add to basket</button>
                        </div>
                    )
                }) :
                    product.map(e => {
                        return (
                            <div key={e._id}>
                                <div>
                                    <img src={`http://localhost:3001/uploads/${e.imageUrl}`} style={{ width: "200px" }} />
                                </div>
                                <div>
                                    Name - {e.name}
                                </div>
                                <div>
                                    Brand - {e.brand}
                                </div>
                                <div>
                                    price - {e.price}
                                </div>
                                <button onClick={() => addToBasket(e._id)}>add to basket</button>
                            </div>
                        )
                    })}
            </div>

        </>
    )
}