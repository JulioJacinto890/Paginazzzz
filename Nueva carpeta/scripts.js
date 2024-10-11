// Validar usuario y contraseña
function validarUsuario() {
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;
    if (usuario === "MariaJacinto" && contraseña === "30Seconds") {
        document.getElementById("formularioAdmin").style.display = "block";
        document.getElementById("login").style.display = "none";
        cargarProductos(); // Cargar productos almacenados
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// Añadir nuevo producto o editar producto
function agregarProducto() {
    var nuevoProducto = prompt("Nombre del nuevo producto:");
    var nuevoPrecio = prompt("Precio del nuevo producto:");
    var descripcion = prompt("Descripción del nuevo producto:");
    var descuento = prompt("Precio con descuento (más de 10 piezas):");

    if (nuevoProducto && nuevoPrecio && descripcion && descuento) {
        var producto = {
            nombre: nuevoProducto,
            precio: nuevoPrecio,
            descripcion: descripcion,
            descuento: descuento,
        };

        guardarProducto(producto);
        mostrarProducto(producto);
    } else {
        alert("Por favor, rellene todos los campos.");
    }
}

// Guardar producto en localStorage
function guardarProducto(producto) {
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Mostrar producto en la lista de administración
function mostrarProducto(producto) {
    var lista = document.getElementById("listaProductos");
    var li = document.createElement("li");
    li.innerHTML = `
        ${producto.nombre} - $${producto.precio} <br> 
        Descripción: ${producto.descripcion} <br> 
        Descuento: $${producto.descuento} 
        <button onclick="editarProducto(${lista.childNodes.length})">Editar</button>
        <button onclick="eliminarProducto(${lista.childNodes.length})">Eliminar</button>
    `;
    lista.appendChild(li);
}

// Cargar productos al iniciar la página
function cargarProductos() {
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    var lista = document.getElementById("listaProductos");
    lista.innerHTML = ""; // Limpiar lista existente

    productos.forEach(function(producto, index) {
        mostrarProducto(producto, index);
    });
}

// Función para editar productos
function editarProducto(index) {
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    var producto = productos[index];

    var nuevoNombre = prompt("Modificar nombre del producto:", producto.nombre);
    var nuevoPrecio = prompt("Modificar precio del producto:", producto.precio);
    var nuevaDescripcion = prompt("Modificar descripción del producto:", producto.descripcion);
    var nuevoDescuento = prompt("Modificar precio con descuento:", producto.descuento);

    if (nuevoNombre && nuevoPrecio && nuevaDescripcion && nuevoDescuento) {
        productos[index] = {
            nombre: nuevoNombre,
            precio: nuevoPrecio,
            descripcion: nuevaDescripcion,
            descuento: nuevoDescuento
        };
        localStorage.setItem("productos", JSON.stringify(productos));
        cargarProductos(); // Refrescar la lista de productos
    } else {
        alert("Por favor, rellena todos los campos.");
    }
}

// Función para eliminar productos
function eliminarProducto(index) {
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.splice(index, 1); // Eliminar producto
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos(); // Refrescar la lista de productos
}

// Cargar productos en la calculadora de ventas
function cargarProductosEnVentas() {
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    var contenedorVentas = document.getElementById("productosVentas");
    contenedorVentas.innerHTML = ""; // Limpiar contenedor existente

    productos.forEach(function(producto) {
        var div = document.createElement("div");
        div.innerHTML = `
            <label for="${producto.nombre}">${producto.nombre} - Precio: $${producto.precio} (Descuento por mayoreo: $${producto.descuento} si compra 10 o más)</label>
            <input type="number" id="${producto.nombre}" value="0"><br>
        `;
        contenedorVentas.appendChild(div);
    });
}

// Calcular total en ventas
function calcularTotal() {
    var total = 0;
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    var totalProductos = 0;

    productos.forEach(function(producto) {
        var cantidad = parseInt(document.getElementById(producto.nombre).value) || 0;
        totalProductos += cantidad;

        // Si la cantidad es mayor o igual a 10, aplicar el precio con descuento
        if (cantidad >= 10) {
            total += cantidad * producto.descuento; // Usar precio con descuento
        } else {
            total += cantidad * producto.precio; // Usar precio normal
        }
    });

    // Aplicar un descuento adicional si hay más de 10 productos de cualquier tipo
    if (totalProductos >= 10) {
        total *= 0.9; // Aplicar un 10% de descuento adicional
    }

    document.getElementById("total").innerHTML = "Total: $" + total.toFixed(2);
}

// Calcular cambio
function calcularCambio() {
    var total = parseFloat(document.getElementById("total").textContent.split('$')[1]);
    var recibido = parseFloat(document.getElementById("recibido").value);
    var cambio = recibido - total;

    document.getElementById("cambio").innerHTML = "Cambio: $" + (cambio >= 0 ? cambio.toFixed(2) : "0");
}
