import React, { Component } from 'react';
import './App.css';
import Modal from 'react-responsive-modal';
import './Estilos/Modal.css';

class App extends Component {
  state = {
    propiedades: [],
    open: false,
    idCamb:'',
    nombrePropCamb:'',
    nombreCamb:'',
    direcCamb: '',
    costCamb: '',
    nombreNu:'',
    direccionNu: '',
    duenoNu:'',
    costoNu:''
  };

  componentDidMount() {
    this.traerProp()
      .then(res => this.setState({ propiedades: res }))
      .catch(err => console.log(err));
  }

  openModal (id,nombreProp, nombre,direccion, costo) {
    this.setState({ open: true });
    this.setState ({idCamb: id, nombrePropCamb: nombreProp, nombreCamb: nombre, direcCamb: direccion, costCamb: costo});
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  traerProp = async () => {
    const proper = await fetch('/propiedades');
    const body = await proper.json();
    console.log(body);
    if (proper.status !== 200) throw Error(body.message);
    return body;
  };

  edicionProp = async e => {
    e.preventDefault();
    const id = this.state.idCamb;
    const response = await fetch('/propiedades/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombreProp: this.state.nombrePropCamb, nombre: this.state.nombreCamb, direccion: this.state.direcCamb, costo: this.state.costCamb }),
    });
    const actual = await response.json();
    console.log (actual);
    this.setState({propiedades: actual, open:false});
  };

  nuevaProp = async e => {
    e.preventDefault();
    const response = await fetch('/propiedades/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombreProp: this.state.nombreNu , nombre: this.state.duenoNu, direccion: this.state.direccionNu, costo: this.state.costoNu }),
    });
    const actual = await response.json();
    console.log (actual);
    this.setState({
      propiedades: actual, 
      open:false,  
      nombreNu:'', 
      direccionNu: '',
      duenoNu:'', 
      costoNu:''
    });

  }

render() {
  const {open} = this.state;
    return (
      <div className='app'>
          <header className='animated bounceInDown'>
            <div className='wrapper'>
              <h1>VISOR TRUEHOME</h1>
            </div>
          </header>         
          <div className='container'>
            <section className='add-item animated slideInLeft'>
                <center><strong>Nueva Propiedad</strong></center>
                <form style = {{marginTop: '20px'}} onSubmit = {this.nuevaProp}>
                  <input required type="text" name="Direc" value={this.state.direccionNu} placeholder="Dirección" onChange={e => this.setState({ direccionNu: e.target.value })} />
                  <input required type="text" name="Cost" value={this.state.costoNu} placeholder="Costo" onChange={e => this.setState({ costoNu: e.target.value })} />
                  <button>Agregar</button>
                </form>
            </section>
            <section className='display-item'>
              <div className='wrapper'>
                <ul>
                  {this.state.propiedades.map((step, index) => (
                    <li className = 'animated flipInX' key={step.id} >
                      <h3>{step.nombre}</h3>
                      <p>Cliente: {step.dueño}</p>
                      <p>Dirección: {step.direccion}</p>
                      <p>Costo: {step.costo}</p>
                      <button onClick = {(e)=> this.openModal(step.id, step.nombre, step.dueño, step.direccion, step.costo)} >Editar</button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
    <Modal 
      open={open} 
      onClose={this.closeModal} 
      classNames={{
        overlay: 'custom-overlay', 
        modal: 'custom-modal',
        transitionEnter: 'transition-enter',
        transitionEnterActive: 'transition-enter-active',
        transitionExit: 'transition-exit-active',
        transitionExitActive: 'transition-exit-active',
        closeButton : 'closeButton' 
      }}
      animationDuration={300}
      center
      >
        <form onSubmit={this.edicionProp}>
          <h3>Editar</h3>
          <p>
            <strong>Propiedad:</strong>
          </p>
          <input
          required
          type="text"
          defaultValue={this.state.nombrePropCamb}
          onChange={e => this.setState({ nombrePropCamb: e.target.value })}
          />
          <p>
            <strong>Cliente:</strong>
          </p>
          <input
          required
          type="text"
          defaultValue={this.state.nombreCamb}
          onChange={e => this.setState({ nombreCamb: e.target.value })}
          />
          <p>
            <strong>Direccion</strong>
          </p>
          <input
          required
          type="text"
          defaultValue={this.state.direcCamb}
          onChange={e => this.setState({ direcCamb: e.target.value })}
          />
          <p>
            <strong>Costo:</strong>
          </p>
          <input
          required
          type="text"
          defaultValue={this.state.costCamb}
          onChange={e => this.setState({ costCamb: e.target.value })}
          />
          <button type="submit">Cambiar</button>
        </form>
    </Modal>
      </div>
    );
  }
}

export default App;