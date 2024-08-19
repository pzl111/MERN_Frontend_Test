import { useContext, useState } from "react"
import { ProductsContext } from "../context/ProductContext"

function ProductForm({ currentProduct, setCurrentProduct, isEditing, setEditing }) {

    const { dispatch } = useContext(ProductsContext)

    const cancelEdit = () => {
        setEditing(false)
        setCurrentProduct({
            _id: "",
            name: "",
            price: 0,
            quantity: 0
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isEditing) {
            currentProduct = { ...currentProduct, _id: undefined }
            const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/products`, {
                method: "POST",
                body: JSON.stringify(currentProduct),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await response.json()
            console.log(json)
            if (response.status == 201) {
                setCurrentProduct({
                    _id: "",
                    name: "",
                    price: 0,
                    quantity: 0
                })
                console.log("New product added", json)
                dispatch({ type: "CREATE", payload: json })
            } else {
                console.log(json.message)
            }
        } else {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/products/${currentProduct._id}`, {
                method: "PUT",
                body: JSON.stringify(currentProduct),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await response.json()
            console.log(json)
            if (response.status == 200) {
                setCurrentProduct({
                    _id: "",
                    name: "",
                    price: 0,
                    quantity: 0
                })
                setEditing(false)
                console.log("New product added", json)
                dispatch({ type: "UPDATE", payload: json })
            } else {
                console.log(json.message)
            }
        }

    }

    return (
        <form style={{ padding: "1rem" }} onSubmit={handleSubmit}>
            <label htmlFor="_id">ID: </label>
            <input type="text" name="_id" value={currentProduct._id} style={{ marginBottom: "0.5rem" }} disabled></input>
            <br />
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" placeholder="name" value={currentProduct.name} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} style={{ marginBottom: "0.5rem" }}></input>
            <br />
            <label htmlFor="price">Price: </label>
            <input type="number" name="price" placeholder="price" value={currentProduct.price} onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })} style={{ marginBottom: "0.5rem" }}></input>
            <br />
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" name="quantity" placeholder="quantity" value={currentProduct.quantity} onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })} style={{ marginBottom: "0.5rem" }}></input>
            <br />
            {isEditing ?
                (
                    <>
                        <button>Update</button>
                        <button onClick={cancelEdit} style={{marginLeft: "0.5rem"}}>Cancel</button>
                    </>
                ) : (
                    <button>Create</button>
                )}
        </form>
    )
}

export default ProductForm