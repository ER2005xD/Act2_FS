// app.js

// Clase que representa una Tarea
class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.completa = false; // Por defecto, una nueva tarea no está completa
    }

    // Método para alternar el estado de la tarea
    completar() {
        this.completa = !this.completa;
    }
}

// Clase GestorDeTareas que gestiona todas las tareas
class GestorDeTareas {
    constructor() {
        this.tareas = []; // Arreglo para almacenar las tareas
        this.cargarTareas(); // Cargar las tareas desde LocalStorage al iniciar
    }

    // Método para agregar una nueva tarea
    agregarTarea(nombre) {
        const tarea = new Tarea(nombre); // Crear una nueva tarea
        this.tareas.push(tarea); // Agregar la tarea al arreglo
        this.guardarTareas(); // Actualizar LocalStorage
        this.render(); // Mostrar las tareas en el DOM
    
    
    // Mostrar mensaje de éxito
    const mensajeExito = document.getElementById("mensaje-exito");
    mensajeExito.style.display = "block";
    setTimeout(() => {
    mensajeExito.style.display = "none";
    }, 2000); // Ocultar el mensaje después de 2 segundos
}

    // Método para eliminar una tarea por su índice
    eliminarTarea(index) {
        this.tareas.splice(index, 1); // Eliminar la tarea del arreglo
        this.guardarTareas();
        this.render();
    }

    // Método para editar el nombre de una tarea
    editarTarea(index, nuevoNombre) {
        this.tareas[index].nombre = nuevoNombre.trim(); // Actualizar el nombre
        this.guardarTareas();
        this.render();
    }

    // Método para alternar el estado de una tarea
    completarTarea(index) {
        this.tareas[index].completar(); // Alternar estado
        this.guardarTareas();
        this.render();
    }

    // Método para guardar tareas en LocalStorage
    guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(this.tareas));
    }

    // Método para cargar tareas desde LocalStorage
    cargarTareas() {
        const tareasGuardadas = localStorage.getItem("tareas");
        if (tareasGuardadas) {
            // Convertir las tareas de JSON a instancias de Tarea
            this.tareas = JSON.parse(tareasGuardadas).map(
                tarea => Object.assign(new Tarea(), tarea)
            );
        }
        this.render();
    }

    // Método para renderizar las tareas en el DOM
    render() {
        const listaTareas = document.getElementById("lista-tareas");
        listaTareas.innerHTML = ""; // Limpiar la lista

        this.tareas.forEach((tarea, index) => {
            const li = document.createElement("li");
            li.classList.add("tarea");

            // Marcar la tarea si está completa
            const estado = tarea.completa ? " --- ✅" : "  🎯";

            li.innerHTML = `
                <span>${tarea.nombre}${estado}</span>
                <div>
                    <button class="editar" onclick="gestor.editarTareaPrompt(${index})">Editar</button>
                    <button onclick="gestor.eliminarTarea(${index})">Eliminar</button>
                    <button onclick="gestor.completarTarea(${index})">
                        ${tarea.completa ? "❎" : "✅"}
                    </button>
                </div>
            `;

            listaTareas.appendChild(li);

            // Añadir animación de entrada
            setTimeout(() => li.classList.add("mostrar"), 50);
        });
    }

    // Método para editar con un prompt (interfaz rápida)
    editarTareaPrompt(index) {
        const nuevoNombre = prompt("Edita la tarea:", this.tareas[index].nombre);
        if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
            this.editarTarea(index, nuevoNombre);
        }
    }
}

// Instancia global del gestor de tareas
const gestor = new GestorDeTareas();

// Evento para agregar tarea al hacer clic en el botón
document.getElementById("agregar-tarea").addEventListener("click", () => {
    const inputTarea = document.getElementById("nueva-tarea");
    const nombreTarea = inputTarea.value.trim();
    if (nombreTarea === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }
    gestor.agregarTarea(nombreTarea); // Agregar tarea usando la clase
    inputTarea.value = ""; // Limpiar el input
});
