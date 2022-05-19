import React from 'react';
import GoogleMapReact from 'google-map-react';
import './MapTienda.css';

//const API_KEY='AIzaSyB3RFavOUgkBQTb2yehnUpLGeZ2Lw0Hiok'
export default function MapTienda () {
  

  
    return (
      <>
        <div className="container-ppal">
      <div className='container-map' style={{ height: '500px', width: '400px' }}>
        <GoogleMapReact
          key={'AIzaSyBBiO1dul34uPv6j-_skKv4tO0fGBvTGBs'}
          // style={{ height: '100px', width: '100px' }}
          zoom={18}
          center={{ lat: -31.3953813, lng: -64.2511600 }}
        />
          
        
      </div>
      <div className="tienda-container" >
            <h2>Nuestra Tienda</h2>
                <p>Acercate a conocer nuestros productos</p>
                <p>Encontraras las mejores marcas deportivas</p>
                <p>Atendido por los mejores asesores de ventas!</p>
                <br/>
                <p><b>Dirección</b> : 27 de Abril </p>
                <p>Ciudad de Córdoba</p>
                <p>Argentina</p>
        </div>
        <div className="envios-container" >
            <h2>Envios</h2>
            <p>Te enviamos tu compra</p>
            <p> <b>SIN CARGO!!</b></p>
            <p> a cualquier parte del país !</p> 
             <br></br>  
            <p> En caso de estar buscado para otra</p>
            <p> zona, podes comunicarte a nuestro</p>
            <p> correo para coordinar con nosotros!</p>    
        </div>
        </div>
        </>
    );
  }


