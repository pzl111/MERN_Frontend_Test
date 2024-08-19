import { useContext, useState } from "react"
import { ProductsContext } from "../context/ProductContext"

function ProductForm() {

    const { dispatch, isEditing, currentProduct } = useContext(ProductsContext)

    const cancelEdit = () => {
        dispatch({ type: "DISABLE_EDIT" })
        dispatch({ type: "RESET_CURRENT_PRODUCT" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isEditing) {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/products`, {
                method: "POST",
                body: JSON.stringify({ ...currentProduct, _id: undefined }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await response.json()
            if (response.status == 201) {
                console.log("New product added", json)
                dispatch({ type: "RESET_CURRENT_PRODUCT" })
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
            if (response.status == 200) {
                console.log("Product updated", json)
                dispatch({ type: "DISABLE_EDIT" })
                dispatch({ type: "UPDATE", payload: json })
                dispatch({ type: "RESET_CURRENT_PRODUCT" })
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
            <input type="text" name="name" placeholder="name" value={currentProduct.name} onChange={(e) => dispatch({ type: "SET_CURRENT_PRODUCT", payload: { ...currentProduct, name: e.target.value } })} style={{ marginBottom: "0.5rem" }}></input>
            <br />
            <label htmlFor="price">Price: </label>
            <input type="number" name="price" placeholder="price" value={currentProduct.price} onChange={(e) => dispatch({ type: "SET_CURRENT_PRODUCT", payload: { ...currentProduct, price: e.target.value } })} style={{ marginBottom: "0.5rem" }}></input>
            <br />
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" name="quantity" placeholder="quantity" value={currentProduct.quantity} onChange={(e) => dispatch({ type: "SET_CURRENT_PRODUCT", payload: { ...currentProduct, quantity: e.target.value } })} style={{ marginBottom: "0.5rem" }}></input>
            <br />
            {isEditing ?
                (
                    <>
                        <button>Update</button>
                        <button onClick={cancelEdit} style={{ marginLeft: "0.5rem" }}>Cancel</button>
                    </>
                ) : <button>Create</button>
            }
        </form>
    )
}

export default ProductForm