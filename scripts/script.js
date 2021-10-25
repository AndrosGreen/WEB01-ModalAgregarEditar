var myModalAgregar;
var myModalEliminar;
var myModalEditar;
var lastId = 0;
var idAEliminar = -1;
var idAEditar = -1;
var listaProductos = [];

window.onload = function () {
    myModalAgregar = new bootstrap.Modal(
        document.getElementById("modalAgregar"),
        {}
    );
    myModalEliminar = new bootstrap.Modal(
        document.getElementById("modalEliminar"),
        {}
    );
    myModalEditar = new bootstrap.Modal(
        document.getElementById("modalEditar"),
        {}
    );
    cargarProductos();
};

// gestion de modal

function abrirModalAgregar() {
    myModalAgregar.show();
}
function cerrarModalAgregar() {
    myModalAgregar.hide();
}
function abrirModalEliminar() {
    myModalEliminar.show();
}
function cerrarModalEliminar() {
    myModalEliminar.hide();
}
function abrirModalEditar() {
    myModalEditar.show();
    var elem = JSON.parse(localStorage.getItem(`${idAEditar}`));

    txtProducto = document.getElementById("txtProductoEditar");
    txtPrecio = document.getElementById("txtPrecioEditar");
    txtExistencias = document.getElementById("txtExistenciasEditar");

    txtProducto.value = elem.Producto;
    txtPrecio.value = elem.Precio;
    txtExistencias.value = elem.Existencias;
}
function cerrarModalEditar() {
    myModalEditar.hide();
}

function mostrarAlerta(nombre) {
    alert(`hola ${nombre}`);
    agregarFila();
}

function addProducto() {
    agregarFila();
}

function validarAgregar() {
    var val = new Validador();
    var txtProducto = document.getElementById("txtProducto").value;
    var txtPrecio = document.getElementById("txtPrecio").value;
    var txtExistencias = document.getElementById("txtExistencias").value;
    var esPosible = true;

    var testProducto = val.validarProducto(txtProducto, ["hola"]);
    var testPrecio = val.validarPrecio(txtPrecio);
    var testExistencias = val.validarExistencia(txtExistencias);

    if (!testProducto[0]) esPosible = false;
    if (!testPrecio[0]) esPosible = false;
    if (!testExistencias[0]) esPosible = false;

    document.getElementById("error-Producto").innerText = testProducto[1];
    document.getElementById("error-Precio").innerText = testPrecio[1];
    document.getElementById("error-Existencias").innerText = testExistencias[1];

    if (esPosible) {
        var elemento = {
            id: lastId,
            Producto: txtProducto,
            Precio: txtPrecio,
            Existencias: txtExistencias,
        };
        localStorage.setItem(`${lastId}`, JSON.stringify(elemento));
        lastId += 1;
        localStorage.setItem("currentID", JSON.stringify(lastId));
        agregarFila(elemento);
        cerrarModalAgregar();

        // add to main table

        listaProductos.push(elemento.id);
        localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
    }
}

function validarEditar() {
    var val = new Validador();
    var txtProducto = document.getElementById("txtProductoEditar").value;
    var txtPrecio = document.getElementById("txtPrecioEditar").value;
    var txtExistencias = document.getElementById("txtExistenciasEditar").value;
    var esPosible = true;

    var testProducto = val.validarProducto(txtProducto, ["hola"]);
    var testPrecio = val.validarPrecio(txtPrecio);
    var testExistencias = val.validarExistencia(txtExistencias);

    if (!testProducto[0]) esPosible = false;
    if (!testPrecio[0]) esPosible = false;
    if (!testExistencias[0]) esPosible = false;

    document.getElementById("error-Producto-Editar").innerText =
        testProducto[1];
    document.getElementById("error-Precio-Editar").innerText = testPrecio[1];
    document.getElementById("error-Existencias-Editar").innerText =
        testExistencias[1];

    if (esPosible) {
        var elemento = {
            id: idAEditar,
            Producto: txtProducto,
            Precio: txtPrecio,
            Existencias: txtExistencias,
        };

        localStorage.setItem(`${idAEditar}`, JSON.stringify(elemento));

        limpiarTabla();
        cargarProductos();
        cerrarModalEditar();
    }
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function eliminar() {
    listaProductos = arrayRemove(listaProductos, idAEliminar);
    console.log(listaProductos);
    localStorage.removeItem(`${idAEliminar}`);
    localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
    cerrarModalEliminar();
    limpiarTabla();
    cargarProductos();
}

function handleOpenEliminar(id) {
    idAEliminar = id;
    abrirModalEliminar();
}

function handleOpenEditar(id) {
    idAEditar = id;
    abrirModalEditar();
}

function agregarFila(elemento) {
    var tr = document.createElement("tr");
    var tdProducto = document.createElement("td");
    var tdPrecio = document.createElement("td");
    var tdExistencia = document.createElement("td");
    var boton = document.createElement("button");
    var botonEditar = document.createElement("button");

    boton.innerText = "Eliminar";
    boton.setAttribute("onClick", `handleOpenEliminar(${elemento.id})`);
    boton.className = "btn btn-danger";

    botonEditar.innerHTML = "Editar";
    botonEditar.setAttribute("onClick", `handleOpenEditar(${elemento.id})`);
    botonEditar.className = "btn btn-warning";

    tdProducto.innerText = elemento.Producto;
    tdPrecio.innerText = elemento.Precio;
    tdExistencia.innerText = elemento.Existencias;

    tr.append(tdProducto);
    tr.append(tdPrecio);
    tr.append(tdExistencia);
    tr.append(boton);
    tr.append(botonEditar);

    document.getElementById("tabla_principal").append(tr);
}

function cargarProductos() {
    tmpLista = localStorage.getItem("listaProductos");
    lastId = localStorage.getItem("currentID");

    if (tmpLista) {
        listaProductos = JSON.parse(tmpLista);
        //console.log(listaProductos);
        listaProductos.forEach((id) => {
            elemento = localStorage.getItem(`${id}`);
            elemento = JSON.parse(elemento);
            //console.log(elemento);
            agregarFila(elemento);
        });
    }

    if (lastId) {
        lastId = JSON.parse(lastId);
        console.log(lastId);
    } else {
        lastId = 0;
    }
}

function limpiarTabla() {
    var table = document.getElementById("tabla_principal");
    location.reload();
    var rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(i);
    }
}
