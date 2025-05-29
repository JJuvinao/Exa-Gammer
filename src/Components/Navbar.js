import { useNavigate } from "react-router-dom";
import "./stylesApi.css";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegistro = () => {
        navigate("/registro");
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
                <img
                    src="/logo_del_sitio.png"
                    alt="Logo"
                    style={{
                        height: "152px",
                        marginRight: "8px",
                        verticalAlign: "middle",
                    }}
                />
                Exa-Gammer
            </div>
            <ul className="nav-links">
                <li>
                    <button onClick={handleLogin} className="nav-button">
                        Iniciar sesión
                    </button>
                </li>
                <li>
                    <button onClick={handleRegistro} className="nav-button">
                        Registrar cuenta
                    </button>
                </li>
            </ul>
        </nav>
    );
}