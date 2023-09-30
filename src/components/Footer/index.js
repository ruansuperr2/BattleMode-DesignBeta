import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
    const data = new Date()
    let ano = data.getFullYear()



    return (
        <div className="divContainerFooter">
            <div className="divDividerFooter">
                <div className="divLeftFooter">
                    <a href="https://github.com/MonoDryad/BattleMode">
                        <div className="divLeftSocialContainers">
                            <GitHubIcon color="white" sx={{ fontSize: 40 }} />
                        </div>
                    </a>
                    <a href="https://twitter.com/gaiacup">
                        <div className="divLeftSocialContainers">
                            <TwitterIcon color="white" sx={{ fontSize: 40 }} />
                         </div>
                    </a>
                    <a href="">
                        <div className="divLeftSocialContainers">
                            <img src={require("./assets/discord.png")} style={{ fontSize: 40}}/>
                        </div>
                    </a>
                </div>
                <div className="divMiddleFooter">
                    <img className="imgLogo" src={require("./assets/logo.png")} />
                </div>
                <div className="divRightFooter">
                    <Link to="/" className="fontFooter">Início</Link>
                    <Link to="/feed" className="fontFooter">Feed</Link>
                    <Link to="/games" className="fontFooter">Jogos</Link>
                    <Link to="/about" className="fontFooter">Sobre</Link>
                </div>
            </div>
            {/* <div className="divNotAffiliated">
                <h4>Os campeonatos registrados nessa plataforma não estão co-relacionados com a equipe da BattleMode, cada organizadora de torneio deve ser responsabilizar por problemas internos.</h4>    
                <h5>©{ano}: Inexorabilis Team</h5>
            </div> */}
               
        </div>
    )
}