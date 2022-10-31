function Producto(id, nombre, precio, stock, img){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.img = img
}

// Funcion constructora de objetos

let producto1 = new Producto(1, "Libro", 4000, 3200, "../media/Libro Logo 1.jpg")
let producto2 = new Producto(2, "Ta-Te-Ti", 1500, 300, "../Media/juegos de madera.jpg")
let producto3 = new Producto(3, "Remera", 2500, 350, "../Media/Palo astilla.jpg")
let producto4 = new Producto(4, "Almanaque", 1800, 250, "../Media/Almanaque.jpg")
let producto5 = new Producto(5, "Autito", 2900, 380, "../Media/Autitos madera.jpg")
let producto6 = new Producto(6, "Remeras", 5000, 440, "../Media/Remera padre madre hijo.jpg")
let producto7 = new Producto(7, "Planificado", 1000, 600, "../Media/Planificador.jpg")
let producto8 = new Producto(8, "Juguete", 3000, 340, "../Media/Torre madera.jpg")
let producto9 = new Producto(9, "Libros de cuentos", 7000, 280, "../Media/Cuentos infantiles.jpg")

let listaDeProductos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9]



let catalog = document.getElementById('items')
let cartList = document.getElementById('carrito')
let buttonEmpty = document.getElementById('boton-vaciar')
let totalValue = document.getElementById('total')
let cart = []

buttonEmpty.addEventListener('click', emptyButtonHandler)

loadCartFromStorage()
renderCart()


listaDeProductos.forEach((prod) => {
    let container = document.createElement('div')
    container.classList.add('card', 'col-sm-4')
    //Image
    let cardImage = document.createElement("img")
    cardImage.classList.add('card-img-top')
    cardImage.src= `${prod.img}`
    //Body
    let cardBody = document.createElement("div")
    cardBody.classList.add('card-body')
    //Title
    let cardTitle = document.createElement("h5")
    cardTitle.classList.add('card-title')
    cardTitle.innerText = prod.nombre
    //Precio
    let cardPrice = document.createElement("p")
    cardPrice.classList.add('card-text')
    cardPrice.innerText = `$${prod.precio}`
    //Stock
    let cardStock = document.createElement("p")
    cardStock.classList.add('card-text')
    cardStock.innerText = `Stock: ${prod.stock}`
    //Button
    let cardButton = document.createElement("button")
    cardButton.classList.add('btn', 'btn-primary')
    cardButton.innerText = `Comprar`
    cardButton.setAttribute('mark', prod.id)
    cardButton.addEventListener('click', addProdToCart)

    container.append(cardImage)
    cardBody.append(cardTitle)
    cardBody.append(cardPrice)
    cardBody.append(cardStock)
    cardBody.append(cardButton)
    container.append(cardBody)
    catalog.append(container)
})

function addProdToCart(event){
    let id = event.target.getAttribute('mark')
    cart.push(id)
    renderCart()

    Toastify({
        text: `Agregaste correctamente el producto id: ${id} al carrito`,
        className: "info",
        duration: 5000,
        gravity: 'bottom'
      }).showToast();
}

function renderCart(){

    saveCartToStorage()

    cartList.innerHTML = ''

    let cartWithoutRepeatedElements = [...new Set(cart)]

    cartWithoutRepeatedElements.forEach((itemId) => {
        let item = listaDeProductos.filter((producto) => {
            return producto.id === parseInt(itemId)
        })
        let quantity = cart.reduce((total, id) => {
            return id === itemId ? total += 1 : total
        }, 0)
    

    let linea = document.createElement('li')
    linea.classList.add('list-group-item', 'text-right', 'mx-2')
    linea.innerText = `${quantity} x ${item[0].nombre} - $${item[0].precio}`

    let buttonDelete = document.createElement('button')
    buttonDelete.classList.add('btn', 'btn-danger', 'mx-5')
    buttonDelete.innerText = 'X'
    buttonDelete.dataset.item = itemId
    buttonDelete.addEventListener('click', deleteProduct)

    linea.append(buttonDelete)
    cartList.append(linea)
    })

    totalValue.innerText = calculateTotalPrice()
}

function deleteProduct(event){
 let id = event.target.dataset.item
 cart = cart.filter((cartId) => {
    return cartId != id
 })
 renderCart()
 Swal.fire({
    title: "Eliminaste correctamente el producto!",
    icon: 'success'
 })
 
}

function emptyButtonHandler(){
    cart = []
    cartList.innerHTML = ''
    totalValue.innerText = 0
}

function calculateTotalPrice(){
    return cart.reduce((total, itemId) => {
        let item = listaDeProductos.filter((producto) => {
            return producto.id === parseInt(itemId)
        })

        return total + item[0].precio
    }, 0)
}

function saveCartToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

function loadCartFromStorage(){
    if(localStorage.getItem('cart') !== null){
        cart = JSON.parse(localStorage.getItem('cart'))
    }
}

