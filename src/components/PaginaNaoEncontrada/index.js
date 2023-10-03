import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import text from '../../version.json'

function PaginaNaoEncontrada() {
    return (
        <div className='mainContainerNotFound paddingLeft'>

            <div className="divMainContainerPageNotFound">
                <img src={require('./assets/branco.png')}></img>
                <h2 className='notFoundTitle'>Não encontramos essa página! <br/>Se você estiver perdido, <Link className='homeBackhome' to="/now">retorne para a Home.</Link></h2>
                <h4 className='notFoundBody'>Encontrou um problema? Nos ajudaria muito se você abrisse um ticket <a className='homeBackhome' href="https://github.com/MonoDryad/BattleMode">no nosso github</a>!</h4>
                <p className='errorVersion'>{text.version}</p>

            </div>
        </div>
        )
}

export default PaginaNaoEncontrada