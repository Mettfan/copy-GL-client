import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import face from '../../assets/face.jpg';
import inst from '../../assets/inst.png'
import termino from '../../assets/termino.png';
import localizacion from '../../assets/localizacion.jpg';
import sobre from '../../assets/sobre.png'
//import GENDERLESS from '../../assets/GENDERLESS.png';

function Footer() {
  const {pathname} = window.location;

  return (
    // !pathname.includes("admin")  &&
    <div className="footer">
      <div className="footer-container">
      
        
        {/* <div className='titleFooter' style={{ maxHeight: '100px', color: 'white' }}>GENDERLESS</div> */}
        <div>
          <Link to={'/terminos'} className='link-footer' style={{ maxHeight: '100px', color: 'white' }} >
            <p>Terminos y condiciones</p>
            <img src={termino} color="black" alt=" " width={30} height={29} className='otro'/>
          </Link>
        </div>

        <div className='footer-container'>
          <a className='link-footer' target="_blank" style={{ maxHeight: '100px', color: 'white' }}
            href="https://www.facebook.com/profile.php?id=100081210152105">
            <p>Facebook</p>
            <img src={face} alt=" " width={30} height={28} className='email' />
          </a>
        </div>

        <div className='footer-container'>
          <a className='link-footer' target="_blank" style={{ maxHeight: '100px', color: 'white' }}
            href="http://www.instagram.com/genderless_ropa" ><p>Instagram</p>
            <img src={inst} alt=" " width={30} height={28} className='otro'/>
          </a>
        </div>

        <div>
          <Link to="/mapa" className='link-footer' style={{ maxHeight: '100px', color: 'white' }}>
            <p>Visítanos en nuestra tienda</p>
            <img src={localizacion} alt=" " className='otro' width={30} height={28} />
          </Link>
        </div>

        <div className='footer-container'>
          <a className='link-footer' style={{ maxHeight: '100px', color: 'white' }}
            href="mailto:genderless2022@gmail.com">
            <p>Reclamos o sugerencias</p>
            <img src={sobre} alt=" " className='otro' width={30} height={28} />
          </a>
        </div>

      </div>
    </div>
        
        )
}

export default Footer