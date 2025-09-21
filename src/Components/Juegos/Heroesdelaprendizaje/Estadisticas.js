import React from "react";
import "./stylesheroes.css";

export class NpcStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hp: props.hp,
      atk: props.atk,
      def: props.def,
      mana: props.mana,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hp !== this.props.hp) {
      this.setState({
        hp: this.props.hp,
        atk: this.props.atk,
        def: this.props.def,
        mana: this.props.mana,
      });
    }
  }

  render() {
    return (
      <div>
        <h5 className="informacion">Npc</h5>
        <div className="info-contenedor">
          <div className="informacion">
            <p>HP: {this.state.hp}</p>
            <p>ATK: {this.state.atk}</p>
          </div>
          <div className="informacion">
            <p>DEF: {this.state.def}</p>
            <p>Mana: {this.state.mana}</p>
          </div>
        </div>
      </div>
    );
  }
}
NpcStats.defaultProps = {
  hp: 5000,
  atk: 150,
  def: 100,
  mana: 300,
};

export class SamuraiStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hp: props.hp,
      atk: props.atk,
      def: props.def,
      mana: props.mana,
      mostardef: props.mostardef,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.hp !== this.props.hp ||
      prevProps.mostardef !== this.props.mostardef
    ) {
      this.setState({
        hp: this.props.hp,
        atk: this.props.atk,
        def: this.props.def,
        mana: this.props.mana,
        mostardef: this.props.mostardef,
      });
    }
  }

  render() {
    return (
      <div>
        <h5 className="informacion">Personaje</h5>
        <div className="info-contenedor">
          <div className="informacion">
            <p>HP: {this.state.hp}</p>
            <p>ATK: {this.state.atk}</p>
          </div>
          <div className="informacion">
            <p>
              DEF: {this.state.def} {this.state.mostardef && <span>(+20)</span>}
            </p>
            <p>Mana: {this.state.mana}</p>
          </div>
        </div>
      </div>
    );
  }
}
SamuraiStats.defaultProps = {
  hp: 5000,
  atk: 200,
  def: 50,
  mana: 100,
};
