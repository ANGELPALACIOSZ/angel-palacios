// script.js
document.addEventListener('DOMContentLoaded', () => {
    const listaProductos = document.querySelector('#productos');
    const carrito = document.querySelector('#carrito ul');
    let total = 0;

    // Función para agregar un producto al carrito
    function agregarProductoAlCarrito(nombre, precio) {
        const li = document.createElement('li');
        li.textContent = `${nombre} - $${precio}`;
        carrito.appendChild(li);
        total += precio;
        actualizarTotal();
    }

    // Función para actualizar el total en el carrito
    function actualizarTotal() {
        const totalElement = document.createElement('p');
        totalElement.textContent = `Total: $${total}`;
        carrito.appendChild(totalElement);
    }

    // Ejemplo de productos (puedes cargarlos desde una base de datos o API)
    const productos = [
        { nombre: 'Producto 1', precio: 10 },
        { nombre: 'Producto 2', precio: 20 },
        { nombre: 'Producto 3', precio: 30 }
    ];

    // Mostrar los productos en la página
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button class="agregar">Agregar al carrito</button>
        `;
        listaProductos.appendChild(div);

        const botonAgregar = div.querySelector('.agregar');
        botonAgregar.addEventListener('click', () => {
            agregarProductoAlCarrito(producto.nombre, producto.precio);
        });
    });
});

