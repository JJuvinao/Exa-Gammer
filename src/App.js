import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Components/Vistas/Inicio";
import ApiLogin from "./Components/Vistas/Apilogin";
import Apiregistro from "./Components/Vistas/Apiregistro";
import Apiclase from "./Components/Vistas/Apiclase";
import MenuPrincipal from "./Components/Vistas/MenuPrincipal";
import Clases from "./Components/Vistas/Clase";
import CrearJuego from "./Components/Vistas/Juego";
import ListaUsuarios from "./Components/Vistas/Usuario";
import Ahorcado from "./Components/Juegos/Ahorcado/Ahorcado";
import ExamenDetalle from "./Components/Vistas/ExamenDetalle";
import CrearExamen from "./Components/Vistas/CrearExamen";
import InicioHeroes from "./Components/Juegos/Heroesdelaprendizaje/InicioHeroes";
import MenuPrin from "./Components/Juegos/Heroesdelaprendizaje/Menuprin";
import Mundos from "./Components/Juegos/Heroesdelaprendizaje/Mundos";
import Escenario from "./Components/Juegos/Heroesdelaprendizaje/Escenario";
import EstuResultados from "./Components/Vistas/EstuResultados";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<ApiLogin />} />
        <Route path="/registro" element={<Apiregistro />} />
        <Route path="/crearclase" element={<Apiclase />} />
        <Route path="/menu" element={<MenuPrincipal />} />
        <Route path="/clase" element={<Clases />} />
        <Route path="/admin" element={<CrearJuego />} />
        <Route path="/usuario" element={<ListaUsuarios />} />
        <Route path="/juego" element={<Ahorcado />} />
        <Route path="/examen" element={<ExamenDetalle />} />
        <Route path="/crear-examen" element={<CrearExamen />} />
        <Route path="/resultados" element={<EstuResultados />} />
        <Route path="/heroes" element={<InicioHeroes />} />
        <Route path="/heroes/menu" element={<MenuPrin />} />
        <Route path="/heroes/mundos" element={<Mundos />} />
        <Route path="/heroes/escenario" element={<Escenario />} />

        {/* Puedes agregar más rutas aquí */}
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
