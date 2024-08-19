import { useContext, useState } from "react"
import { ProductsContext } from "../context/ProductContext"

function ProductForm() {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const { products, dispatch } = useContext(ProductsContext)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const product = { name, price, quantity }
        console.log(product)

        const response = await fetch(`${process.env.SERVER_URI}/api/products`, {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        console.log(json)
        if (response.status == 201) {
            setName("")
            setPrice(0)
            setQuantity(0)
            console.log("New product added", json)
            dispatch({type: "CREATE", payload: json})
        } else {
            console.log(json.message)
        }
    }

    return (
        <form style={{paddingBottom: "1rem"}} onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input>
            <br />
            <label htmlFor="price">Price: </label>
            <input type="number" name="price" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <br />
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" name="quantity" placeholder="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
            <br />
            <button>Create</button>
        </form>
    )
}

export default ProductForm