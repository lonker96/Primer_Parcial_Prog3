import {PRODUCTS} from "../../data/data";
import type { Product } from "../../types/Product";
import { getCart, saveCart } from "../../utils/localStorage";

const listaProductos = document.getElementById("contenedor-productos") as HTMLElement;
const buscador = document.getElementById("input-busqueda") as HTMLInputElement
const botonesFiltro = document.querySelectorAll('.btn-filtro');



export const renderizarProductos = (lista : Product[]) =>{
    listaProductos.innerHTML = "";

    lista.forEach((producto : Product) =>{
        const article = document.createElement('article');
        article.classList.add('card-producto');

        const stockStatus = producto.stock > 0 ? "En Stock" : "Sin Stock";
        const btnDisabled = producto.stock > 0 ? "" : "disabled";

        article.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info">
            <h3>${producto.nombre}</h3>
            <p class="desc">${producto.descripcion}</p>
            <p class="precio">Precio: <b>$${producto.precio}</b></p>
            <p class="stock ${producto.stock > 0 ? 'con-stock': 'sin-stock'}">${stockStatus}</p>

            <div class="acciones">
                <button class="btn-detalles">Ver Detalles</button>
                <button class="btn-agregar" data-id="${producto.id}" ${btnDisabled}>Agregar al carrito</button>
            </div>
        </div>
        `;
        listaProductos.appendChild(article);
    });

};

const filtrosCategorias = () =>{
    botonesFiltro.forEach(boton =>{
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');
            const categoriaSeleccionada = boton.getAttribute('data-categoria');
            if (categoriaSeleccionada === "todos"){
                renderizarProductos(PRODUCTS);
            }else{
                const filtrados = PRODUCTS.filter(p =>
                    p.categorias.some(c => c.nombre === categoriaSeleccionada)
                );
                renderizarProductos(filtrados);
            }
        });
    });

};

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


buscador.addEventListener("input", () =>{
    const texto = buscador.value.toLowerCase().trim();
    const productosFiltrados = PRODUCTS.filter(p =>
        p.nombre.toLowerCase().includes(texto) ||
        p.descripcion.toLowerCase().includes(texto)
    );
    renderizarProductos(productosFiltrados);
})


if (listaProductos){
    listaProductos.addEventListener("click", (e) =>{
        const target = e.target as HTMLElement;
        if (target.classList.contains("btn-agregar")){
            const idProducto = Number(target.getAttribute("data-id"));
            const productoSeleccionado = PRODUCTS.find(p => p.id === idProducto);    
            if (productoSeleccionado){
                agregarAlCarrito(productoSeleccionado);
                actualizarBadgeCarrito();
            }
        }
    });
}

const agregarAlCarrito = (producto : Product) => {
    const carritoActual = getCart();
    carritoActual.push(producto);
    saveCart(carritoActual);
}



filtrosCategorias();
renderizarProductos(PRODUCTS);
actualizarBadgeCarrito();