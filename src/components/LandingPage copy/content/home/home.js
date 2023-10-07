import './home.css'
import { useEffect, useState } from 'react';
import Groups2Icon from '@mui/icons-material/Groups2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';


import jogosJson from '../../assets/json/jogos.json'
import userTest from '../../assets/json/users.json'

import { storage } from '../../../FireBase';

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Games from './components/games/games';
import Perfil from './components/perfil/perfil';
import Search from './components/search/search';


export default function Home() {
    const [loggedUser, setLoggedUser] = useState([]);
    const [currentPage, setCurrentPage] = useState('inicio')
    const [jogos, setJogos] = useState([])
    const [torneios, setTorneios] = useState([])
    const [equipes, setEquipes] = useState([])
    const [users, setUsers] = useState([])

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
        // const loadDataJ = async () => {
        //     try {
        //         const response = await fetch(
        //             'http://localhost:6090/api/jogo',
        //         );
        //         const data = response.json();
        //         data.then((val) => {
        //             setJogos(val.data.sort(() => (Math.random() > .5) ? 1 : -1))
        //         })
        //     } catch (error) { }
        // };

        const loadDataJ = async () => {
            try {

                setJogos(jogosJson.sort(() => (Math.random() > .5) ? 1 : -1))

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
                if (window.location.href === "https://battlemode.netlify.app/" || window.location.href === "https://battlemode.netlify.app") {
                    setLoggedUser(userTest.find(account => account.id === JSON.parse(localStorage.getItem('offline'))))

                } else {

                    const [response] = await Promise.all([
                        fetch('http://localhost:6090/api/user/' + JSON.parse(localStorage.getItem('dasiBoard'))),
                    ]);
                    const [user] = await Promise.all([
                        response.json(),
                    ])
                    setLoggedUser(user.data)
                }
            } catch (e) {
                console.error(e)
            }
        };

        loadDataU()


        return () => {
            // Limpar qualquer recurso criado na função de efeito
        };
    }, [])

    useEffect(() => {
        const loadDataU = async () => {
            try {
                const [response] = await Promise.all([
                    fetch('http://localhost:6090/api/user'),
                ]);
                const [user] = await Promise.all([
                    response.json(),
                ])
                setUsers(user.data)

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
    const [statusFetch, setstatusFetch] = useState('NO')


    useEffect(() => {
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

    const fetchData = async (currentMoldura, tituloNew, loggedUsername, imageIcon) => {
        setstatusFetch("Waiting 1s")
        setTimeout(async () => {
            setstatusFetch("Fetching")
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
                setstatusFetch("YES")
            } catch (e) {
                console.log(e)
                setstatusFetch("ERROR")
            }
        }, 1000)
    }

    const fetchDataFundo = async (iFundo) => {
        setstatusFetch("Waiting 1s")
        setTimeout(async () => {
            setstatusFetch("Fetching")
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        username: loggedUser.username,
                        icon: loggedUser.icon,
                        email: loggedUser.email,
                        password: loggedUser.password,
                        twitter: loggedUser.twitter,
                        instagram: loggedUser.instagram,
                        discord: loggedUser.discord,
                        twitch: loggedUser.twitch,
                        titulo: loggedUser.titulo,
                        status: loggedUser.status,
                        corP: loggedUser.corP,
                        corS: loggedUser.corS,
                        favoritados: loggedUser.favoritados,
                        conquistas: loggedUser.conquistas,
                        imgFundo: iFundo,
                        imgFundoDois: loggedUser.imgFundoDois,
                        moldura: loggedUser.moldura,
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
                console.log(loggedUser)
                setstatusFetch("YES")
            } catch (e) {
                console.log(e)
                setstatusFetch("ERROR")
            }
        }, 1000)
    }

    const salvarPerfilFundo = async (imageFundo) => {
        setstatusFetch('Trying to Upload')
        console.log(imageFundo)
        if (imageFundo !== loggedUser.imgFundo) {

            try {
                const file = imageFundo
                console.log('file: ', file)

                console.log(imageFundo, file)
                if (!file) return;
                const storageRef = ref(storage, `fundo/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on("state_changed",
                    (snapshot) => {
                        const progress =
                            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setstatusFetch('Trying to Upload: ' + progress);
                    },
                    (error) => {
                        alert(error);
                        setstatusFetch("ERROR")
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            console.log('URL: ', downloadURL)

                            fetchDataFundo(downloadURL)
                            setstatusFetch("GetDownloadURL: Success!")
                        })
                    }
                )
            }
            catch (e) {

            }
        } else {
            fetchDataFundo(imageFundo)
            setstatusFetch("GetDownloadURL: Success!")
        }


    }


    const salvarPerfilMoldura = async (currentMoldura, tituloNew, loggedUsername, imageIcon) => {
        setstatusFetch('Trying to Upload')
        if (imageIcon !== loggedUser.icon) {

            try {
                const file = imageIcon
                console.log(imageIcon, file)
                if (!file) return;
                const storageRef = ref(storage, `icon/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on("state_changed",
                    (snapshot) => {
                        const progress =
                            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setstatusFetch('Trying to Upload: ' + progress);
                    },
                    (error) => {
                        alert(error);
                        setstatusFetch("ERROR")
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            fetchData(currentMoldura, tituloNew, loggedUsername, downloadURL)
                            setstatusFetch("GetDownloadURL: Success!")
                        })
                    }
                )
            }
            catch (e) {

            }
        } else {
            fetchData(currentMoldura, tituloNew, loggedUsername, imageIcon)
            setstatusFetch("GetDownloadURL: Success!")
        }


    }

    return (
        <div className='mainContainerHome'>
            <nav className='navbarHome'>
                <div className='navbarLeftDiv'>
                    <img style={{ width: "8vw" }} alt='BattleMode' src={require("../../assets/images/BMlogo.png")} />
                    <div className='navbarTextLeft'>
                        <label id="inicio" onClick={() => {
                            setCurrentPage('inicio')
                        }}>
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
                        <label><img alt='Currency' src={require('../../assets/images/Coin.png')} width={28} height={28} />5000</label>
                    </div>
                </div>
                <div className='navbarRightDiv'>
                    {loggedUser.moldura !== undefined &&
                        <img className='userNavBorder' src={require(`../../assets/images/borders/${loggedUser.moldura}_border.png`)} alt=""></img>
                    }
                    <img alt='ImgUser' src={loggedUser && loggedUser.icon} id="userIcon" className='userBodyIcon' width={50} height={50}></img>
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
                        <Search users={users} torneio={torneios} jogos={jogos} times={equipes} loggedUser={loggedUser}></Search>
                    }
                    {currentPage === 'perfil' &&
                        <Perfil users={users} salvarPerfilFundo={salvarPerfilFundo} setstatusFetch={setstatusFetch} statusFetch={statusFetch} salvarPerfilMoldura={salvarPerfilMoldura} torneio={torneios} jogos={jogos} times={equipes} loggedUser={loggedUser}></Perfil>

                    }
                    {/* {currentPage === 'equipes' &&
                        <Times></Times>
                    }
                    {currentPage === 'torneios' &&
                        <Participar></Participar>
                    } */}
                </div>
                <div className='listBody'>

                </div>
            </div>
        </div>
    )
}