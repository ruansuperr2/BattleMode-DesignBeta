
import './perfil.css'
import SettingsIcon from '@mui/icons-material/Settings';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React, { useState, useEffect, useRef } from 'react';

const molduras = [
    'helmet',
    'helmet2',
    'magic',
    'rose',
    'roses',
    'simple',
    'sword'
]

export default function Perfil(props) {
    const [modal, setModal] = useState(false);
    const [showTeam, setShowTeam] = useState('none')
    const [timesDoUsuario, setTimesDoUsuario] = useState([]);
    const [torneiosDoUsuario, setTorneiosDoUsuario] = useState([]);
    const [showTor, setShowTor] = useState('none')
    const [page, setPage] = useState('perfil')
    const [currentMoldura ,setCurrentMoldura] = useState('')

    const closeModal = () => {
        setModal(false);
    };

    const [modalMolduras, setModalMolduras] = useState(false);



    useEffect(() => {
        // Encontrar os times que o usuário participa
        const meusTimes = props.times.filter((time) => {
            return time && JSON.parse(time.equipeAtiva).includes(props.loggedUser.id);
        });

        // Filtrar os torneios pelos times do usuário
        const torneiosDoUsuario = props.torneio.filter((torneio) => {
            return torneio && meusTimes.some((time) => {
                return JSON.parse(torneio.participantes).includes(time.id);
            });
        });


        // Atualizar o estado com os torneios do usuário
        setTorneiosDoUsuario(torneiosDoUsuario);
        setTimesDoUsuario(meusTimes);
        setCurrentMoldura(props.loggedUser.moldura)
    }, [props.times, props.loggedUser, props.torneio]);


    return (
        <div className='perfilDivSection'>
            {modal && (
                <div className='perfilModal'>
                    <div className="divModalSubBody">
                        <div className="divModalWindow">
                            <label>Editar Perfil</label>
                            <button onClick={closeModal}>Fechar</button>
                        </div>
                        <div className='divMainBodyPerfil' style={{ backgroundImage: `url(${props.loggedUser.imgFundo})` }}>
                            <div className='userProfileBanner' style={{
                                borderRight: `${props.loggedUser.corP} solid 1px`
                            }} >
                                <div>
                                    <div className='userProfileIcon userProfileBModal' onClick={() => setModalMolduras(true)}>
                                        <div className="userProfileIModal">

                                            <InsertPhotoIcon className="userProfileIPI"></InsertPhotoIcon>
                                        </div>
                                        <img src={require(`../../../../assets/images/borders/${props.loggedUser.moldura}_border.png`)} alt=""></img>
                                        <video poster={props.loggedUser.icon} src={props.loggedUser.icon}></video>
                                    </div>
                                    <label>
                                        {props.loggedUser.username}
                                    </label>
                                    <p>
                                        Velocidade Máxima
                                    </p>
                                </div>
                                <div className='trimProfileBanner'>
                                    <label>{props.loggedUser.status}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modalMolduras && (
                <div className='perfilModalMolduras'>
                    <div className="divModalSubBody">
                        <div className="divModalWindow">
                            <label>Editar Moldura</label>
                        </div>
                        <div className='divMainBodyModify' style={{ backgroundColor: '#111111'}}>
                            <div className='userProfileBanner' style={{
                                borderRight: `${props.loggedUser.corP} solid 1px`
                            }} >
                                <div>
                                    <div className='userProfileIcon'>
                                        <div className="userProfileIModal" onClick={() => { }}>

                                            <InsertPhotoIcon className="userProfileIPI"></InsertPhotoIcon>
                                        </div>
                                        <img src={require(`../../../../assets/images/borders/${currentMoldura}_border.png`)} alt=""></img>
                                        <video poster={props.loggedUser.icon} src={props.loggedUser.icon}></video>
                                    </div>
                                    <label>
                                        {props.loggedUser.username}
                                    </label>
                                    <p>
                                        Velocidade Máxima
                                    </p>
                                </div>
                                <div className='trimProfileEditBanner'>
                                    <button onClick={() => setModalMolduras(false)}>Salvar Alterações</button>
                                </div>
                            </div>
                            <div className="divMainMolduras">
                                {molduras.map((moldura) => {
                                    return (
                                        <div className="divMoldurasSelect" id={moldura} onClick={() => setCurrentMoldura(moldura)}>
                                            <img src={require(`../../../../assets/images/borders/${moldura}_border.png`)} alt={moldura}></img>
                                            <video poster={props.loggedUser.icon} src={props.loggedUser.icon}></video>
                                        </div>
                                    )
                                }) }
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='perfilNavbar'>
                <label>Perfil</label>
                <label>Equipes</label>
                <label>Torneios</label>
                <label>Amigos</label>
                <label>Conquistas</label>

                <div className="perfilNavbarSettings" onClick={() => setModal(true)}>
                    <SettingsIcon></SettingsIcon>
                </div>
            </div>
            {

            }
            <div className='divMainBodyPerfil' style={{ backgroundImage: `url(${props.loggedUser.imgFundo})` }}>
                <div className='userProfileBanner' style={{
                    borderRight: `${props.loggedUser.corP} solid 1px`
                }} >
                    <div>
                        <div className='userProfileIcon'>
                            <img src={require(`../../../../assets/images/borders/${props.loggedUser.moldura}_border.png`)} alt=""></img>
                            <video poster={props.loggedUser.icon} src={props.loggedUser.icon}></video>
                        </div>
                        <label>
                            {props.loggedUser.username}
                        </label>
                        <p>
                            Velocidade Máxima
                        </p>
                    </div>
                    <div className='trimProfileBanner'>
                        <label>{props.loggedUser.status}</label>
                    </div>
                </div>

                <div className="divTopTeam">
                    {timesDoUsuario.map((time) => (
                        <div className="divTopSubContainerTeam" key={time.id}>
                            <div className='hiddenInfoTop' style={{ display: showTeam }}>
                                <video src={time.logo} poster={time.logo}></video>
                                <h3>{time.nome}</h3>
                                <label>{time.tag}</label>
                            </div>
                            <div className="openInfoVideo" id="openInfoVideo" onMouseEnter={() => { setShowTeam('flex') }} onMouseLeave={() => { setShowTeam('none') }}>
                                <video src={time.imgFundo} poster={time.imgFundo}></video>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="divTopConquista">
                    {torneiosDoUsuario.map((torneio) => (
                        <div className="divTopSubContainerConq" key={torneio.id}>
                            <div className='hiddenInfoConq' style={{ display: showTor }}>
                                <video src={torneio.logo} poster={torneio.logo}></video>
                                <h3>{torneio.nome}</h3>
                                <label>1º Lugar</label>
                            </div>
                            <div className="openInfoVideo" id="openInfoVideo" onMouseEnter={() => { setShowTor('flex') }} onMouseLeave={() => { setShowTor('none') }}>
                                <video src={torneio.imgFundo} poster={torneio.imgFundo}></video>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="divQuantiaAmigos">
                </div>
            </div>
        </div>
    )
}