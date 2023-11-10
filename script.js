

let porcentajeActual = 0;



let porcentajesPorSeccion = {};

// Esta función maneja los cambios individuales en los checkboxes.
function updatePercentage(subparte, valor) {
    const checkbox = document.getElementById(subparte);
    const part = subparte.split('-')[0]; // Extrae la sección del ID.
    const valorNumerico = parseFloat(valor);

    // Actualizar el porcentaje individual y el total.
    if (checkbox.checked) {
        porcentajesPorSeccion[part] = porcentajesPorSeccion[part] + valorNumerico || valorNumerico;
    } else {
        porcentajesPorSeccion[part] = porcentajesPorSeccion[part] - valorNumerico;
        if (porcentajesPorSeccion[part] < 0) {
            porcentajesPorSeccion[part] = 0;
        }
        // Si se deselecciona un item, asegurarse de que el "Seleccionar Todo" se desmarque.
        const todoCheckbox = document.getElementById(`${part}-todo`);
        if (todoCheckbox) {
            todoCheckbox.checked = false;
        }
    }

    calcularPorcentajeTotal();
}

// Esta función maneja el "Seleccionar Todo" para cada sección.
function seleccionarTodo(part, seleccionar) {
    const checkboxes = document.querySelectorAll(`.${part}-subparte`);
    porcentajesPorSeccion[part] = 0;

    checkboxes.forEach(checkbox => {
        checkbox.checked = seleccionar;
        const valorNumerico = parseFloat(checkbox.getAttribute('data-value'));
        if (!isNaN(valorNumerico)) {
            if (seleccionar) {
                porcentajesPorSeccion[part] += valorNumerico;
            }
        }
    });

    calcularPorcentajeTotal();
}

// Esta función calcula el porcentaje total basado en los porcentajes de cada sección.
function calcularPorcentajeTotal() {
    porcentajeActual = Object.values(porcentajesPorSeccion).reduce((acc, val) => acc + val, 0);
    document.getElementById('valorPorcentaje').innerText = porcentajeActual + '%';
}


function generarPDFgood() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Reporte de Porcentaje Tatuado', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yPosition = 30;

    // Recorrer las secciones y obtener las subpartes seleccionadas, excluyendo "Seleccionar Todo"
    const secciones = document.querySelectorAll('.parte-cuerpo'); // Asegúrate de que esto coincida con tu HTML

    secciones.forEach(seccion => {
        // Asegúrate de que el nombre de la sección no es "Seleccionar Todo"
        let nombreSeccion = seccion.querySelector('label').textContent;
        if (nombreSeccion !== ' Seleccionar Todo') {
            yPosition += 10;
            doc.setFont('helvetica', 'bold');
            doc.text(nombreSeccion, 10, yPosition);
            doc.setFont('helvetica', 'normal');

            // Obtener solo los checkboxes marcados que no son "Seleccionar Todo"
            let subpartesSeleccionadas = seccion.querySelectorAll('input[type="checkbox"]:checked:not(#' + seccion.id + '-todo)');

            subpartesSeleccionadas.forEach(subparte => {
                // Obtener el texto del label que está asociado al checkbox
                let etiquetaSubparte = subparte.nextSibling.textContent;
                yPosition += 6;
                doc.text(`- ${etiquetaSubparte}`, 14, yPosition);
            });
        }
    });

    yPosition += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Porcentaje Total Tatuado: ${document.getElementById('valorPorcentaje').innerText}`, 10, yPosition);

    // Añadir imagen publicitaria
    const imagenPublicitaria = 'path_to_your_image'; // Ruta de la imagen en base64 o URL
    yPosition += 20;
    doc.addImage(imagenPublicitaria, 'JPEG', 10, yPosition, 180, 40);

    doc.save('reporte_tatuajes.pdf');
}

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Reporte de Porcentaje Tatuado', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yPosition = 30;

    // Recorrer las secciones y obtener las subpartes seleccionadas, excluyendo "Seleccionar Todo"
    const secciones = document.querySelectorAll('.parte-cuerpo'); // Asegúrate de que esto coincida con tu HTML

    secciones.forEach(seccion => {
        // Asegúrate de que el nombre de la sección no es "Seleccionar Todo"
        let nombreSeccion = seccion.querySelector('label').textContent;
        if (nombreSeccion !== 'Seleccionar Todo') {
            yPosition += 10;
            doc.setFont('helvetica', 'bold');
            doc.text(nombreSeccion, 10, yPosition);
            doc.setFont('helvetica', 'normal');

            // Obtener solo los checkboxes marcados que no son "Seleccionar Todo"
            let subpartesSeleccionadas = seccion.querySelectorAll('input[type="checkbox"]:checked:not(#' + seccion.id + '-todo)');

            subpartesSeleccionadas.forEach(subparte => {
                // Obtener el texto del label que está asociado al checkbox
                let etiquetaSubparte = subparte.nextSibling.textContent;
                yPosition += 6;
                doc.text(`- ${etiquetaSubparte}`, 14, yPosition);
            });
        }
    });

    yPosition += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Porcentaje Total Tatuado: ${document.getElementById('valorPorcentaje').innerText}`, 10, yPosition);

    // Añadir imagen publicitaria
    const imagenPublicitaria = 'path_to_your_image'; // Ruta de la imagen en base64 o URL
    yPosition += 20;
    doc.addImage(imagenPublicitaria, 'JPEG', 10, yPosition, 180, 40);

    doc.save('reporte_tatuajes.pdf');
}





