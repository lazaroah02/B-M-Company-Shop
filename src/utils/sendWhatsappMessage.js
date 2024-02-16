export function sendWhatsappMessage({phone, message}){
    window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodeURI(message)}&app_absent=0`)
}

export function prepareProductsCartToBeSentByWhatsapp({productsCart, total}){
    let message = "Pedido:\n"

    productsCart.forEach(product => {
        message += 
        `-----------------------------------\n${product.productName}\n${product.quantity} x $${product.price.toFixed(2)}\nSubtotal: $${product.subtotal.toFixed(2)}\n`
    })

    message += `-----------------------------------\nTotal: $${total}`

    return message
}