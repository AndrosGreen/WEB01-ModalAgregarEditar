class Validador {
    validarProducto(producto, listaProductos) {
        console.log(producto.length < 3);
        if (producto.length < 3 || producto.length > 20) {
            return [false, "tiene que tener entre 3 y 20 caracteres"];
        }
        const nombres = listaProductos.map((prod) => prod.nombre);

        if (nombres.includes(producto)) {
            return [false, "Este producto ya existe"];
        }

        return [true, ""];
    }

    validarPrecio(precio) {
        if(!precio){
            return [false,"precio no puede estar vacio"];
        }
        if (precio < 0 || precio > 100000) {
            return [false, "el precio tiene que ser mayor a 0 y menor a 100000"];
        }
        return [true, ""];
    }

    validarExistencia(existencia) {
        if(!existencia){
            return [false,"Existencias no puede estar vacio"];
        }
        if (existencia < 0 || existencia > 1000000) {
            return [false, "las existencias deben ser mayores a 0 y menores a 1000000"];
        }
        return [true, ""];
    }

    validar(nombre) {
        console.log(nombre);
    }
}
