import { Product } from "@/types/Products"


export const addToCart = (product : Product) => {
    const furniture : Product[] = JSON.parse(localStorage.getItem('furniture') || '[]')

    const existingProductIndex = furniture.findIndex(item => item._id === product._id)

    if(existingProductIndex > -1) {
        furniture[existingProductIndex].quantity += 1
    }
    else {
        furniture.push({
            ...product, quantity: 1
        })
    }

    localStorage.setItem('furniture', JSON.stringify(furniture))
}

export const removeFromCart = (productId : string) => {
    let furniture : Product[] = JSON.parse(localStorage.getItem('furniture') || '[]')
    furniture = furniture.filter(item => item._id !== productId)
    localStorage.setItem('furniture', JSON.stringify(furniture))
}

export const updateCartQuantity = (productId :string, quantity : number) => {
    const furniture : Product[] = JSON.parse(localStorage.getItem('furniture') || '[]')
    const productIndex = furniture.findIndex(item => item._id === productId)

    if(productIndex > -1) {
        furniture[productIndex].quantity = quantity;
        localStorage.setItem('furniture', JSON.stringify(furniture))
    }
}

export const getFurnitureItems = () : Product[] => {
    return JSON.parse(localStorage.getItem('furniture') || '[]')
}