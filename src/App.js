import './App.css';
import { useContext, useEffect, useState } from 'react';
import ProductItem from './components/ProductItem';
import ProductForm from './components/ProductForm';
import { ProductsContext } from './context/ProductContext';

function App() {

  const { products, dispatch } = useContext(ProductsContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${process.env.SERVER_URI}/api/products`)
      const json = await response.json()
      if (response.status == 200) {
        console.log(json)
        dispatch({type: "SET", payload: json})
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="App">
      <ProductForm />
      {products && products.map((product) => (
        <ProductItem key={product._id} product={product} ></ProductItem>
      ))}
    </div>
  );
}

export default App;
