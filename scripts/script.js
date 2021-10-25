var myModal;

window.onload = function () {
    myModal = new bootstrap.Modal(document.getElementById("modalAgregar"), {});
};

function mostrarAlerta(nombre) {
    myModal.show();

    alert(`hola ${nombre}`);
    agregarFila();
}

function addProducto() {
    agregarFila();
}

function validarAgregar() {
    myModal.hide();

    var val = new Validador();
    var txtProducto = document.getElementById("txtProducto").value;
    var esPosible = true;

    var testProducto = val.validarProducto(txtProducto, ["hola"]);

    if (!testProducto[0]) {
        console.log("hola");
        esPosible = false;
        document.getElementById("error-Producto").innerText = testProducto[1];
    } else {
        document.getElementById("error-Producto").innerText = "";
    }
}

function agregarFila() {
    var tr = document.createElement("tr");
    var tdProducto = document.createElement("td");
    var tdPrecio = document.createElement("td");
    var tdExistencia = document.createElement("td");
    var boton = document.createElement("button");
    boton.innerText = "Eliminar";
    boton.setAttribute("data-bs-target", "#modalEliminar");
    boton.setAttribute("data-bs-toggle", "modal");
    boton.className = "btn btn-danger";

    tdProducto.innerText = "Coca Cola";
    tdPrecio.innerText = "15.00";
    tdExistencia.innerText = "140";

    tr.append(tdProducto);
    tr.append(tdPrecio);
    tr.append(tdExistencia);
    tr.append(boton);

    // add to main table
    document.getElementById("tabla_principal").append(tr);
}
