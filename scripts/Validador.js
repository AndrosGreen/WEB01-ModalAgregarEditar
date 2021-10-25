class Validador {
    validarProducto(producto, listaProductos) {
        console.log(producto.length < 3);
        if (producto.length < 3 || producto.length > 20) {
            return [false, "tiene que tener entre 3 y 20 caracteres"];
        }

        const nombres = listaProductos.map((prod) => prod.nombre);
        console.log(nombres);

        if (nombres.includes(producto)) {
            return [false, "error"];
        }

        return [true, "valido"];
    }

    validarPrecio(precio) {
        if (precio < 0 || precio > 100000) {
            return [false, "error"];
        }
        return [true, "valido"];
    }

    validarExistencia(existencia) {
        if (existencia < 0 || existencia > 1000000) {
            return [false, "error"];
        }
        return [true, "valido"];
    }

    validar(nombre) {
        console.log(nombre);
    }
}
