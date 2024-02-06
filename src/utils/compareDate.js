function compareDate(fecha1, fecha2) {
  // Convertir las cadenas de fecha a objetos Date
  var fechaObj1 = new Date(fecha1);
  var fechaObj2 = new Date(fecha2);

  // Comparar las fechas
  if (fechaObj1 > fechaObj2) {
    return "INHABILITADO";
  } else {
    return "HABILITADO";
  }
}

export default compareDate;
