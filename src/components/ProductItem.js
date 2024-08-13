import { useContext } from "react"
import { ProductsContext } from "../context/ProductContext"

function ProductItem({ product }) {

  const { dispatch } = useContext(ProductsContext)

  const handleClick = async () => {
    const response = await fetch("http://localhost:4000/api/products/" + product._id, {
      method: "DELETE"
    })
    const json = await response.json()
    if (response.status == 200) {
      console.log(json)
      dispatch({type: "DELETE", payload: json})
    }
  }

    return (
        <div style={{border: "1px solid black", display:"inline-block", padding: "1rem"}}>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Created: {product.createdAt}</p>
          <p>Updated: {product.updatedAt}</p>
          <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default ProductItem