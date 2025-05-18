import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inicio from './Components/Inicio';
import ApiLogin from './Components/Apilogin';
import Apiregistro from './Components/Apiregistro';
import Apiclase from './Components/Apiclase';
import MenuPrincipal from './Components/MenuPrincipal';
import Clases from './Components/Clase';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/login" element={<ApiLogin/>}/>
        <Route path="/registro" element={<Apiregistro />}/>
        <Route path="/crearclase" element={<Apiclase />}/>
        <Route path="/menu" element={<MenuPrincipal/>}/>
        <Route path="/clase" element={<Clases/>}/>
        <Route/>
      </Routes>
    </Router>
  );
}

export default App;
