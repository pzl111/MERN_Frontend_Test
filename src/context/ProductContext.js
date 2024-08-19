import { createContext, useReducer } from "react";

export const ProductsContext = createContext()


export const ProductsContextProvider = ({ children }) => {

    const productsReducer = (state, action) => {
        switch (action.type) {
            case "SET":
                return {
                    ...state,
                    products: action.payload
                }
            case "CREATE":
                return {
                    ...state,
                    products: [action.payload, ...state.products]
                }
            case "DELETE":
                return {
                    ...state,
                    products: state.products.filter((product) => product._id != action.payload._id)
                }
            case "UPDATE":
                return {
                    ...state,
                    products: [action.payload, ...state.products.filter((product) => product._id != action.payload._id)]
                }
            case "ENABLE_EDIT":
                return {
                    ...state,
                    isEditing: true
                }
            case "DISABLE_EDIT":
                return {
                    ...state,
                    isEditing: false
                }
            case "RESET_CURRENT_PRODUCT":
                return {
                    ...state,
                    currentProduct: {
                        _id: "",
                        name: "",
                        price: 0,
                        quantity: 0
                    }
                }
            case "SET_CURRENT_PRODUCT":
                return {
                    ...state,
                    currentProduct: {...state.currentProduct, ...action.payload}
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(productsReducer, {
        products: null,
        isEditing: false,
        currentProduct: {
            _id: "",
            name: "",
            price: 0,
            quantity: 0
        }
    })

    return (
        <ProductsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductsContext.Provider>
    )
}