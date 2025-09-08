<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $directorioDestino = "uploads/";
    $nombreArchivo = "archivo.pdf"; // nombre fijo, reemplaza si se sube otro
    $rutaCompleta = $directorioDestino . $nombreArchivo;

    // Validar tipo de archivo
    if ($_FILES["archivo_pdf"]["type"] != "application/pdf") {
        echo "Solo se permiten archivos PDF.";
        exit;
    }

    // Crear carpeta si no existe
    if (!file_exists($directorioDestino)) {
        mkdir($directorioDestino, 0775, true);
    }

    // Mover archivo
    if (move_uploaded_file($_FILES["archivo_pdf"]["tmp_name"], $rutaCompleta)) {
        // Quitar permisos de escritura para evitar modificaciones desde el servidor
        chmod($rutaCompleta, 0444);
        echo "Archivo subido correctamente. <a href='index.html'>Volver</a>";
    } else {
        echo "Error al subir el archivo.";
    }
}
?>
