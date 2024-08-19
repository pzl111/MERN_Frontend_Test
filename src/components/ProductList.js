import { useContext } from "react"
import ProductItem from "./ProductItem"
import { ProductsContext } from "../context/ProductContext"

function ProductList() {

    const { products } = useContext(ProductsContext)

    return (
        <>
            {products && products.map((product) => (
                <ProductItem key={product._id} product={product} ></ProductItem>
            ))}
        </>
    )
}

export default ProductList