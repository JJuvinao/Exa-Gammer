export const ExamService = async ({ examen, data, juego, token }) => {
  var url = "";
  var exa = {};
  switch (juego) {
    case 2:
      url = "https://localhost:7248/api/Examenes/Heroes";
      exa = {
        Nombre: examen.Nombre,
        Tema: examen.Tema,
        Autor: examen.Autor,
        Descripcion: examen.Descripcion,
        ImagenExamen: examen.ImagenExamen,
        Id_Clase: examen.Id_Clase,
        Id_Juego: juego,
        Heroes: data.lispreheroe,
      };
      break;
    case 1:
      url = "https://localhost:7248/api/Examenes/Ahorcado";
      exa = {
        Nombre: examen.Nombre,
        Tema: examen.Tema,
        Autor: examen.Autor,
        Descripcion: examen.Descripcion,
        ImagenExamen: examen.ImagenExamen,
        Id_Clase: examen.Id_Clase,
        Id_Juego: juego,
        Palabra: data.palabra,
        Pista: data.pista,
      };
      break;
    default:
      break;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exa),
    });

    if (response.ok) {
      alert("Examen creado correctamente.");
    } else {
      alert("Error al crear el examen: ");
    }
  } catch (error) {
    console.error("Error al enviar examen:", error);
    alert("Ocurrió un error inesperado.");
  }
};

export async function ConteExamService({ codigoe, tokene, idjuego }) {
  var url;
  switch (idjuego) {
    case 1:
      url = `https://localhost:7248/api/Examenes/GetAhorcado/${codigoe}`;
      break;
    case 2:
      url = `https://localhost:7248/api/Examenes/GetHeroes/${codigoe}`;
      break;
    default:
      break;
  }
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${tokene}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        return;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar el contenido del examenes");
  }
}
