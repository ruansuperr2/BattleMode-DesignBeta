import './home.css'
import { useEffect, useState, useRef } from 'react';
import Games from './components/games/games';
import Groups2Icon from '@mui/icons-material/Groups2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

import FindAll from '../../../FindAll';
import Times from '../../../Times';
import Perfil from './components/perfil/perfil';
import Participar from '../../../Participar'

export default function Home() {
    const [loggedUser, setLoggedUser] = useState([]);
    const [currentPage, setCurrentPage] = useState('inicio')
    const [jogos, setJogos] = useState([])
    const [torneios, setTorneios] = useState([])
    const [equipes, setEquipes] = useState([])

    useEffect(() => {
        const loadDataT = async () => {
            try {
                const response = await fetch(
                    'http://localhost:6090/api/torneio',
                );
                const data = response.json();
                data.then((val) => {
                    setTorneios(val.data.sort(() => (Math.random() > .5) ? 1 : -1))
                })
            } catch (error) { }
        };

        loadDataT()


        return () => {
            // Limpar qualquer recurso criado na função de efeito
        };
    }, [])

    useEffect(() => {
        const loadDataJ = async () => {
            try {
                const response = await fetch(
                    'http://localhost:6090/api/time',
                );
                const data = response.json();
                data.then((val) => {
                    setEquipes(val.data)
                })
            } catch (error) { }
        };

        loadDataJ()


        return () => {
            // Limpar qualquer recurso criado na função de efeito
        };
    }, [])

    useEffect(() => {
        const loadDataJ = async () => {
            try {
                const response = await fetch(
                    'http://localhost:6090/api/jogo',
                );
                const data = response.json();
                data.then((val) => {
                    setJogos(val.data.sort(() => (Math.random() > .5) ? 1 : -1))
                })
            } catch (error) { }
        };

        loadDataJ()


        return () => {
            // Limpar qualquer recurso criado na função de efeito
        };
    }, [])

    useEffect(() => {
        const loadDataU = async () => {
            try {
                const [response] = await Promise.all([
                    fetch('http://localhost:6090/api/user/' + JSON.parse(localStorage.getItem('dasiBoard'))),
                ]);
                const [user] = await Promise.all([
                    response.json(),
                ])
                setLoggedUser(user.data)
            } catch (e) {
                console.error(e)
            }
        };

        loadDataU()


        return () => {
            // Limpar qualquer recurso criado na função de efeito
        };
    }, [])

    // Use o setTimeout() para garantir que o DOM esteja totalmente carregado antes de tentar atualizar o elemento

    useEffect(() => {
        const iconElement = document.querySelector("#userIcon");
        const userNameElement = document.querySelector("#userName");

        const inicio = document.querySelector("#inicio");
        const noticias = document.querySelector("#noticias");
        const procurar = document.querySelector("#procurar");
        const perfil = document.querySelector("#perfil");
        const equipes = document.querySelector("#equipes");
        const torneios = document.querySelector("#torneios");
        setTimeout(() => {

            if ('inicio' === currentPage) {
                inicio.style.backgroundColor = '#303030'
                inicio.style.boxShadow = '0px -4px 0px 0px inset #fc6b03'
            }

            else {
                inicio.style.backgroundColor = ''
                inicio.style.boxShadow = ''

            }

            if ('noticias' === currentPage) {
                noticias.style.backgroundColor = '#303030'
                noticias.style.boxShadow = '0px -4px 0px 0px inset #fc6b03'
            }

            else {
                noticias.style.backgroundColor = ''
                noticias.style.boxShadow = ''

            }

            if ('procurar' === currentPage) {
                procurar.style.backgroundColor = '#303030'
                procurar.style.boxShadow = '0px -4px 0px 0px inset #fc6b03'
            }

            else {
                procurar.style.backgroundColor = ''
                procurar.style.boxShadow = ''

            }

            if ('perfil' === currentPage) {
                perfil.style.backgroundColor = '#303030'
                perfil.style.boxShadow = '0px -4px 0px 0px inset #fc6b03'
            }

            else {
                perfil.style.backgroundColor = ''
                perfil.style.boxShadow = ''

            }

            if ('equipes' === currentPage) {
                equipes.style.backgroundColor = '#303030'
                equipes.style.boxShadow = '0px -4px 0px 0px inset #fc6b03'
            }

            else {
                equipes.style.backgroundColor = ''
                equipes.style.boxShadow = ''

            }

            if ('torneios' === currentPage) {
                torneios.style.backgroundColor = '#303030'
                torneios.style.boxShadow = '0px -4px 0px 0px inset #fc6b03'
            }

            else {
                torneios.style.backgroundColor = ''
                torneios.style.boxShadow = ''

            }
        }, 200);
    }, [loggedUser, currentPage])
    
    const salvarPerfilMoldura = async(currentMoldura, tituloNew, loggedUsername, imageIcon) =>{
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    username: loggedUsername,
                    icon: imageIcon,
                    email: loggedUser.email,
                    password: loggedUser.password,
                    twitter: loggedUser.twitter,
                    instagram: loggedUser.instagram,
                    discord: loggedUser.discord,
                    twitch: loggedUser.twitch,
                    titulo: tituloNew,
                    status: loggedUser.status,
                    corP: loggedUser.corP,
                    corS: loggedUser.corS,
                    favoritados: loggedUser.favoritados,
                    conquistas: loggedUser.conquistas,
                    imgFundo: loggedUser.imgFundo,
                    imgFundoDois: loggedUser.imgFundoDois,
                    moldura: currentMoldura,
                    dataCriacao: loggedUser.dataCriacao,

                })
            }
            await fetch('http://localhost:6090/api/user/' + loggedUser.id, requestOptions)
            const [response] = await Promise.all([
                fetch('http://localhost:6090/api/user/' + JSON.parse(localStorage.getItem('dasiBoard'))),
            ]);
            const [user] = await Promise.all([
                response.json(),
            ])
            setLoggedUser(user.data)
        }catch(e){
            console.log(e)
        }
        
    }

    return (
        <div className='mainContainerHome'>
            <nav className='navbarHome'>
                <div className='navbarLeftDiv'>
                    <img style={{ width: "8vw" }} src={require("../../assets/images/BMlogo.png")} />
                    <div className='navbarTextLeft'>
                        <label id="inicio" onClick={() => { 
                            setCurrentPage('inicio')
                        } }>
                            INÍCIO
                        </label>
                        <label id="noticias" onClick={() => {
                            setCurrentPage('noticias')
                        }} >
                            NOTÍCIAS
                        </label>
                    </div>
                    <div className='navbarTextRight'>
                        <div id="procurar" onClick={() => {
                            setCurrentPage('procurar')
                        }} >
                            <ContentPasteSearchIcon sx={{
                                fontSize: 30,
                                color: 'white',
                            }} />
                            <label>Procurar</label>
                        </div>
                        <div id="perfil" onClick={() => {
                            setCurrentPage('perfil')
                        }} >
                            <AccountCircleIcon sx={{
                                fontSize: 30,
                                color: 'white',
                            }} />
                            <label>Perfil</label>

                        </div>
                        <div id="equipes" onClick={() => {
                            setCurrentPage('equipes')
                        }} >
                            <Groups2Icon sx={{
                                fontSize: 30,
                                color: 'white',
                            }} />
                            <label>Equipes</label>

                        </div>
                        <div id="torneios" onClick={() => {
                            setCurrentPage('torneios')
                        }} >
                            <EmojiEventsIcon sx={{
                                fontSize: 30,
                                color: 'white',
                            }} />
                            <label>Torneios</label>

                        </div>
                    </div>
                    <div className="moneyDiv">
                        <label><img src={require('../../assets/images/Coin.png')} width={28} height={28}/>5000</label>
                    </div>
                </div>
                <div className='navbarRightDiv'>
                    {loggedUser.moldura !== undefined &&
                        <img className='userNavBorder' src={require(`../../assets/images/borders/${loggedUser.moldura}_border.png`)} alt=""></img>
                    }
                    <img src={loggedUser && loggedUser.icon} id="userIcon" className='userBodyIcon' width={50} height={50}></img>
                    <div className='userNameOnNavbar'>

                        <label id="userName" className='userBodyName'>{loggedUser && loggedUser.username}</label>
                        <label id="userName" className='userBodyTitle'>{loggedUser && loggedUser.titulo}</label>
                    </div>
                </div>
            </nav>
            <div className='mainContentBody'>
                <div className='childrenBody'>
                    {currentPage === 'inicio' &&
                        <Games currentPage={currentPage} loggedUser={loggedUser} torneios={torneios} jogos={jogos}></Games>
                    }
                    {currentPage === 'noticias' &&
                        <div></div>
                    }
                    {currentPage === 'procurar' &&
                        <FindAll></FindAll>
                    }
                    {currentPage === 'perfil' &&
                        <Perfil salvarPerfilMoldura={salvarPerfilMoldura} torneio={torneios}  jogos={jogos} times={equipes} loggedUser={loggedUser}></Perfil>
                        
                    }
                    {currentPage === 'equipes' &&
                        <Times></Times>
                    }
                    {currentPage === 'torneios' &&
                        <Participar></Participar>
                    }
                </div>
                <div className='listBody'>

                </div>
            </div>
        </div>
    )
}