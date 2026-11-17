// ============================================================
// Paso 1: Arreglo de productos
// Cada producto es un objeto con nombre, precio y categoría.
// ============================================================

const productos = [
    { nombre: "Laptop HP",           precio: 12500, categoria: "Electrónica" },
    { nombre: "Audífonos Bluetooth", precio: 850,   categoria: "Electrónica" },
    { nombre: "Teclado Mecánico",    precio: 1500,  categoria: "Electrónica" },
    { nombre: "Monitor 24\"",        precio: 4200,  categoria: "Electrónica" },
    { nombre: "Camisa Casual",       precio: 450,   categoria: "Ropa" },
    { nombre: "Pantalón Jeans",      precio: 700,   categoria: "Ropa" },
    { nombre: "Sudadera Deportiva",  precio: 620,   categoria: "Ropa" },
    { nombre: "Zapatillas Running",  precio: 1800,  categoria: "Ropa" },
    { nombre: "Balón de Fútbol",     precio: 350,   categoria: "Deportes" },
    { nombre: "Raqueta de Tenis",    precio: 2100,  categoria: "Deportes" },
    { nombre: "Mancuernas 10 kg",    precio: 900,   categoria: "Deportes" },
    { nombre: "Sartén Antiadherente",precio: 380,   categoria: "Hogar" },
    { nombre: "Licuadora",           precio: 1200,  categoria: "Hogar" },
    { nombre: "Juego de Sábanas",    precio: 550,   categoria: "Hogar" },
    { nombre: "Lámpara LED",         precio: 290,   categoria: "Hogar" },
];


// ============================================================
// Referencias al DOM
// ============================================================

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorBotones   = document.getElementById("botones-categoria");
const inputPrecio         = document.getElementById("precio-maximo");
const btnFiltrarPrecio    = document.getElementById("btn-filtrar-precio");
const btnLimpiar          = document.getElementById("btn-limpiar");


// ============================================================
// Paso 2: Mostrar productos en pantalla usando map()
// ============================================================

/**
 * Recibe un arreglo de productos y genera las tarjetas HTML
 * dentro del contenedor, usando map() para transformar cada
 * objeto en una cadena de HTML.
 */
function mostrarProductos(lista) {
    if (lista.length === 0) {
        contenedorProductos.innerHTML = `
            <p class="sin-resultados">No se encontraron productos con esos criterios.</p>
        `;
        return;
    }

    // Usamos map() para convertir cada producto en HTML
    const tarjetasHTML = lista.map(function (producto) {
        return `
            <div class="tarjeta">
                <h3>${producto.nombre}</h3>
                <p class="precio">$${producto.precio.toLocaleString()}</p>
                <span class="categoria">${producto.categoria}</span>
            </div>
        `;
    });

    // Unimos todas las tarjetas y las insertamos en el DOM
    contenedorProductos.innerHTML = tarjetasHTML.join("");
}


// ============================================================
// Paso 3: Filtrar por categoría usando filter()
// ============================================================

/**
 * Obtiene las categorías únicas del arreglo y crea un botón
 * por cada una, además de un botón "Todas".
 */
function crearBotonesCategoria() {
    // Extraer categorías únicas
    const categorias = [];
    productos.forEach(function (producto) {
        if (categorias.indexOf(producto.categoria) === -1) {
            categorias.push(producto.categoria);
        }
    });

    // Botón "Todas"
    const btnTodas = document.createElement("button");
    btnTodas.textContent = "Todas";
    btnTodas.classList.add("activo");
    btnTodas.addEventListener("click", function () {
        activarBoton(btnTodas);
        inputPrecio.value = "";          // Limpiamos el campo de precio
        mostrarProductos(productos);     // Mostramos todos los productos
    });
    contenedorBotones.appendChild(btnTodas);

    // Un botón por cada categoría
    categorias.forEach(function (categoria) {
        const boton = document.createElement("button");
        boton.textContent = categoria;

        boton.addEventListener("click", function () {
            activarBoton(boton);
            inputPrecio.value = "";

            // Usamos filter() para obtener solo los de esa categoría
            const productosFiltrados = productos.filter(function (producto) {
                return producto.categoria === categoria;
            });

            mostrarProductos(productosFiltrados);
        });

        contenedorBotones.appendChild(boton);
    });
}

/**
 * Marca visualmente el botón seleccionado como activo.
 */
function activarBoton(botonActivo) {
    const botones = contenedorBotones.querySelectorAll("button");
    botones.forEach(function (btn) {
        btn.classList.remove("activo");
    });
    botonActivo.classList.add("activo");
}


// ============================================================
// Paso 4: Filtrar por precio máximo usando filter()
// ============================================================

btnFiltrarPrecio.addEventListener("click", function () {
    const precioMaximo = parseFloat(inputPrecio.value);

    if (isNaN(precioMaximo) || precioMaximo < 0) {
        alert("Por favor, ingresa un precio válido.");
        return;
    }

    // Usamos filter() para obtener productos con precio <= al máximo
    const productosFiltrados = productos.filter(function (producto) {
        return producto.precio <= precioMaximo;
    });

    // Quitamos la selección activa de categoría (ningún botón queda activo)
    const botones = contenedorBotones.querySelectorAll("button");
    botones.forEach(function (btn) {
        btn.classList.remove("activo");
    });

    mostrarProductos(productosFiltrados);
});


// ============================================================
// Botón "Mostrar todos": reinicia los filtros
// ============================================================

btnLimpiar.addEventListener("click", function () {
    inputPrecio.value = "";
    const btnTodas = contenedorBotones.querySelector("button");
    activarBoton(btnTodas);
    mostrarProductos(productos);
});


// ============================================================
// Inicialización: al cargar la página
// ============================================================

crearBotonesCategoria();
mostrarProductos(productos);

