import { getCart,saveCart } from "../../../utils/localStorage";
 

const contenedorCarrito = document.getElementById("items-carrito") as HTMLElement;
const contenedorResumen = document.getElementById("resumen-container") as HTMLElement;


const actualizarResumen = () =>{

    const carrito = getCart();
    const total = carrito.reduce((acumulador, prodcuto) => acumulador + prodcuto.precio, 0);

    const subtotalElement = document.querySelector('[data-resumen="subtotal"]')
    const totalElement = document.querySelector('[data-resumen="total"]');

    if(subtotalElement && totalElement){
        const formato = `$${total.toLocaleString()}`;
        subtotalElement.textContent = formato;
        totalElement.textContent = formato;
    }
};


const renderizarCarrito = () => {
    const carrito = getCart();
    contenedorCarrito.innerHTML = "";
    if (carrito.length === 0){
        contenedorCarrito.innerHTML = "<p>Tu carrito esta vacio. Volve al catalogo y compra algo rico</p>";
        actualizarResumen();
        return;
    }
    const productosId = Array.from(new Set(carrito.map(p => p.id)));
    productosId.forEach(id =>{
        const productoInfo = carrito.find(p => p.id === id);
        const cantidad = carrito.filter(p => p.id === id).length;    
        
        if (productoInfo){
            const article = document.createElement("article");
            article.classList.add("item-carrito");
            article.innerHTML = `
                <div class="card-carrito">
                <img src="${productoInfo.imagen}" alt="${productoInfo.nombre}">
                <div class="detalles">
                    <h4>${productoInfo.nombre}</h4>
                    <p>Subtotal: <b>$${(productoInfo.precio * cantidad).toLocaleString()}</b></p>
                </div>
                <div class="selector-cantidad">
                    <button class="btn-cantidad" data-id="${id}" data-action="restar">-</button>
                    <span>${cantidad}</span>
                    <button class="btn-cantidad" data-id="${id}" data-action="sumar">+</button>
                </div>
                <button class="btn-eliminar-todo" data-id="${id}" data-action="eliminar">Eliminar</button>
                </div>
            `;
            contenedorCarrito.appendChild(article);
        }
    });
    actualizarResumen();
};


contenedorCarrito.addEventListener("click", (e) =>{
    const target = e.target as HTMLElement;
    const id = Number(target.getAttribute("data-id"));
    let carrito = getCart();
    const accion = target.getAttribute("data-action");
    switch(accion){
        case "sumar":
            const productoAAgregar = carrito.find(p => p.id === id);
            if(productoAAgregar) carrito.push(productoAAgregar);
            break;
        case "restar":
            const index = carrito.findIndex(p => p.id === id);
            if(index !== -1) carrito.splice(index, 1);
            break;
        case "eliminar":
            carrito = carrito.filter(p => p.id !== id);
            break;
    }
    saveCart(carrito);
    actualizarBadgeCarrito();
    renderizarCarrito();

})

contenedorResumen.addEventListener("click", (e) =>{
    const target = e.target as HTMLElement;
    const accion = target.getAttribute("data-action");
    const carrito = getCart();
    if (accion === "vaciar"){
        saveCart([]);
        actualizarBadgeCarrito();
        renderizarCarrito();
    }
    if (accion === "finalizar"){
        if(carrito.length > 0){
            alert("Gracias por tu compra")
            saveCart([]);
            actualizarBadgeCarrito();
            renderizarCarrito();
        }else{
            alert("El carrito esta vacio")
        }
    }
});


export const actualizarBadgeCarrito = () =>{
    const carrito = getCart();
    const badge = document.getElementById("carrito-count");
    if (badge){
        const totalItems = carrito.length;
        badge.textContent = totalItems.toString();
        if(totalItems > 0 ){
            badge.classList.remove("hidden");
        }else{
            badge.classList.add("hidden")
        }
    }
};

document.addEventListener("DOMContentLoaded",renderizarCarrito);
actualizarBadgeCarrito();