import './perfil.css'
import SettingsIcon from '@mui/icons-material/Settings';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React, { useState, useEffect } from 'react';
import Resizer from "react-image-file-resizer";

const molduras = [
    'theShadowOfLight',
    'shadows',
    'excalibur',
    'deathscalibur',
    'deathBringer',
    'style',
    'royal',
    'windy',
    'helmet',
    'helmet2',
    'magic',
    'rose',
    'roses',
    'simple',
    'sword',
    'night'
]

const titulos = [
    "Novato",
    "Campeão",
    "Herói",
    "Defensor",
    "Mestre",
    "Vencedor",
    "Imortal",
    "Iluminado",
    "Ascendente",
    "Celestial",
    "Deuses",
    "Campeão mundial",
    "Pole position",
    "Volta mais rápida",
    "Vencedor de corrida",
    "Piloto do ano",
    "Rei",
    "Rainha",
    "Príncipe",
    "Princesa",
    "Mago",
    "Bruxa",
    "Guerreiro",
    "Arqueiro",
    "Ladra",
    "Jogador de RPG",
    "Heroi",
    "Vilão",
    "Mistério",
    "Lenda",
    "Campeão do Major",
    "Terrorista Perfeito",
    "Contra-Terrorista Invencível",
    "Mestre da Espingarda",
    "Herói de Runeterra",
    "Defensor do Nexus",
    "Mestre das Runas",
    "Vencedor do Destino",
    "Campeão do Grande Prêmio",
    "Herói do Covenant",
    "Guardião da Terra",
    "Mestre do Halo",
    "Profeta do Manto",
    "O Caçador de Dragões",
    "A Princesa Guerreira",
    "O Guardião da Floresta",
    "O Mago do Tempo",
    "A Bruxa dos Ventos",
    "O Alienígena do Espaço",
    "O Robô Rebelde",
    "O Animal Mágico",
    "O Objeto Precioso",
    "O Herói Solitário",
    "A Princesa Desaparecida",
    "O Vilão Cruel",
    "O Mago Maligno",
    "A Bruxa Traiçoeira",
    "O Alienígena Agressivo",
    "O Robô Destrutivo",
    "O Animal Feroz",
    "O Objeto Amaldiçoado",
    "O Herói Resistente",
    "A Princesa Destemida",
    "O Vilão Poderoso",
    "O Mago Imortal",
    "A Bruxa Sábia",
    "O Alienígena Inteligente",
    "O Robô Esperto",
    "O Animal Criativo",
    "O Objeto Útil",
    "O Herói Invencível",
    "A Princesa Imortal",
    "O Vilão Irresistível",
    "O Mago Supremo",
    "A Bruxa Divina",
    "O Alienígena Único",
    "O Robô Perfeito",
    "O Animal Maravilhoso",
    "O Objeto Preciosíssimo",
    "O Herói Inesquecível",
    "A Princesa Eterna",
    "O Vilão Inevitável",
    "O Mago Onipotente",
    "A Bruxa Onipresente",
    "O Alienígena Inimaginável",
    "O Robô Insubstituível",
    "O Animal Incomparável",
    "O Objeto Inestimável",
    "O Herói Legendário",
    "A Princesa Inofensiva",
    "O Vilão Inofensivo",
    "O Mago Inofensivo",
    "A Bruxa Inoffensiva",
    "O Alienígena Inofensivo",
    "O Robô Inofensivo",
    "O Animal Inofensivo",
    "O Objeto Inofensivo",
    "O Herói Invisível",
    "A Princesa Invisível",
    "O Vilão Invisível",
    "O Mago Invisível",
    "A Bruxa Invisível",
    "O Alienígena Invisível",
    "O Robô Invisível",
    "O Animal Invisível",
    "O Objeto Invisível",
    "O Herói Imortal",
    "A Princesa Imortal",
    "O Vilão Imortal",
    "O Mago Imortal",
    "A Bruxa Imortal",
    "O Alienígena Imortal",
    "O Robô Imortal",
    "O Animal Imortal",
    "O Objeto Imortal",
    "O Vilão Redimido"
]
export default function Perfil(props) {
    const [modal, setModal] = useState(false);
    const [showTeam, setShowTeam] = useState('none')
    const [timesDoUsuario, setTimesDoUsuario] = useState([]);
    const [torneiosDoUsuario, setTorneiosDoUsuario] = useState([]);
    const [showTor, setShowTor] = useState('none')
    const [page, setPage] = useState('perfil')

    const [currentImage, setCurrentImage] = useState('')

    const [currentMoldura, setCurrentMoldura] = useState('')

    const [titulosObj, setTitulosObj] = useState([])
    const [tituloNew, setTituloNew] = useState('')

    const [loggedUsername, setLoggedUsername] = useState(props.loggedUser.username)

    const [imageIcon, setImageIcon] = useState(props.loggedUser.icon);
    const [imageFundo, setImageFundo] = useState(props.loggedUser.imgFundo);


    const closeModal = () => {
        setModal(false);
    };

    const [modalMolduras, setModalMolduras] = useState(false);
    const [modalFundo, setModalFundo] = useState(false);



    useEffect(() => {
        setTitulosObj(titulos.map((titulo) => ({
            value: titulo,
            label: titulo,
        })))
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
        setCurrentImage(props.loggedUser.imgFundo)

        setTituloNew(props.loggedUser.titulo)
    }, [props.times, props.loggedUser, props.torneio]);

    useEffect(() => {
        if (props.statusFetch === "YES") {
            props.setstatusFetch('NO')
            setModalMolduras(false)
            setModalFundo(false)
        } else if (props.statusFetch === "ERROR") {
            props.setstatusFetch("NO")
        }
    })


    const handleImageChangeFundo = (e) => {
        props.setstatusFetch('Handling Image Change')
        if (e.target !== "") {

            if (e.target.files[0].size > 15097152) {
                alert("Essa imagem é maior que 15MB");
                props.setstatusFetch('ERROR')

                e.target = "";
            } else {
                let fileExtension = e.target.files[0].name.split('.').pop();
                let newFile = new File([e.target.files[0]], props.loggedUser.username + '_fundo.' + fileExtension, {type: e.target.files[0].type});
               
                Resizer.imageFileResizer(
                    newFile,
                    1381,
                    1005,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        setImageFundo(uri);
                    },
                    "file"
                
                );
                props.setstatusFetch('Após o upload dessa imagem.')

            };
        } else {
            setImageFundo(props.loggedUser.imgFundo)
        }

    }

    const handleImageChange = async(e) => {
        props.setstatusFetch('Handling Image Change')
        if (e.target !== "") {

            if (e.target.files[0].size > 4597152) {
                alert("Essa imagem é maior que 4.5MB");
                props.setstatusFetch('ERROR')

                e.target = "";
            } else {
                let fileExtension = e.target.files[0].name.split('.').pop();
                let newFile = new File([e.target.files[0]], props.loggedUser.username + '_icon.' + fileExtension, {type: e.target.files[0].type});
               
                Resizer.imageFileResizer(
                    newFile,
                    256,
                    256,
                    "JPEG",
                    80,
                    0,
                    (uri) => {
                        setImageIcon(uri);
                    },
                    "file"
                
                );
                props.setstatusFetch('Confirm Changes')

            };
        } else {
            setImageIcon(props.loggedUser.icon)
        }

    }

    return (
        <div className='perfilDivSection'>
            {modal && (
                <div className='perfilModal'>
                    <div className="divModalSubBody">
                        <div className="divModalWindow">
                            <label>Editar Perfil</label>
                            <button onClick={closeModal}>Fechar</button>
                        </div>
                        <div className='divMainBodyPerfil' style={{ backgroundColor: "#151515" }}>
                            {props.loggedUser.imgFundo === currentImage &&
                                <video className='videoPosterPerfil' poster={props.loggedUser.imgFundo} src={props.loggedUser.imgFundo}></video>
                            }

                            <div className='userProfileBanner' style={{
                                borderRight: `${props.loggedUser.corP} solid 1px`
                            }} >
                                <div>
                                    <div className="userProfileIModal" onClick={() => setModalMolduras(true)}>

                                        <InsertPhotoIcon className="userProfileIPI"></InsertPhotoIcon>
                                        <h2 className='userProfileh2'>Editar Banner</h2>
                                    </div>
                                    <div className='userProfileIcon userProfileBModal' >
                                        <img src={require(`../../../../assets/images/borders/${props.loggedUser.moldura}_border.png`)} alt=""></img>
                                        <video poster={props.loggedUser.icon} src={props.loggedUser.icon}></video>
                                    </div>
                                    <label>
                                        {props.loggedUser.username}
                                    </label>
                                    <p>
                                        {props.loggedUser.titulo}
                                    </p>
                                </div>
                                <div className='trimProfileBanner'>
                                    <label>{props.loggedUser.status}</label>
                                </div>
                            </div>
                            <div>
                                <label className="userProfileIModalBackground" onClick={() => setModalFundo(true)}>

                                    <InsertPhotoIcon className="userBackgroundIPI"></InsertPhotoIcon>
                                    <h2 className='userBackgroundh2'>Editar Plano de Fundo</h2>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modalFundo && (
                <div className='perfilModalFundo'>
                    <div className="divModalFundoBody">
                        <div className='divModalFundoModify'>
                            {!props.loggedUser.imgFundo !== imageFundo &&
                                <video className='videoPosterPerfil' poster={props.loggedUser.imgFundo} src={props.loggedUser.imgFundo}></video>
                            }
                            {props.loggedUser.imgFundo !== imageFundo &&
                                <video className='videoPosterPerfil' poster={URL.createObjectURL(imageFundo)} src={URL.createObjectURL(imageFundo)}></video>
                            }
                            <div className='userProfileBanner' style={{
                                borderRight: `${props.loggedUser.corP} solid 1px`
                            }} >
                                <div>

                                </div>
                                <div className='trimProfileEditFundo'>
                                    {props.statusFetch !== 'NO' &&
                                        <div className='propsStatus'>
                                            {props.statusFetch}
                                        </div>
                                    }
                                    {imageFundo !== '' &&
                                        <div>
                                            <button className='buttonConfirmChangesFundo' onClick={() => { props.salvarPerfilFundo(imageFundo); }}>Salvar Alterações</button>
                                        </div>
                                    }
                                    <button className='buttonDenyChangesFundo' onClick={() => { setModalFundo(false) }}>Descartar Alterações</button>

                                </div>
                            </div>
                            <div className='userProfileFundo'>


                                <input id="userPFE" className='userProfileInputEnviar' accept="image/png, image/jpeg, video/mp4" type="file" onChange={handleImageChangeFundo} >
                                </input>
                                <label htmlFor="userPFE" className="userProfileIModalBackground">

                                    <InsertPhotoIcon className="userBackgroundIPI"></InsertPhotoIcon>
                                    <h2 className='userBackgroundh2'>Trocar Imagem</h2>
                                </label>

                            </div>
                        </div>
                    </div>
                </div>
            )
            }


            {modalMolduras && (
                <div className='perfilModalMolduras'>
                    <div className="divModalSubBody">
                        <div className="divModalWindow">
                            <label>Editar Banner</label>
                        </div>
                        <div className='divMainBodyModify' style={{ backgroundColor: '#111111' }}>
                            <div className='userProfileBanner' style={{
                                borderRight: `${props.loggedUser.corP} solid 1px`
                            }} >
                                <div>
                                    <div className='userProfileIcon'>


                                        <input id="userPIE" className='userProfileInputEnviar' accept="image/png, image/jpeg, video/mp4" type="file" onChange={handleImageChange} >
                                        </input>
                                        <label htmlFor="userPIE" className="userProfileIModal2" onClick={() => { }}>

                                            <InsertPhotoIcon className="userProfileIPI"></InsertPhotoIcon>
                                        </label>
                                        <img className='molduraChangeIcon' src={require(`../../../../assets/images/borders/${currentMoldura}_border.png`)} alt=""></img>
                                        {!imageIcon !== props.loggedUser.icon &&
                                            <video className='divMoldurasSelectIcon' poster={imageIcon} src={imageIcon}></video>

                                        }

                                        {imageIcon !== props.loggedUser.icon &&
                                            <video className='divMoldurasSelectIcon' poster={URL.createObjectURL(imageIcon)} src={URL.createObjectURL(imageIcon)}></video>

                                        }
                                    </div>
                                    <input value={loggedUsername} onChange={(e) => setLoggedUsername(e.target.value)} placeholder={props.loggedUser.username}>

                                    </input>
                                    <h3 className='ChangeSelect'>
                                        <select value={tituloNew} onChange={(e) => { setTituloNew(e.target.value); console.log(tituloNew); console.log(e) }} className="selectPerfil" placeholder={props.loggedUser.titulo} >
                                            {titulos && titulos.map((titulo, index) => {
                                                return (
                                                    <option key={index} value={titulo}>{titulo}</option>
                                                )
                                            })

                                            }
                                        </select>
                                    </h3>
                                </div>
                                <div className='trimProfileEditBanner'>
                                    {props.statusFetch !== 'NO' &&
                                        <div className='propsStatus'>
                                            {props.statusFetch}
                                        </div>
                                    }
                                    {loggedUsername.match(/^[a-zA-Z0-9]{4,16}$/) &&
                                        <div>
                                            <button className='buttonConfirmChanges' onClick={() => { props.salvarPerfilMoldura(currentMoldura, tituloNew, loggedUsername, imageIcon); }}>Salvar Alterações</button>
                                        </div>
                                    }
                                    {!loggedUsername.match(/^[a-zA-Z0-9]{4,16}$/) &&
                                        <div>
                                            <label className='trimProfileEditInvalid'>Nome indisponível/inválido</label>
                                        </div>
                                    }
                                    <button className='buttonDenyChanges' onClick={() => { setModalMolduras(false) }}>Descartar Alterações</button>

                                </div>
                            </div>
                            <div className="divMainMolduras">
                                {molduras.map((moldura) => {
                                    return (
                                        <div className="divMoldurasSelect" id={moldura} onClick={() => setCurrentMoldura(moldura)}>
                                            <img src={require(`../../../../assets/images/borders/${moldura}_border.png`)} alt={moldura}></img>
                                            {/* <video poster={props.loggedUser.icon} src={props.loggedUser.icon}></video> */}
                                            <label>{moldura}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            <div className='perfilNavbar'>
                <label onClick={() => setPage('perfil')}>Perfil</label>
                <label onClick={() => setPage('equipes')}>Equipes</label>
                <label onClick={() => setPage('torneios')}>Torneios</label>
                <label onClick={() => setPage('amigos')}>Amigos</label>
                <label onClick={() => setPage('conquistas')}>Conquistas</label>

                <div className="perfilNavbarSettings" onClick={() => setModal(true)}>
                    <SettingsIcon></SettingsIcon>
                </div>
            </div>
            {page === 'perfil' &&

                <div className='divMainBodyPerfil'>
                    {props.loggedUser.imgFundo === currentImage &&
                        <video className='videoPosterPerfil' poster={props.loggedUser.imgFundo} src={props.loggedUser.imgFundo}></video>
                    }
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
                                {props.loggedUser.titulo}
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
            }
            {page === 'equipes' &&
                <div>

                </div>
            }
            {page === 'torneios' &&
                <div>

                </div>
            }
            {page === 'amigos' &&
                <div>

                </div>
            }
            {page === 'conquistas' &&
                <div>

                </div>
            }
        </div >
    )
}