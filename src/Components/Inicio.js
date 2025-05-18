import { useNavigate, Link } from 'react-router-dom';
import './stylesApi.css';

export default function Inicio() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegistro = () => {
        navigate('/registro');
    };

    return (
        <>
            <div className="page-container">
                <nav className="navbar">
                    <div className="logo">Exa-Gammer</div>
                    <ul className="nav-links">
                        <li><button onClick={handleLogin} className="nav-button">Iniciar sesión</button></li>
                        <li><button onClick={handleRegistro} className="nav-button">Registar cuenta</button></li>
                    </ul>
                </nav>

                <section className="home-container">
                    <div className="text-content" >
                        <h1>Conocimiento<br />sin límites.<br />educación<br />para todos.</h1>
                        <p>
                            Creemos que la educación debe ser un derecho accesible para todos.
                            Nuestro enfoque está centrado en proporcionar un aprendizaje de calidad que
                            fomente el desarrollo académico y personal de cada estudiante...
                        </p>
                    </div>
                </section>
                <footer className="home-container-footer">
                    <p>&copy; 2025 Exa-Gammer. Todos los derechos reservados.</p>
                </footer>
            </div>
        </>
    );
}