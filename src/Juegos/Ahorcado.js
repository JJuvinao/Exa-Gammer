import "./styleAhorcado.css";
import { useState } from "react";

export default function Ahorcado() {
    const [palabra, setPalabra] = useState("programacion");
    const [letrasUsadas, setLetrasUsadas] = useState([]);
    const [intentos, setIntentos] = useState(6);
    const [juegoActivo, setJuegoActivo] = useState(true); 
    const [reinicios, setReinicios] = useState(0);

    const manejarClick = (letra) => {
        if (!juegoActivo || letrasUsadas.includes(letra)) return;

        const nuevasLetrasUsadas = [...letrasUsadas, letra];
        setLetrasUsadas(nuevasLetrasUsadas);

        if (!palabra.includes(letra)) {
            setIntentos(intentos - 1);
        }

        const palabraRenderizada = palabra
            .split("")
            .map((letra) => (nuevasLetrasUsadas.includes(letra) ? letra : "_"))
            .join("");

        if (!palabraRenderizada.includes("_")) {
            alert("¡Ganaste!");
            setJuegoActivo(false); 
        } else if (intentos - 1 === 0 && !palabra.includes(letra)) {
            alert("¡Perdiste! La palabra era: " + palabra);
            setJuegoActivo(false); 
        }
    };

    const renderizarPalabra = () => {
        return palabra
            .split("")
            .map((letra) => (letrasUsadas.includes(letra) ? letra : "_"))
            .join(" ");
    };

    return (
        <>
        <div className="menu">
            <p>Menu</p>
            <ul>
                <li>Palabra</li>
                <li>Oracion</li>
                <li>Parrafo</li>
            </ul>
        </div>
         <div className="ahorcado">
            <h1>Ahorcado</h1>
            <p className="palabra">Palabra: {renderizarPalabra()}</p>
            <p>Intentos restantes: {intentos}</p>
            <div className="letras">
                {"abcdefghijklmnopqrstuvwxyz".split("").map((letra) => (
                    <button
                        key={letra}
                        onClick={() => manejarClick(letra)}
                        disabled={!juegoActivo || letrasUsadas.includes(letra)} 
                    >
                        {letra}
                    </button>
                ))}
            </div>
            <p>Reinicios: {reinicios}</p>    
        </div>
        <div className="reiniciar-container">
            <button className="reiniciar" disabled={juegoActivo} onClick={() => {
                setJuegoActivo(true); 
                setLetrasUsadas([]);
                setIntentos(6);
                setReinicios(reinicios + 1);
            }
            }>Reiniciar Juego</button>
        </div>
        </>
    );
}