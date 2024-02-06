function formatDateSinHora(date) {
    let fecha = new Date(date);
    let año = fecha.getFullYear();
    let mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    let dia = ("0" + fecha.getDate()).slice(-2);
    // let horas = ("0" + fecha.getHours()).slice(-2);
    // let minutos = ("0" + fecha.getMinutes()).slice(-2);
    // let segundos = ("0" + fecha.getSeconds()).slice(-2);
    let fechaFormateada =
      dia + "-" + mes + "-" + año;
    return fechaFormateada;
  }
  
  export default formatDateSinHora;
  