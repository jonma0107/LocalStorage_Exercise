// *************************************  Variables  ************************************
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas'); // variable global
let tareas = [];


// ***********************************  Event Listeners  ********************************
function eventListeners() {
  // Cuando el usuario agrega una nueva tarea
  formulario.addEventListener('submit', agregartarea); // el primer evento que vamos a escuchar va a ser cuando le demos submit al formulario, y vamos a escuchar por el submit, y se dispara una función llamada agregartarea.

  // Cuando el documento está listo. Cuando el documento esté cargado en su totalidad:
  document.addEventListener('DOMContentLoaded', () => {
    tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    crearHTML();
  });
}

// **************************************  FUNCIONES  ***********************************
function agregartarea(e) { // como es un formulario se previene el evento del submit
  e.preventDefault();

  // Textarea donde el usuario escribe
  const tarea = document.querySelector('#tarea').value; // variable local

  // Validar tarea
  if (tarea === '') {
    mostrarError('Mensaje no puede quedar vacío');
    return; // ESTE RETURN EVITA QUE SE sigan EJECUTANDO MAS LÍNEAS DE CÓDICO. Este return funciona en un IF siempre y cuándo esté en una función.
  }

  const tareaObj = {
    id: Date.now(),
    tarea
  }

  // AGREGAR tarea AL ARREGLO DE tareas
  tareas = [...tareas, tareaObj]

  // Una vez agregado al ARREGLO de tareas vamos a crear el HTML
  crearHTML();

  // REINICIAR EL FORMULARIO
  formulario.reset();

}; // fin función agregartarea

/*********************************************************************************************/

function mostrarError(error) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error')

  // insertar mensaje error en el HTML
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError)

  // Elimina el mensaje de error después de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

/**********************************************************************************************/

// Muestra en el HTML un listado de las tareas
function crearHTML() {

  limpiarHTML();

  if (tareas.length > 0) {
    tareas.forEach(tarea => {
      // Botón de eliminar tarea
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tarea');
      btnEliminar.innerText = 'X';

      btnEliminar.onclick = () => {
        borrartarea(tarea.id);
      }
      // Crear el HTML
      const li = document.createElement('li');
      // Añadir texto
      li.innerText = tarea.tarea;
      // Insertarlo en el HTML
      listaTareas.appendChild(li);
      // Asignar el botón de eliminar tarea
      li.appendChild(btnEliminar)
    });
  }

  sincronizarStorage();

} // fin función crearHTML

/******************************************************************************************/

// Limpia el HTML previo
function limpiarHTML() {
  while (listaTareas.firstChild) {
    listaTareas.removeChild(listaTareas.firstChild);
  }
};

//Agrega las tareas actuales a LocalStorage
function sincronizarStorage() {
  localStorage.setItem('tareas', JSON.stringify(tareas))
}

// Eliminar tarea
function borrartarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id);

  crearHTML();
}

// *********************************  REGISTRANDO EVENTOS  *********************************
eventListeners();
