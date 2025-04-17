export const formatFecha = (fechaISO) => {
    if (!fechaISO) return "";
    const date = new Date(fechaISO);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  export const obtenerSoloFecha = (fechaISO) => {
    if (!fechaISO) return "";
    return new Intl.DateTimeFormat("es-ES").format(new Date(fechaISO));
  };
  
  export const obtenerHora = (fechaISO) => {
    if (!fechaISO) return "";
    return new Date(fechaISO).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };