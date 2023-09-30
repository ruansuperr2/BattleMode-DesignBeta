import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import text from '../../version.json'
import Footer from '../Footer'

export default function UsuarioNaoEncontrado(){
    return(
        <div className='mainContainerNotFound paddingLeft'>

            <div className="divMainContainerPageNotFound">
                <img src={require('../PaginaNaoEncontrada/assets/branco.png')}></img>
                <h2 className='notFoundTitle'>Você não está conectado em uma conta. <br/>Faça o <Link className='homeBackhome' to="/login">login</Link> ou <Link className='homeBackhome' to="/cadastro">crie uma nova conta</Link></h2>
                <h4 className='notFoundBody'>Encontrou um problema? Nos ajudaria muito se você abrisse um ticket <a className='homeBackhome' href="https://github.com/MonoDryad/BattleMode">no nosso github</a>!</h4>
                <p className='errorVersion'>{text.version}</p>
            </div>
            <Footer></Footer>
        </div>
    )
}