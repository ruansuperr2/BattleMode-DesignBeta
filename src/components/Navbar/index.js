import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FaSearch, FaDoorOpen, FaRegUserCircle, FaTrophy, FaUsers } from 'react-icons/fa'

import './index.css'
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import InfoIcon from '@mui/icons-material/Info';
import text from '../../version.json'


export const Navbar = (props) => {
    const DEFAULT_COLOR = '#fc6b03'
    let root = document.querySelector(':root')
    const [icon, setIcon] = useState(<FaBars style={{ fontSize: '30px', color: '#fc6b03' }} />)
    const [navAberta, setNavAberta] = useState(false)
    getComputedStyle(document.documentElement).getPropertyValue('--responsiveHeight')

    const [loggedUser, setLoggedUser] = useState(null)
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);





    useEffect(() => {
        const loadData = async () => {
            try {
                const [response] = await Promise.all([
                    fetch('http://localhost:6090/api/user/' + JSON.parse(localStorage.getItem('dasiBoard'))),
                ]);
                const [user] = await Promise.all([
                    response.json(),
                ]);
                setLoggedUser(user.data);
                setIsLoading(false);
            } catch (e) {
                setError(e);
                setIsLoading(false);
            }
        };

        loadData();

    }, []);

    useEffect(() => {
        if (loggedUser) { // Se o usuário já foi carregado, execute o código abaixo
            document.querySelector('.loggedUserNameNavBar').style.display = 'flex'
            document.querySelector('.loggedUserFunctions').style.display = 'flex'
            document.querySelector('.EntrarRegistroNavBar').style.display = 'none'
            document.querySelector('.userNameP').textContent = loggedUser.username
            document.querySelector('.imgIconP').setAttribute("src", loggedUser.icon)
            root.style.setProperty("--scrollbar-color", loggedUser.corS)
        } else {
            document.querySelector('.loggedUserNameNavBar').style.display = 'none'
            document.querySelector('.loggedUserFunctions').style.display = 'none'
            document.querySelector('.EntrarRegistroNavBar').style.display = 'flex'
            root.style.setProperty("--scrollbar-color", '#fc6b03')
        }
    }, [loggedUser]);
    

    const handleNavRes = () => {
        if (!navAberta) {
            setNavAberta(true)
            setIcon(<FaTimes style={{ fontSize: '30px', color: '#fc6b03' }} />)
            return document.documentElement.style.setProperty('--responsiveHeight', '30rem')
        }
        setNavAberta(false)
        setIcon(<FaBars style={{ fontSize: '30px', color: '#fc6b03' }} />)
        document.documentElement.style.setProperty('--responsiveHeight', '4%')
    }


    return (
        <div className="">
            <div className="divDividerNavbar" style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>

                <div className="divLeftNavbar" style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>
                    <Link to="/now" className="fontNavbar"><HomeIcon className='iconNavbar iconHome' sx={{ fontSize: 32, fill: loggedUser ? loggedUser.corS : DEFAULT_COLOR }} />Home</Link>
                    <Link to="/feed" className="feedLinkDetector fontNavbar"><EmojiEventsIcon className='iconNavbar iconTorneios' sx={{ fontSize: 32, fill: loggedUser ? loggedUser.corS : DEFAULT_COLOR }} />Eventos</Link>
                    <Link to="/games" className="fontNavbar"><SportsEsportsIcon className='iconNavbar iconJogos' sx={{ fontSize: 32, fill: loggedUser ? loggedUser.corS : DEFAULT_COLOR }} />Esports</Link>
                    <Link to="/about" className="fontNavbar"><InfoIcon className='iconNavbar iconAbout' sx={{ fontSize: 32, fill: loggedUser ? loggedUser.corS : DEFAULT_COLOR }} />Sobre</Link>
                </div>
                <div className="divRightNavbar" style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>

                    <label>{text.version}</label>


                </div>
            </div>

            <div className={`divSideLoginRegister`} style={{ borderBottomColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>
                <img className='logoNavbar' src={require("./assets/logo.png")} style={{ marginRight: '1rem' }} />


                <div className='loggedUserFunctions' style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>
                    <label onClick={handleNavRes} id='hamburguer' style={{ height: 'auto' }}>{icon}</label>
                    <div className='navbarGrid'>
                        <label onClick={() => { window.location.href = `/u/${loggedUser ? loggedUser.username : 'null'}` }}><FaRegUserCircle style={{ height: '25px', width: '25px', color: loggedUser ? loggedUser.corS : DEFAULT_COLOR, paddingRight: '5px' }} /> Perfil</label>
                        <label onClick={() => { window.location.href = `/criarEquipe` }}><FaUsers style={{ height: '25px', width: '25px', color: loggedUser ? loggedUser.corS : DEFAULT_COLOR, paddingRight: '5px' }}/> Criar Equipe</label>
                        <label onClick={() => { window.location.href = `/criarTorneio` }}><FaTrophy style={{ height: '25px', width: '25px', color: loggedUser ? loggedUser.corS : DEFAULT_COLOR, paddingRight: '5px' }}/> Criar Torneio</label>
                        <label onClick={() => { window.location.href = `/find/u` }}><FaSearch style={{ height: '25px', width: '25px', color: loggedUser ? loggedUser.corS : DEFAULT_COLOR, paddingRight: '5px' }} /> Procurar</label>

                        <label onClick={() => {
                            localStorage.clear('dasiBoard')
                            window.location.reload(true)
                        }}><FaDoorOpen style={{ height: '30px', width: '30px', color: loggedUser ? loggedUser.corS : DEFAULT_COLOR, paddingRight: '5px' }} /> Sair</label>
                    </div>
                </div>
                <div className='EntrarRegistroNavBar'>
                    <button onClick={() => { window.location.href = '/cadastro' }}> Cadastrar-se </button>
                    <button onClick={() => { window.location.href = '/login' }}> Entrar</button>
                </div>
                <div className='loggedUserNameNavBar'>
                    <img className='imgIconP' style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }} />
                    <p className='userNameP'></p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
