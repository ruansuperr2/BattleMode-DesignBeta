import React, { useEffect, useState } from 'react'
import './index.css'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useParams } from 'react-router-dom'
import { storage } from '../FireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { SketchPicker } from 'react-color';
import { ChromePicker } from "react-color";
import UsuarioNaoEncontrado from '../UsuarioNaoEncontrado'

import MDEditor from '@uiw/react-md-editor'
import ModalCustom, { showModal, closeModal } from '../Modal'
import Loading from '../Loading'

let getUsersTry = 0
let deadOrAlive = false
let stopIt = 0
function Usuario() {

    const { id } = useParams();

    const [favoritadoz, setFavoritadoz] = useState([])
    const [username, setUsername] = useState('')
    const [icon, setIcon] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [discord, setDiscord] = useState('')
    const [twitch, setTwitch] = useState('')
    const [status, setStatus] = useState('')
    const [corP, setCorP] = useState('')
    const [corS, setCorS] = useState('')
    const [favoritados, setFavoritados] = useState('')
    const [conquistas, setConquistas] = useState('')
    const [imgFundo, setimgFundo] = useState('')
    const [imgFundoDois, setimgFundoDois] = useState('')
    const [dataCriacao, setdataCriação] = useState('')
    const [newEmail, setnewEmail] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [users, setUsers] = useState([])

    const [loggedUser, setLoggedUser] = useState({})
    const [viewingUser, setViewingUser] = useState([])
    const [page, setPage] = useState('geral')
    const [jogo, setJogo] = useState([])
    const [torneio, setTorneio] = useState([])
    const [time, setTime] = useState([])

    const [imgUrl, setImgUrl] = useState(null);
    const [imgUrl2, setImgUrl2] = useState(null);
    const [imgUrl3, setImgUrl3] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [progresspercent2, setProgresspercent2] = useState(0);
    const [progresspercent3, setProgresspercent3] = useState(0);

    const handleSubmit = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        const storageRef = ref(storage, `PefilIcon/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                })
            }
        )
    }

    const handleSubmitImgFundo = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        const storageRef = ref(storage, `ImgFundo/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent2(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl2(downloadURL)
                })
            }
        )
    }

    const handleSubmitImgFundoDois = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        const storageRef = ref(storage, `ImgFundoDois/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent3(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl3(downloadURL)
                })
            }
        )
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const [jogoResponse, torneioResponse, userResponse, viewResponse, timeResponse] = await Promise.all([
                    fetch('http://localhost:6090/api/jogo'),
                    fetch('http://localhost:6090/api/torneio'),
                    fetch('http://localhost:6090/api/user/' + JSON.parse(localStorage.getItem('dasiBoard'))),
                    fetch('http://localhost:6090/api/user/'),
                    fetch('http://localhost:6090/api/time')
                ])
                const [jogoData, torneioData, userData, viewData, timeData] = await Promise.all([
                    jogoResponse.json(),
                    torneioResponse.json(),
                    userResponse.json(),
                    viewResponse.json(),
                    timeResponse.json()
                ])
                setTorneio(torneioData.data)
                setJogo(jogoData.data)
                setLoggedUser(userData.data)
                setViewingUser(viewData.data.find((e) => { return e.username === id }))
                setTime(timeData.data)
            } catch (e) {
            }
        }

        loadData()
    }, [])

    useEffect(() => {

        switch (page) {
            case 'geral':
                document.querySelector('.divUsuarioSubMainContainerCompo').style.display = 'flex'
                document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divConfigSubMainContainerCompo').style.display = 'none'

                document.querySelector('.geral').classList.add('perfilActive')
                document.querySelector('.equipe').classList.remove('perfilActive')
                document.querySelector('.torneio').classList.remove('perfilActive')
                document.querySelector('.config').classList.remove('perfilActive')
                break
            case 'equipe':
                document.querySelector('.divUsuarioSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'flex'
                document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divConfigSubMainContainerCompo').style.display = 'none'

                document.querySelector('.geral').classList.remove('perfilActive')
                document.querySelector('.equipe').classList.add('perfilActive')
                document.querySelector('.torneio').classList.remove('perfilActive')
                document.querySelector('.config').classList.remove('perfilActive')
                break
            case 'torneio':
                document.querySelector('.divUsuarioSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'flex'
                document.querySelector('.divConfigSubMainContainerCompo').style.display = 'none'

                document.querySelector('.geral').classList.remove('perfilActive')
                document.querySelector('.equipe').classList.remove('perfilActive')
                document.querySelector('.torneio').classList.add('perfilActive')
                document.querySelector('.config').classList.remove('perfilActive')
                break
            case 'config':
                document.querySelector('.divUsuarioSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divConfigSubMainContainerCompo').style.display = 'flex'

                document.querySelector('.geral').classList.remove('perfilActive')
                document.querySelector('.equipe').classList.remove('perfilActive')
                document.querySelector('.torneio').classList.remove('perfilActive')
                document.querySelector('.config').classList.add('perfilActive')
                break
        }
    })

    const [value, setValue] = useState(viewingUser.biografia);

    const callEditMarkdownEditor = async (type) => {
        if (type === 'enter') {
            document.querySelector('.divmdEditor').style.display = 'block'
            document.querySelector('.divmdViewer').style.display = 'none'
        } else {
            document.querySelector('.divmdEditor').style.display = 'none'
            document.querySelector('.divmdViewer').style.display = 'block'

            showModal('loading', 'Atualizando o Banco', 'barLoading')
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
                        biografia: value,
                        status: loggedUser.status,
                        corP: loggedUser.corP,
                        corS: loggedUser.corS,
                        favoritados: loggedUser.favoritados,
                        conquistas: loggedUser.conquistas,
                        imgFundo: loggedUser.imgFundo,
                        imgFundoDois: loggedUser.imgFundoDois,
                        dataCriacao: loggedUser.dataCriacao
                    })

                }
                closeModal('success', 'atualizado!', null)
                await fetch('https://web-production-8ce4.up.railway.app/api/user/' + loggedUser.id, requestOptions)
            } catch (e) {
            }
        }
    }

    useEffect(() => {
        
    })
    const makeEverythingWork = () => {
        document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'none';
        document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'none';
        document.querySelector('.divConfigSubMainContainerCompo').style.display = 'none';

        if (loggedUser.username === id) {
            document.querySelector('.divmdEditor').style.display = 'none';
            document.querySelector('.enterMarkdown').style.display = 'flex';
            document.querySelector('.config').style.display = 'flex';

            setImgUrl(loggedUser.icon);
            setImgUrl2(loggedUser.imgFundo);
            setImgUrl3(loggedUser.imgFundoDois);

            setCorS(loggedUser.corS);
            setCorP(loggedUser.corS);

            document.querySelector('.UserPlan').textContent = 'Plano ' + viewingUser.status;

            if (loggedUser.status !== 'Premium') {
                document.querySelector('.premiumConfigs2').style.display = 'none';
                document.querySelector('.premiumConfigs').style.display = 'none';
                document.querySelector('#premiumConfigs2').style.display = 'none';
            }
        } else {
            document.querySelector('.divmdEditor').style.display = 'none';
            document.querySelector('.enterMarkdown').style.display = 'none';
            document.querySelector('.divConfigSubMainContainerCompo').style.display = 'none';
            document.querySelector('.config').style.display = 'none';

            document.querySelector('.UserPlan').textContent = 'Plano ' + viewingUser.status;
        }

        document.querySelector('.geral').classList.add('perfilActive');

        setValue(viewingUser.biografia);

        document.querySelector('.divContainerFundoMainContainer').style.backgroundImage = `url(${viewingUser.imgFundo})`;
        deadOrAlive = true
    };

    if (deadOrAlive === false) {
        setTimeout(() => {
            makeEverythingWork();
        }, 1600);
    }

    const callMudançasPerfil = async (status) => {
        switch (status) {
            case 'IG':
                showModal('loading', 'Atualizando o Banco', 'barLoading')

                try {
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            username: username,
                            icon: imgUrl,
                            email: loggedUser.email,
                            password: loggedUser.password,
                            twitter: loggedUser.twitter,
                            instagram: loggedUser.instagram,
                            discord: loggedUser.discord,
                            twitch: loggedUser.twitch,
                            biografia: loggedUser.biografia,
                            status: loggedUser.status,
                            corP: loggedUser.corP,
                            corS: loggedUser.corS,
                            favoritados: loggedUser.favoritados,
                            conquistas: loggedUser.conquistas,
                            imgFundo: loggedUser.imgFundo,
                            imgFundoDois: loggedUser.imgFundoDois,
                            dataCriacao: loggedUser.dataCriacao
                        })

                    }
                    closeModal('success', 'atualizado!', null)
                    await fetch('https://web-production-8ce4.up.railway.app/api/user/' + loggedUser.id, requestOptions)
                    window.location.href = '/u/' + username
                } catch (e) {
                }
                break
            case 'SC':
                showModal('loading', 'Atualizando o Banco', 'barLoading')

                try {
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            username: loggedUser.username,
                            icon: loggedUser.icon,
                            email: newEmail,
                            password: newPassword,
                            twitter: loggedUser.twitter,
                            instagram: loggedUser.instagram,
                            discord: loggedUser.discord,
                            twitch: loggedUser.twitch,
                            biografia: loggedUser.biografia,
                            status: loggedUser.status,
                            corP: loggedUser.corP,
                            corS: loggedUser.corS,
                            favoritados: loggedUser.favoritados,
                            conquistas: loggedUser.conquistas,
                            imgFundo: loggedUser.imgFundo,
                            imgFundoDois: loggedUser.imgFundoDois,
                            dataCriacao: loggedUser.dataCriacao
                        })

                    }
                    closeModal('success', 'atualizado!', null)
                    await fetch('https://web-production-8ce4.up.railway.app/api/user/' + loggedUser.id, requestOptions)
                    window.location.href = '/u/' + viewingUser.username
                } catch (e) {

                }
                break
            case 'RS':
                showModal('loading', 'Atualizando o Banco', 'barLoading')

                try {
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            username: loggedUser.username,
                            icon: loggedUser.icon,
                            email: loggedUser.email,
                            password: loggedUser.password,
                            twitter: twitter,
                            instagram: instagram,
                            discord: discord,
                            twitch: twitch,
                            biografia: loggedUser.biografia,
                            status: loggedUser.status,
                            corP: loggedUser.corP,
                            corS: loggedUser.corS,
                            favoritados: loggedUser.favoritados,
                            conquistas: loggedUser.conquistas,
                            imgFundo: loggedUser.imgFundo,
                            imgFundoDois: loggedUser.imgFundoDois,
                            dataCriacao: loggedUser.dataCriacao
                        })

                    }
                    closeModal('success', 'atualizado!', null)
                    await fetch('https://web-production-8ce4.up.railway.app/api/user/' + loggedUser.id, requestOptions)
                    window.location.href = '/u/' + viewingUser.username
                } catch (e) {

                }
                break
            case 'PP':
                showModal('loading', 'Atualizando o Banco', 'barLoading')

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
                            biografia: loggedUser.biografia,
                            status: loggedUser.status,
                            corP: corP,
                            corS: corS,
                            favoritados: loggedUser.favoritados,
                            conquistas: loggedUser.conquistas,
                            imgFundo: imgUrl2,
                            imgFundoDois: imgUrl3,
                            dataCriacao: loggedUser.dataCriacao
                        })

                    }
                    closeModal('success', 'atualizado!', null)
                    await fetch('https://web-production-8ce4.up.railway.app/api/user/' + loggedUser.id, requestOptions)
                    window.location.href = '/u/' + viewingUser.username
                } catch (e) {

                }
                break
        }
    }

    const apagarUser = async () => {
        const requestOptions = {
            method: 'DELETE',
        }
        await fetch(`https://web-production-8ce4.up.railway.app/api/user/${loggedUser.id}`, requestOptions)
        localStorage.removeItem('dasiBoard')
        window.location.href = '/find/t'
    }
    return (

        <div className="divUsuarioDMainContainer" style={{ borderColor: `${loggedUser.corP} !important` }}>
            {/* <Navbar page={'usuario'}/> */}
            <ModalCustom cor={loggedUser.corS} />
            <Loading cor={loggedUser.corP}></Loading>
            <div className='divFundoMainContainer' style={{ backgroundImage: `url(${viewingUser.imgFundo})`, backgroundSize: 'cover', backgroundPosition: 'center', borderColor: viewingUser.corP }}>
                <div className='divContainerFundoMainContainer' />
            </div>
            <div className='divUsuarioSubMainContainerD paddingLeft '>
                <div className='divUsuarioComplexContainer' >
                    <div className='divRightMainComplexoContainerCompo' style={{ borderColor: viewingUser.corP }} >
                        <div className='divRightUserInfoCompo' style={{ backgroundImage: `url(${viewingUser.imgFundoDois}`, backgroundSize: 'cover', borderColor: viewingUser.corP }}>
                            <div className='imgUserprofileIcon' style={{ backgroundImage: `url(${viewingUser.icon})`, borderColor: viewingUser.corP }}></div>
                            <h2>{viewingUser.username}</h2>
                            <div className='dataFlex'>
                                <h4>Data de Criação:</h4>
                                <h4>{viewingUser.dataCriacao}</h4>
                            </div>
                            <h1 className='UserPlan'></h1>
                        </div>
                        <div className='divRightSubMainContainerCompo' style={{ borderColor: viewingUser.corP }} >
                            <h3>Contatos</h3>
                            <div>
                                <label className='divUserLinks'>Twitter: <a href={`https://twitter.com/${viewingUser.twitter}`}> @{viewingUser.twitter}</a></label>
                                <label className='divUserLinks'>Instagram: <a href={`https://instagram.com/${viewingUser.instagram}`}> @{viewingUser.instagram}</a></label>
                                <label className='divUserLinks'>Discord: <a> {viewingUser.discord}</a></label>
                                <label className='divUserLinks'>Twitch: <a href={`https://twitch.tv/${viewingUser.twitch}`}> /{viewingUser.twitch}</a></label>
                            </div>
                        </div>
                    </div>
                    <div className='divUsuarioSubMainContainerGeneral' style={{ borderColor: viewingUser.corP }}>
                        <div className='perfilNavigation' style={{ borderColor: viewingUser.corP }}>
                            <div onClick={() => setPage('geral')} className='perfilConfig geral'><div className='imgUsuarioGearEditing visaoImg' />Visão Geral</div>
                            <div onClick={() => setPage('equipe')} className='perfilConfig equipe'><div className='imgUsuarioGearEditing equipesImg' />Equipes</div>
                            <div onClick={() => setPage('torneio')} className='perfilConfig torneio'><div className='imgUsuarioGearEditing torneiosImg' />Torneios</div>
                            <div onClick={() => setPage('config')} className='perfilConfig config'><div className='imgUsuarioGearEditing' />Configurar Perfil</div>
                        </div>
                        <div className='divAllContainersUser' style={{ borderColor: viewingUser.corP }} >
                            <div className='divUsuarioSubMainContainerCompo' style={{ borderColor: viewingUser.corP }} >
                                <div className='divContainerUsuarioContent' style={{ borderColor: viewingUser.corP }} >
                                    <div className='divmdEditor' style={{ borderColor: viewingUser.corP }}>
                                        <MDEditor
                                            className='wrapper'
                                            style={{ borderColor: viewingUser.corP + ' !important', boxShadow: '0px 1px 0px 0px ' + viewingUser.corP }}
                                            visibleDragbar={false}
                                            height={'52.4vh'}
                                            fullscreen={false}
                                            value={value}
                                            onChange={setValue}
                                            preview={'edit'}

                                        />
                                        <div className='editMarkdownButton exitMarkdown' onClick={() => callEditMarkdownEditor('exit')} style={{ borderColor: `${loggedUser.corP}` }}><p>Editar</p></div>
                                    </div>
                                    <div className='divmdViewer' style={{ borderColor: viewingUser.corP }}>
                                        <MDEditor.Markdown className='markdownShower' source={value} style={{ whiteSpace: 'pre-wrap', borderColor: viewingUser.corP }} />
                                        <div className='editMarkdownButton enterMarkdown' onClick={() => callEditMarkdownEditor('enter')} style={{ borderColor: `${loggedUser.corP}` }} ><p>Editar</p></div>
                                    </div>
                                </div>
                                {/* <div className='divConquistaEfavoritos'>
                                    <div className='containerFavoriteListOfUser'>
                                        <h2>Jogos Favoritados</h2>
                                        <div className='favoriteListOfUser'>
                                            { jogo.map( (jogo) => {
                                                for(let i = 0; i < 5;i++){
                                                    if(jogo.id === favoritados[i+1]){
                                                        return  <div key={jogo.id} className='divJogosSubContainer' id={jogo.id}>
                                                                    <div className='divJogosContainer'style={{borderColor: viewingUser.corP}}>
                                                                        <img className='divJogosImg' src={jogo.imgFundo}/>
                                                                        <div>
                                                                            <h5>{jogo.nome}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                    }
                                                }
                                            }) }
                                        </div>
                                    </div>

                                    <div className='containerFavoriteListOfUser'>
                                        <h2>Conquistas</h2>
                                        { torneio.map( (torneio) => 
                                            <div key={torneio.id} className='divJogosSubContainer' id={torneio.id}>
                                                <div className='divJogosContainer' style={{borderColor: viewingUser.corP}}>
                                                    <img className='divJogosImg' src={torneio.thumbnail}/>
                                                    <div>
                                                        <h5>{torneio.nome}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ) }
                                    </div>
                                </div> */}
                            </div>

                            <div className='divEquipesSubMainContainerCompo' >
                                <div className='divContainerTeamsOnUserTab' style={{ borderColor: viewingUser.corP }}>
                                    <h2>Atuando em:</h2>
                                    <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                                        {

                                            time.map((time) => {

                                                for (let i = 0; i < 5; i++) {

                                                    if (JSON.parse(time.equipeAtiva)[i] === viewingUser.id) {
                                                        return <div key={time.id} onClick={() => { window.location.href = '/e/' + time.nome }} className='divTeamsOnUserSubContainer' style={{ borderColor: viewingUser.corP }} id={time.id}>
                                                            <div className='divTeamsOnUserContainer'>
                                                                <img className='divTeamsOnUserImg' src={time.logo} style={{ borderColor: viewingUser.corP, boxShadow: `0px 0px 11px 0px ${viewingUser.corP}` }} />
                                                                <div>
                                                                    <h5>{time.nome}</h5>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    }
                                                }
                                            }
                                            )

                                        }
                                    </div>
                                    <div className='senhaEmailDivider' />
                                    <h2>Reserva em:</h2>
                                    <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                                        {

                                            time.map((time) => {

                                                for (let i = 0; i < 5; i++) {

                                                    if (JSON.parse(time.reserva)[i] === viewingUser.id) {
                                                        return <div key={time.id} onClick={() => { window.location.href = '/e/' + time.nome }} className='divTeamsOnUserSubContainer' style={{ borderColor: viewingUser.corP }} id={time.id}>
                                                            <div className='divTeamsOnUserContainer'>
                                                                <img className='divTeamsOnUserImg' src={time.logo} style={{ borderColor: viewingUser.corP, boxShadow: `0px 0px 11px 0px ${viewingUser.corP}` }} />
                                                                <div>
                                                                    <h5>{time.nome}</h5>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    }
                                                }
                                            }
                                            )

                                        }
                                    </div>
                                    <div className='senhaEmailDivider' />
                                    <h2>Técnico de:</h2>
                                    <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                                        {

                                            time.map((time) => {

                                                for (let i = 0; i < 5; i++) {

                                                    if (JSON.parse(time.comissaoTecnica)[i] === viewingUser.id) {
                                                        return <div key={time.id} onClick={() => { window.location.href = '/e/' + time.nome }} className='divTeamsOnUserSubContainer' style={{ borderColor: viewingUser.corP }} id={time.id}>
                                                            <div className='divTeamsOnUserContainer'>
                                                                <img className='divTeamsOnUserImg' src={time.logo} style={{ borderColor: viewingUser.corP, boxShadow: `0px 0px 11px 0px ${viewingUser.corP}` }} />
                                                                <div>
                                                                    <h5>{time.nome}</h5>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    }
                                                }
                                            }
                                            )

                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='divTorneiosSubMainContainerCompo' style={{ borderColor: viewingUser.corP }}>
                            </div>
                            <div className='divConfigSubMainContainerCompo' style={{ borderColor: viewingUser.corP }}>
                                <div className='divConfigSubMainContainer'>
                                    <div className='divConfigConfigsContainer' style={{ borderColor: viewingUser.corP }}>
                                        <div className='divConfigConfigsSubContainer'>
                                            <h1>Configurar Perfil</h1>

                                            <h2>Informações Gerais</h2>

                                            <div className='divOmgConfigs'>
                                                <div className='divContainerConfigSub'>
                                                    <div className='divContainerConfigSub2'>
                                                        <label className='premiumConfigs'>Icone:</label>
                                                        <div className='divContainerNewImage' style={{ borderColor: viewingUser.corP }}>
                                                            <img className='gearSelectImage' src={require('./components/assets/selecionar100x100.png')} />
                                                            {
                                                                !imgUrl &&
                                                                <div className='outerbar'>
                                                                    <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                                                                </div>
                                                            }
                                                            {
                                                                imgUrl &&

                                                                <img src={imgUrl} alt='uploaded file' className='imgUploaded' style={{ borderColor: viewingUser.corP }} />
                                                            }

                                                            <form className='form' style={{ borderColor: viewingUser.corP }}>
                                                                <input style={{ borderColor: viewingUser.corP, display: 'none' }} onChange={(event) => {
                                                                    handleSubmit(event);
                                                                }} className='inputTypeFile' type='file' accept=".png,.jpeg" />
                                                            </form>
                                                        </div>

                                                    </div>
                                                    <div className='divContainerConfigSub2'>
                                                        <label>Usuário:</label>
                                                        <input style={{ borderColor: viewingUser.corP }} value={username} onChange={(event) => setUsername(event.target.value)} placeholder={loggedUser.username} />
                                                    </div>
                                                </div>
                                            </div>


                                            <div>
                                                <button onClick={() => callMudançasPerfil('IG')} id='buttonChangeSettingsAccount buttonChangeSettingsAccount1' style={{ borderColor: viewingUser.corP }}><p style={{ margin: '0' }}>Confirmar Mudanças</p></button>
                                            </div>

                                            <div className='senhaEmailDivider' />

                                            <div className='divConfigConfigsSubContainer'>
                                                <h2>Segurança da Conta</h2>

                                                <div className='divOmgConfigs'>
                                                    <div className='divContainerConfigSub2'>
                                                        <label>Email: </label>
                                                        <input style={{ borderColor: viewingUser.corP }} value={loggedUser.email} />
                                                    </div>

                                                    <div className='divContainerConfigSub2'>
                                                        <label>Novo Email: </label>
                                                        <input style={{ borderColor: viewingUser.corP }} value={newEmail} onChange={(event) => setnewEmail(event.target.value)} placeholder={loggedUser.email} />
                                                    </div>
                                                </div>

                                                <div className='divOmgConfigs'>
                                                    <div className='divContainerConfigSub2'>
                                                        <label>Senha Atual:</label>
                                                        <input style={{ borderColor: viewingUser.corP }} type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                                                    </div>

                                                    <div className='divContainerConfigSub2'>
                                                        <label>Nova Senha:</label>
                                                        <input style={{ borderColor: viewingUser.corP }} type='password' value={newPassword} onChange={(event) => setnewPassword(event.target.value)} />
                                                    </div>
                                                </div>



                                            </div>
                                            <div>
                                                <button onClick={() => callMudançasPerfil('SC')} id='buttonChangeSettingsAccount buttonChangeSettingsAccount2' style={{ borderColor: viewingUser.corP }}>Confirmar Mudanças</button>
                                            </div>

                                            <div className='senhaEmailDivider' />

                                            <div className='divConfigConfigsSubContainer'>
                                                <h2>Redes Sociais</h2>
                                                <div className='divOmgConfigs'>
                                                    <div className='divContainerConfigSub2'>
                                                        <label>Twitter:</label>
                                                        <input style={{ borderColor: viewingUser.corP }} value={twitter} onChange={(event) => setTwitter(event.target.value)} placeholder={loggedUser.twitter} />
                                                    </div>
                                                    <div className='divContainerConfigSub2'>
                                                        <label>Instagram:</label>
                                                        <input style={{ borderColor: viewingUser.corP }} value={instagram} onChange={(event) => setInstagram(event.target.value)} placeholder={loggedUser.instagram} />

                                                    </div>

                                                    <div className='divContainerConfigSub2'>
                                                        <label>Discord:</label>
                                                        <input style={{ borderColor: viewingUser.corP }} value={discord} onChange={(event) => setDiscord(event.target.value)} placeholder={loggedUser.discord} />

                                                    </div>

                                                    <div className='divContainerConfigSub2'>
                                                        <label>Twitch:</label>
                                                        <input style={{ borderColor: viewingUser.corP }} value={twitch} onChange={(event) => setTwitch(event.target.value)} placeholder={loggedUser.twitch} />

                                                    </div>
                                                </div>


                                            </div>
                                            <div>
                                                <button onClick={() => callMudançasPerfil('RS')} id='buttonChangeSettingsAccount buttonChangeSettingsAccount3' style={{ borderColor: viewingUser.corP }}>Confirmar Mudanças</button>
                                            </div>

                                            <div className='senhaEmailDivider' />

                                            <div className='divConfigConfigsSubContainer premiumConfigs2'>
                                                <h2>Personalização - Premium</h2>
                                                <div className='divOmgConfigs'>
                                                    <div className='divContainerConfigSub4'>
                                                        <label>Cor Principal do perfil e site:</label>
                                                        <ChromePicker
                                                            color={corP}
                                                            onChange={(color) => {
                                                                setCorP(color.hex);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='divContainerConfigSub4'>
                                                        <label>Cor Secundário do perfil: </label>
                                                        <div className="blockpicker">
                                                            {/* Div to display the color  */}

                                                            {/* Block Picker from react-color and handling color on onChange event */}
                                                            <ChromePicker
                                                                className=''
                                                                color={corS}
                                                                onChange={(color) => {
                                                                    setCorS(color.hex);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='divContainerConfigSub4'>
                                                        <label>Imagem atrás do nome - perfil:</label>
                                                        <div className='divContainerNewImage' style={{ borderColor: viewingUser.corP }}>
                                                            <img className='gearSelectImage2' src={require('./components/assets/selecionar450x250.png')} />

                                                            {
                                                                !imgUrl3 &&
                                                                <div className='outerbar'>
                                                                    <div className='innerbar' style={{ width: `${progresspercent3}%` }}>{progresspercent3}%</div>
                                                                </div>
                                                            }
                                                            {
                                                                imgUrl3 &&
                                                                <img src={imgUrl3} alt='uploaded file' className='imgUploaded2' style={{ borderColor: viewingUser.corP, display: 'flex', alignItems: 'center', justifyItems: 'center' }} />
                                                            }
                                                            <form className='form' style={{ borderColor: viewingUser.corP }}>
                                                                <input style={{ borderColor: viewingUser.corP, display: 'none' }} onChange={(event) => {
                                                                    handleSubmitImgFundoDois(event);
                                                                }} className='inputTypeFile' type='file' accept=".png,.jpeg" />
                                                            </form>
                                                        </div>
                                                    </div>

                                                    <div className='divContainerConfigSub4' style={{ flexDirection: 'column' }}>
                                                        <label style={{ width: '15rem', marginRight: '0', }}>Imagem atrás da página - perfil:</label>

                                                        <div className='divContainerNewImage' style={{ borderColor: viewingUser.corP }}>
                                                            <img className='gearSelectImage3' src={require('./components/assets/selecionar1600x250.png')} />
                                                            {
                                                                !imgUrl2 &&
                                                                <div className='outerbar'>
                                                                    <div className='innerbar' style={{ width: `${progresspercent2}%` }}>{progresspercent2}%</div>
                                                                </div>
                                                            }
                                                            {
                                                                imgUrl2 &&
                                                                <img src={imgUrl2} alt='uploaded file' className='imgUploaded3' style={{ borderColor: viewingUser.corP }} />
                                                            }
                                                            <form className='form' style={{ borderColor: viewingUser.corP }}>
                                                                <input style={{ borderColor: viewingUser.corP, display: 'none' }} onChange={(event) => {
                                                                    handleSubmitImgFundo(event);
                                                                }} className='inputTypeFile' type='file' accept=".png,.jpeg, .jpg" />
                                                            </form>
                                                        </div>
                                                    </div>



                                                </div>

                                            </div>
                                            <div id="premiumConfigs2">
                                                <button onClick={() => callMudançasPerfil('PP')} id='buttonChangeSettingsAccount buttonChangeSettingsAccount4 ' style={{ borderColor: viewingUser.corP }}>Confirmar Mudanças</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )


}


export default Usuario