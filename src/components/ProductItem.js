import { useContext } from "react"
import { ProductsContext } from "../context/ProductContext"

function ProductItem({ product, setCurrentProduct, setEditing }) {

  const { dispatch } = useContext(ProductsContext)

  const handleDelete = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/products/` + product._id, {
      method: "DELETE"
    })
    const json = await response.json()
    if (response.status == 200) {
      console.log(json)
      dispatch({ type: "DELETE", payload: json })
    }
  }

  const handleEdit = () => {
    setCurrentProduct(product)
    setEditing(true)
  }

  return (
    <div style={{ width: "100%", borderBottom: "1px solid black", padding: "0.5rem 0" }}>
      <p style={{ margin: 0, paddingLeft: "0.5rem" }}>ID: {product._id}</p>
      <p style={{ margin: 0, paddingLeft: "0.5rem" }}>Name: {product.name}</p>
      <p style={{ margin: 0, paddingLeft: "0.5rem" }}>Price: {product.price}</p>
      <p style={{ margin: 0, paddingLeft: "0.5rem" }}>Quantity: {product.quantity}</p>
      <p style={{ margin: 0, paddingLeft: "0.5rem" }}>Created: {product.createdAt}</p>
      <p style={{ margin: 0, paddingLeft: "0.5rem" }}>Updated: {product.updatedAt}</p>
      <button style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} onClick={handleEdit}>Edit</button>
      <button style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ProductItem