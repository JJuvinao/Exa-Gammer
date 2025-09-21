//lobo npc
import idlelobo from "./imagenes/Npcs/LoboIdle.gif";
import dañolobo from "./imagenes/Npcs/Daño.gif";
import deadlobo from "./imagenes/Npcs/Dead.gif";
import At1lob from "./imagenes/Npcs/LoboAttack1.gif";
import At2lob from "./imagenes/Npcs/LoboATK2.gif";
import At3lob from "./imagenes/Npcs/LoboATK3.gif";

//mago
import idlemago from "./imagenes/Mago/MagoIdle.gif";
import Atk1mago from "./imagenes/Mago/magoATK1.gif";
import Atk2mago from "./imagenes/Mago/magoATK2.gif";
import Atk3mago from "./imagenes/Mago/magoATK3.gif";
import deadmago from "./imagenes/Mago/Dead1.gif";
import dead2mago from "./imagenes/Mago/Dead2.png";
import dañomago from "./imagenes/Mago/Daño.gif";
import carga1 from "./imagenes/Mago/Charge1.gif";
import carga2 from "./imagenes/Mago/Charge2.gif";

//guerero
import idleguerrero from "./imagenes/Guerrero/GuerreroIdle.gif";
import atk1gue from "./imagenes/Guerrero/guerrATK1.gif";
import atk2gue from "./imagenes/Guerrero/guerreroATK2.gif";
import atk3gue from "./imagenes/Guerrero/guerrATK3.gif";
import deadgue from "./imagenes/Guerrero/Dead1.gif";
import dead2gue from "./imagenes/Guerrero/Dead2.png";
import defgue from "./imagenes/Guerrero/Defend.gif";
import dañogue from "./imagenes/Guerrero/Daño.gif";

//samurai
import idlesamu from "./imagenes/Samurai/SamuraiIdle.gif";
import Atk1samu from "./imagenes/Samurai/samuATK1.gif";
import Atk2samu from "./imagenes/Samurai/samurariATK2.gif";
import Atk3samu from "./imagenes/Samurai/samuATK3.gif";
import deadsamu from "./imagenes/Samurai/SamuraiDead.gif";
import dead2samu from "./imagenes/Samurai/SamuraiDead.png";
import defsamu from "./imagenes/Samurai/SamuraiProtection.gif";
import dañosamu from "./imagenes/Samurai/SamuraiHurt.gif";

//Varios
import sangreperso from "./imagenes/Varios/sangrepersonaje.png";
import sangrenpc from "./imagenes/Varios/sangrenpc.png";

export function AnimationSamurai() {
  const samura = [
    idlesamu,
    Atk1samu,
    Atk2samu,
    Atk3samu,
    defsamu,
    dañosamu,
    deadsamu,
    dead2samu,
  ];

  return samura;
}

export function AnimationMago() {
  const mago = [
    idlemago,
    Atk1mago,
    Atk2mago,
    Atk3mago,
    dañomago,
    deadmago,
    dead2mago,
    carga1,
    carga2,
  ];

  return mago;
}

export function AnimationGuerrero() {
  const guerero = [
    idleguerrero,
    atk1gue,
    atk2gue,
    atk3gue,
    defgue,
    dañogue,
    deadgue,
    dead2gue,
  ];

  return guerero;
}

export function AnimationNpc() {
  const npc = [idlelobo, At1lob, At2lob, At3lob, dañolobo, deadlobo];
  return npc;
}

export function AnimationVarios() {
  const varios = [sangreperso, sangrenpc];
  return varios;
}

export function SelecAnimation({ personaje }) {
  switch (personaje) {
    case "Samurai":
      return AnimationSamurai();
    case "Mago":
      return AnimationMago();
    case "Guerrero":
      return AnimationGuerrero();
    default:
      break;
  }
}
