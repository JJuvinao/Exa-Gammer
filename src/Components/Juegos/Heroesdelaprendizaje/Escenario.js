import "./stylesheroes.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { SelecAnimation, AnimationNpc, AnimationVarios } from "./Animaciones";
import { NpcStats, SamuraiStats } from "./Estadisticas";
import { ModalRendirse } from "./Modales/ModalRendirse";
import { ModalAtaque } from "./Modales/ModalAtaque";
import { ModalPreYRes } from "./Modales/ModalPreYRes";
import { Modalmostarinfo } from "./Modales/ModalInforATK";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Escenario() {
  const location = useLocation();
  const img_mundo = location.state?.img_mundo;
  const personaje = location.state?.personaje;
  const img_personaje = location.state?.img_personaje;

  //modales
  const [animation, setAnimation] = useState([]);
  const [modalatk, setModalAtk] = useState(false);
  const [modalrendirse, setModalRendirse] = useState(false);
  const [mostarsangre1, setmostar1] = useState(false);
  const [mostarsangre2, setmostar2] = useState(false);
  const [mostarpresYres, setMostarpresYres] = useState(false);
  const [modalinfoaccion, setmostarinfoaccion] = useState(false);

  const [opcATK, setOpcATK] = useState(0);
  const [pausado, setPausado] = useState(false);

  //imagenes del personaje y npc
  const npc = AnimationNpc();
  const varios = AnimationVarios();
  const letinicialperso = "100%";
  const leftataqueperso = "200%";
  const [leftperso, setLeftperso] = useState(letinicialperso);
  const [leftnpc, setLeftnpc] = useState("20%");
  const [imagenSprite, setImagenSprite] = useState(img_personaje);
  const [imagenNpc, setImagenNpc] = useState(npc[0]);
  const [botones, setBotones] = useState(true);

  const [infoperso, setinfoPerso] = useState();
  const [mostradef, setmostradef] = useState(false);
  const [infoaccion, setinfoAccion] = useState({});

  const defini = 50;
  // Estados del personaje
  const [Hp, setHp] = useState();
  const [Atk, setAtk] = useState();
  const [Def, setDef] = useState();
  const [Mana, setMana] = useState();
  // Estados del npc
  const [Hpnpc, setHpnpc] = useState(5000);
  const [Atknpc, setAtknpc] = useState(150);
  const [Defnpc, setDefnpc] = useState(100);
  const [Mananpc, setMananpc] = useState(300);

  useEffect(() => {
    setAnimation(SelecAnimation({ personaje: personaje }));
    setHp(5000);
    setAtk(200);
    setDef(defini);
    setMana(100);

    setinfoPerso(
      <SamuraiStats
        hp={Hp}
        atk={Atk}
        def={Def}
        mana={Mana}
        mostardef={mostradef}
      />
    );
  }, []);

  useEffect(() => {
    setinfoPerso(<SamuraiStats hp={Hp} mostardef={mostradef} />);
  }, [Hp, mostradef]);

  const moverAtk1 = async () => {
    setImagenSprite(animation[1]);
    setLeftperso(leftataqueperso);
    setmostar2(true);
    await sleep(2000);
    AccionAtk(1);
    await sleep(1000);
    setmostar2(false);
    await sleep(1200);
    setImagenSprite(animation[0]);
    setLeftperso(letinicialperso);
    await sleep(1200);
    atacernpc(1);
  };

  const moverAtk2 = async () => {
    setImagenSprite(animation[2]);
    setLeftperso(leftataqueperso);
    await sleep(1000);
    setmostar2(true);
    AccionAtk(2);
    await sleep(1000);
    setmostar2(false);
    await sleep(1000);
    setImagenSprite(animation[0]);
    setLeftperso(letinicialperso);
    await sleep(3000);
    atacernpc(1);
  };

  const moverAtk3 = async () => {
    setImagenSprite(animation[3]);
    setLeftperso(leftataqueperso);
    await sleep(1000);
    setmostar2(true);
    AccionAtk(3);
    await sleep(2000);
    setmostar2(false);
    await sleep(1000);
    setImagenSprite(animation[0]);
    setLeftperso(letinicialperso);
    await sleep(1100);
    atacernpc(1);
  };

  const atacernpc = async (opc) => {
    var numram = randomatknpc();
    setImagenNpc(npc[numram]);
    setLeftnpc("-105%");
    setmostar1(true);
    await sleep(2000);
    AccionAtkNpc(numram, opc);
    await sleep(1000);
    setmostar1(false);
    setImagenNpc(npc[0]);
    setLeftnpc("20%");
    await sleep(650);
    setImagenSprite(animation[0]);
    setBotones(true);
  };

  const defender = async () => {
    setmostradef(true);
    setImagenSprite(animation[4]);
    setLeftperso("80%");
    await sleep(1000);
    setImagenSprite(animation[4]);
    setLeftperso("80%");
    await sleep(1100);
    setmostar1(true);
    atacernpc(2);
    await sleep(2000);
    setmostar1(false);
    setmostradef(false);
  };

  const randomatknpc = () => {
    const ataques = [1, 2, 3];
    const ataqueElegido = ataques[Math.floor(Math.random() * ataques.length)];
    return ataqueElegido;
  };

  const AccionAtk = (opcion) => {
    var danio = 0;
    switch (opcion) {
      case 1:
        danio = Atk - Defnpc;
        break;
      case 2:
        danio = (Atk - Defnpc) * 2;
        break;
      case 3:
        danio = (Atk - Defnpc) * 3;
        break;
      default:
        break;
    }
    mostarinfoaccion("Personaje", opcion, danio, Mana);
    setHpnpc(Hpnpc - danio);
  };

  const AccionAtkNpc = (opcion, opc) => {
    var def = Def;
    if (opc === 2) {
      def += 20;
    }
    var danio = 0;
    switch (opcion) {
      case 1:
        danio = Atknpc - def;
        break;
      case 2:
        danio = (Atknpc - def) * 2;
        break;
      case 3:
        danio = (Atknpc - def) * 3;
        break;
      default:
        break;
    }
    mostarinfoaccion("Npc", opcion, danio, Mananpc);
    setHp(Hp - danio);
  };

  const ValidarRespuesta = (respuesta) => {
    //modal de respuesta correcto o incorrecta

    //
    if (respuesta === "while") {
      switch (opcATK) {
        case 1:
          moverAtk1();
          break;
        case 2:
          moverAtk2();
          break;
        case 3:
          moverAtk3();
          break;
        default:
          break;
      }
    } else {
      atacernpc(1);
    }
  };

  const recibiropcATK = (opcion) => {
    setOpcATK(opcion);
  };

  const mostarinfoaccion = async (nombre, opcion, danio, mana) => {
    setinfoAccion({ nombre, opcion, danio, mana });
    const modal = await mostrarModalYAWAIT();
  };

  const resolverPromesa = useRef(null);

  const mostrarModalYAWAIT = () => {
    setmostarinfoaccion(true);
    // 1. Devuelve una nueva promesa. La función que la llama se pausará en el 'await'.
    return new Promise((resolve) => {
      // 2. Guardamos la función 'resolve' en nuestro ref para poder llamarla más tarde.
      resolverPromesa.current = resolve;
    });
  };

  const abrirModalAtk = () => {
    setModalAtk(true);
  };
  const abrirModalRendirse = () => {
    setModalRendirse(true);
  };
  const abrirModalPresYRes = () => {
    setMostarpresYres(true);
  };

  const cerrarinfoaccion = () => {
    setmostarinfoaccion(false);
    if (resolverPromesa.current) {
      resolverPromesa.current(false);
    }
  };
  const cerrarModalAtk = () => {
    setModalAtk(false);
  };
  const cerrarModalPresYRes = () => {
    setMostarpresYres(false);
  };

  return (
    <div className="row no-gutters escenario-main-container">
      <main className=" bg-grey text-black escenario-contenedor">
        {/* Contenido del escenario */}
        <div
          className="escenario-superior mt-4"
          style={{
            backgroundImage: `url(${img_mundo})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "100%",
            width: "100vw",
          }}
        >
          <div className=" mt-4">
            <div className="imagen-sprite-contenedor">
              {/* imagenes de sangre */}
              <div
                style={{
                  backgroundImage: `url(${mostarsangre1 ? varios[0] : ""})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "35%",
                  width: "35%",
                  position: "relative",
                  top: "5px",
                  left: "-10%",
                }}
              >
                {/* imagenes de personaje */}
                <div
                  style={{
                    backgroundImage: `url(${imagenSprite})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "300px",
                    width: "300px",
                    position: "relative",
                    top: "150px",
                    left: leftperso,
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              </div>
              {/* imagenes de sangre */}

              <div
                style={{
                  backgroundImage: `url(${mostarsangre2 ? varios[1] : ""})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "35%",
                  width: "35%",
                  position: "relative",
                  top: "5px",
                  left: "10%",
                }}
              >
                {/* imagenes de npc */}
                <div
                  style={{
                    backgroundImage: `url(${imagenNpc})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "300px",
                    width: "300px",
                    position: "relative",
                    top: "150px",
                    left: leftnpc,
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              </div>
              {/* imagenes de personaje y npc */}
            </div>
          </div>
        </div>

        {/* Contenido de la sección inferior */}
        <div className="escenario-inferior mt-4">
          <h3>Informacion del personajes y npc</h3>
          <div className="">
            <div className="informacion-personaje card h-10 border-black ">
              {infoperso}
            </div>

            <div className="informacion-personaje card h-10 border-black ">
              <NpcStats hp={Hpnpc} atk={Atknpc} def={Defnpc} mana={Mananpc} />
            </div>
          </div>
        </div>
      </main>

      <nav
        className=" p-4 text-black navbar-juego"
        style={{
          borderWidth: "4px",
          borderStyle: "solid",
          borderColor: "#040404ff",
        }}
      >
        <div className="navbar-contenedor">
          <button
            className="btn btn-light mb-2 button-nav text-black"
            onClick={() => {
              abrirModalAtk();
              setBotones(false);
            }}
            disabled={!botones}
          >
            Atacar
          </button>
          <button
            className="btn btn-light mb-2 button-nav text-black"
            onClick={() => {
              defender();
              setBotones(false);
            }}
            disabled={!botones}
          >
            Defender
          </button>
          <button
            className="btn btn-light mb-2 button-nav text-black"
            onClick={() => {
              abrirModalRendirse();
            }}
            disabled={!botones}
          >
            Rendirse
          </button>
        </div>
      </nav>

      {/* Modal ataque */}
      {modalatk && (
        <ModalAtaque
          matk={modalatk}
          recibiropcATK={(opcion) => recibiropcATK(opcion)}
          cerrarmodal={cerrarModalAtk}
          modalpyr={abrirModalPresYRes}
        />
      )}

      {/* Modal presunta y respueta */}
      {mostarpresYres && (
        <ModalPreYRes
          preYres={mostarpresYres}
          respuesta={(respuesta) => ValidarRespuesta(respuesta)}
          cerrarmodal={cerrarModalPresYRes}
        />
      )}
      {/* Modal infromaciond de la accion */}
      {modalinfoaccion && (
        <Modalmostarinfo
          mostarinfo={modalinfoaccion}
          nombre={infoaccion.nombre}
          opcion={infoaccion.opcion}
          danio={infoaccion.danio}
          mana={infoaccion.mana}
          onClose={cerrarinfoaccion}
        />
      )}

      {/* Modal rendirse */}
      {modalrendirse && <ModalRendirse rendirse={modalrendirse} />}
    </div>
  );
}
