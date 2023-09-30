import React, { useEffect, useState } from 'react'
import { storage } from '../FireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import './index.css';
import Navbar from '../Navbar'
import Footer from '../Footer'
import Integrante from './components/Integrante';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'
import { HiX } from 'react-icons/hi'
import Select from 'react-select'

import ModalCustom, {showModal, closeModal} from '../Modal'

let getUsersTry = 0
let timeObject = {
    nome: null,
    tag: null,
    logo: null,
    imgFundo: null,
    equipeAtiva: [],
    reserva: [],
    comissaoTecnica: [],
    jogoPrincipal: 0,
    conquistas: []
}

function CriarEquipe() {

    const [loggedUser, setLoggedUser] = useState({})
    const [users, setUsers] = useState([])
    const [jogo, setJogo] = useState([])
    const [torneio, setTorneio] = useState([])
    const [time, setTime] = useState([])
    const [name, setName] = useState('')
    const [tag, setTag] = useState('')
    const [desc, setDesc] = useState('')
    const [teamUser, setTeamUser] = useState([])
    const [jogoEscolhido, setjogoEscolhido] = useState(0)


    const [imgUrl, setImgUrl] = useState(null);
    const [imgUrl2, setImgUrl2] = useState(null);
    const [imgUrl3, setImgUrl3] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [progresspercent2, setProgresspercent2] = useState(0);
    const [progresspercent3, setProgresspercent3] = useState(0);

    const handleSubmit = (e) => {
        showModal('spin', `Carregando sua Imagem, aguarde`,false)
        const file = e.target.files[0]
        if (!file) return;
        const storageRef = ref(storage, `logo/${file.name}`);
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
                closeModal('success', 'Imagem foi enviada com sucesso!', 'barLoading')
            })
            }
        )
    }
    
    const handleSubmitImgFundo = (e) => {
        showModal('spin', `Carregando sua Imagem, aguarde`,false)
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
              closeModal('success', 'Imagem foi enviada com sucesso!', 'barLoading')
            })
          }
        )
      }

      const handleSubmitImgFundoDois = (e) => {
        showModal('spin', `Carregando sua Imagem, aguarde`,false)
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
              closeModal('success', 'Imagem foi enviada com sucesso!', 'barLoading')
            })
          }
        )
      }

    const callTorneio = async() => {
        try{
            const response = await fetch('https://web-production-8ce4.up.railway.app/api/torneio')
            const data = response.json()
            data.then(
                (val) => {setTorneio(val.data)})
        }catch(error){
            
        }
    }

    const callGames = async() => {
        try{
            const response = await fetch('https://web-production-8ce4.up.railway.app/api/jogo')
            const data = response.json()
            data.then(
                (val) => {setJogo(val.data)})
        }catch(error){
            
        }
    }

    const callTime = async () => {
        try{
            const responseUser = await fetch('https://web-production-8ce4.up.railway.app/api/time/')
            const dataTime = responseUser.json()

            dataTime.then(
                (val) => {
                    setTime(val.data)
                }
            )   
        }catch(error){
            
        }
    }

    const getUsers = async () => {
        try{
            const responseUser = await fetch('https://web-production-8ce4.up.railway.app/api/user/' + JSON.parse(localStorage.getItem('dasiBoard')))
            const dataUser = responseUser.json()

            const responseUsers = await fetch('https://web-production-8ce4.up.railway.app/api/user/')
            const dataUsers = responseUsers.json()
            dataUsers.then(
                (val) => {
                    setUsers(val.data)
                }
            )
            dataUser.then(
                (val) => {
                    setLoggedUser(val.data)
                }
            )   
        }catch(error){
            
        }
    }
    
    if(getUsersTry < 2){
        if(JSON.parse(localStorage.getItem('dasiBoard')) === null){
            window.location.href = '/userNotFound'
        }
        getUsersTry++
        getUsers()
        callGames()
        callTorneio()
        callTime()
    }


    const jogos = jogo.map((jogo) => {
        return {value: jogo.id, label: jogo.nome}
    })
    const [inputProcurar, setInputProcurar] = useState('')
    const [jogadores, setJogadores] = useState([])

    const handleChange = e => {
        setInputProcurar(e.target.value)
    }

    const addJogador = nomeJogador => {
        let backup = jogadores
        try{
            console.log('1',jogadores)
            setJogadores([...jogadores, users.find(usuario => {return usuario.username === nomeJogador} )])
            console.log('2',jogadores)
        }catch(e){
            console.log('3',jogadores)
            showModal('erro', 'Não foi possível encontrar esse usuário.', 'barLoading')
            console.log(e)
            setJogadores(jogadores)
        }
        
        setInputProcurar('')
    }

    const handleRemove = id => {
        const novaListaJogadores = jogadores.filter((item) => item.id !== id)
        setJogadores(novaListaJogadores)
    }

    const sendEverything = async() => {
        showModal('spin', 'Enviando informações...', 'barLoading')
        if(name.length > 3){
            if(tag.length > 1){
                if(jogadores.length > 0){

                    try{
                        const requestOptions = {
                                method: 'POST',
                                headers: {'Content-type': 'application/json'},
                                body: JSON.stringify({
                                    nome: name,
                                    tag: tag,
                                    logo: imgUrl,
                                    imgFundo: imgUrl2,
                                    equipeAtiva: JSON.stringify(jogadores.map((item) => {return item['id']}).sort()),
                                    reserva: JSON.stringify([]),
                                    comissaoTecnica: JSON.stringify([]),
                                    jogoPrincipal: jogoEscolhido,
                                    conquistas: JSON.stringify([]),
                                    descricao: desc,
                                    imgFundo2: imgUrl3,
                                    dataCriacao: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                                    donoCriacao: loggedUser.username,
                                    capitao: ''
                                })
                                
                        }
                        await fetch('https://web-production-8ce4.up.railway.app/api/time/', requestOptions)
                        closeModal('success', 'Redirecionando...', false)
                        setTimeout(() => {
                            window.location.href = '/e/' + name
                        }, 1000)
                    }catch(error){
                            
                    }
                }else{
                    closeModal('erro', 'Quantia insuficiente de jogadores...', false)
                }
            }else{
                closeModal('erro', 'Tag inválida...', false)
            }
        }else{
            closeModal('erro', 'Nome inválido...', false)
        }
        
    }
    console.log(jogoEscolhido)
    return (
        <div className='mainContainerCriarEquipe'>
            <div className='divCriarEquipe paddingLeft'>
                <ModalCustom></ModalCustom>

                <div className='subDivCriarEquipe'>
                    <div className='divDemoCriarEquipe'>
                        <div className='divFlex'>
                            <div className='divImgThumb divImgDemo'>
                                {/* <img className='gearSelectImage' src={require('./components/assets/selecionar100x100.png')}/> */}
                                <label className='labelImgCriarEquipe'>
                                {
                                    !imgUrl2 &&
                                    <div className='outerbar'>
                                    <div className='innerbar' style={{ width: `100%` }}>Capa {progresspercent2}%</div>
                                    </div>
                                }
                                {
                                    imgUrl2 &&
                                    
                                    <img src={imgUrl2} alt='uploaded file' className='imgUploadedTeam' style={{borderColor: loggedUser.corP}} />
                                }
                                
                                <form className='form' style={{borderColor: loggedUser.corP}}>
                                    <input style={{borderColor: loggedUser.corP, display: 'none'}} onChange={(event) => {handleSubmitImgFundo(event); 
                                        }} className='inputTypeFile' type='file' accept=".png,.jpeg,.jpg"/> 
                                </form>

                                </label>
  
                            </div>
                                {/* <button className='addThumb addButtonCriarEquipe'><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button> */}
                        </div>

                        <div className='divFlexLogo'>
                            <div className='divImgLogo divImgDemo'>
                                <label className='labelImgCriarEquipeLogo'>
                                    {
                                        !imgUrl &&
                                        <div className='outerbar'>
                                        <div className='innerbar' style={{ width: `100%` }}>Logo {progresspercent}%</div>
                                        </div>
                                    }
                                    {
                                        imgUrl &&
                                        
                                        <img src={imgUrl} alt='uploaded file' className='imgUploadedLogo' style={{borderColor: loggedUser.corP}} />
                                    }
                                    
                                    <form className='form' style={{borderColor: loggedUser.corP}}>
                                        <input style={{borderColor: loggedUser.corP, display: 'none'}} onChange={(event) => {handleSubmit(event); 
                                            }} className='inputTypeFile' type='file' accept=".png,.jpeg,.jpg"/> 
                                    </form>

                                </label>
                            </div>
                            {/* <button className='addLogo addButtonCriarEquipe'><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button> */}
                        </div>

                        <div className='divFlex'>
                            <div className='divImgFundo divImgDemo'>
                                <label className='labelImgCriarEquipe'>
                                    {
                                        !imgUrl3 &&
                                        <div className='outerbar'>
                                        <div className='innerbar' style={{ width: `100%` }}>Fundo {progresspercent3}%</div>
                                        </div>
                                    }
                                    {
                                        imgUrl3 &&
                                        
                                        <img src={imgUrl3} alt='uploaded file' className='imgUploadedLogo' style={{borderColor: loggedUser.corP}} />
                                    }
                                    
                                    <form className='form' style={{borderColor: loggedUser.corP}}>
                                        <input style={{borderColor: loggedUser.corP, display: 'none'}} onChange={(event) => {handleSubmitImgFundoDois(event); 
                                            }} className='inputTypeFile' type='file' accept=".png,.jpeg,.jpg"/> 
                                    </form>
                                </label>
                            </div>
                            {/* <button className='addFundo addButtonCriarEquipe'><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button> */}
                        </div>
                    </div>

                    <div className='infoContainer'>
                        <div className='divDescCriarEquipe'>
                            <input value={name} onChange={event => {setName(event.target.value)}}  className='inputProcurarJogador' placeholder='Nome da equipe...'/>
                            <input value={tag} style={{marginTop: '10px'}} onChange={event => {setTag(event.target.value)}}  className='inputProcurarJogador' placeholder='Tag da equipe...'/>
                            <textarea value={desc} onChange={event => {setDesc(event.target.value)}}  className='textareaEquipeDescricao' placeholder='Descrição da equipe...'/>
                            <Select onChange={e => setjogoEscolhido(e.value)} className='selectInfoCriarEquipe' options={jogos}  placeholder='Jogos'/>
                            <button className='buttonConfirmarCriarEquipe' onClick={() => sendEverything()}>Confirmar <AiOutlineCheck style={{fontSize: '25px', marginLeft: '.5rem', color: '#fc6b03', backgroundColor: 'transparent'}}/></button>
                        </div>

                        <div className='divInfoCriarEquipe'>
            
                            <div className='inputButtonFlex'>
                                <input 
                                    className='inputProcurarJogador' 
                                    placeholder='Adicionar jogador...'
                                    onChange={handleChange}
                                    value={inputProcurar}/>
                                <button 
                                    className='addJogador addButtonCriarEquipe'
                                    onClick={() => addJogador(inputProcurar)}><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button>
                            </div>
                            <div className='divMostrarJogadores'>
                                    {jogadores.map((item) => (
                                        <div className='cardBody' key={item.id}>
                                            <div className='userIcon' style={{backgroundPosition: 'center', backgroundSize: 'cover',backgroundImage: `url(${item.icon})`}}/>
                                            <span className='userName'><a href='#'>{item.username}</a></span>
                                            <button 
                                                className='buttonRemoveJogador'
                                                onClick={() => handleRemove(item.id)}><HiX style={{fontSize: '20px', color: '#fc6b03'}}/></button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default CriarEquipe