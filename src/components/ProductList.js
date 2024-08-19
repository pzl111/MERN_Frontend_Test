import ProductItem from "./ProductItem"

function ProductList({ products, setCurrentProduct, setEditing }) {
    return (
        <>
            {products && products.map((product) => (
                <ProductItem key={product._id} product={product} setCurrentProduct={setCurrentProduct} setEditing={setEditing}></ProductItem>
            ))}
        </>
    )
}

export default ProductList