import './App.css';
import { useContext, useEffect, useState } from 'react';
import ProductForm from './components/ProductForm';
import { ProductsContext } from './context/ProductContext';
import ProductList from './components/ProductList';


function App() {

  const { dispatch } = useContext(ProductsContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/products`)
      const json = await response.json()
      if (response.status == 200) {
        dispatch({ type: "SET", payload: json })
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="App">
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "50%", height: "100%", overflowY: "scroll" }}>
          <ProductList />
        </div>
        <div style={{ width: "50%" }}>
          <ProductForm />
        </div>
      </div>
    </div>
  );
}

export default App;
