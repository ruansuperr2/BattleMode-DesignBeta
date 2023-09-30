import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import ModalCustom from '../Modal';
import { showModal, closeModal} from "../Modal";
import './index.css';
import { useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import Select from 'react-select'

import Delayed from './components/delay';
import Loading from '../Loading'

import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { HiX } from 'react-icons/hi'
import { AiOutlineCheck, AiOutlinePlus, AiFillCrown } from 'react-icons/ai'
import {SiEdotleclerc} from 'react-icons/si'
import $ from 'jquery'

import { storage } from '../FireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"; 


let fed = false

let callTeamFunction = 0
let deadOrAlive = false

let detectPositionActive = -1
let detectPositionReserve = 0
let detectPositionCT = 0

function Participar() {
    const { id } = useParams();
    const [loggedUser, setLoggedUser] = useState({})
    const [users, setUsers] = useState([])
    const [time, setTime] = useState([])
    const [jogo, setJogo] = useState([])
    const [torneio, setTorneio] = useState(null)

    const [imgUrl, setImgUrl] = useState(null);
    const [imgUrl2, setImgUrl2] = useState(null);
    const [imgUrl3, setImgUrl3] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [progresspercent2, setProgresspercent2] = useState(0);

    const [TimeEscolhido,setTimeEscolhido] = useState(null)

    const [nome, setNome] = useState('')
    const [desc, setDesc] = useState('')
    const [descB, setDescB] = useState('')


    const [progresspercent3, setProgresspercent3] = useState(0);

    const [page, setPage] = useState('geral')

    const callModal = () => {
        document.querySelector('.newModal3').style.display = 'flex'
        document.querySelector('body').style.overflowY = 'hidden'

    }


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
    
                dataUser.then(
                    (val) => {
                        setLoggedUser(val.data)
                    }
                )   
    
                const responseUser2 = await fetch('https://web-production-8ce4.up.railway.app/api/user/')
                const dataUser2 = responseUser2.json()
    
                dataUser2.then(
                    (val) => {
                        setUsers(val.data)
                    }
                )   
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

        const callTorneios = async() => {
            try{
                const response = await fetch('https://web-production-8ce4.up.railway.app/api/torneio/' + id)
                const data = response.json()
                data.then(
                    (val) => {setTorneio(val.data)})
            }catch(error){
                
            }
        }
    
        if(callTeamFunction < 2){
            callTeamFunction++
            callTime()
            getUsers()
            callGames()
            callTorneios()
        }

        useEffect(() => {


            switch(page){
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

    const callEditMarkdownEditor = async(type) =>{
        if(type === 'enter'){
            document.querySelectorAll('.divmdEditor')[0].style.display = 'block'
            document.querySelectorAll('.divmdEditor')[1].style.display = 'block'
            document.querySelectorAll('.divmdViewer')[0].style.display = 'none'
            document.querySelectorAll('.divmdViewer')[1].style.display = 'none'
        }else{
            document.querySelectorAll('.divmdEditor')[0].style.display = 'none'
            document.querySelectorAll('.divmdViewer')[0].style.display = 'block'
            document.querySelectorAll('.divmdEditor')[1].style.display = 'none'
            document.querySelectorAll('.divmdViewer')[1].style.display = 'block'

            showModal('loading','Atualizando o Banco','barLoading')
                    
            try{
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        nome: torneio.nome,
                        logo: torneio.imgUrl,
                        descricaoLonga: desc,
                        descricaoBreve: descB,
                        thumbnail: torneio.imgUrl2,
                        imgFundo: torneio.imgUrl3,
                        participantes: torneio.participantes,
                        gameId: torneio.gameId,
                        chave: torneio.chave,
                        quantiaParticipantes: torneio.quantiaParticipantes,
                        donoCriacao: torneio.donoCriacao,
                        admins: torneio.admins
                    })
                    
                }
                closeModal('success', 'atualizado!',null)
                await fetch('https://web-production-8ce4.up.railway.app/api/torneio/' + torneio.id,  requestOptions)
                }catch(e){
                }
        }
    }

    const makeEverythingWork = () => {
        setImgUrl(torneio.logo)
        setImgUrl2(torneio.thumbnail)
        setImgUrl3(torneio.imgFundo)
        setDesc(torneio.descricaoLonga)
        setDescB(torneio.descricaoBreve)

        if(loggedUser.username === torneio.donoCriacao){
            document.querySelector('.adminStartTourneament').style.display = 'block'
            document.querySelector('.config').style.display = 'flex'
            document.querySelector('.playerPartTourneament').style.display = 'none'
            document.querySelectorAll('.divmdEditor')[0].style.display = 'none'
            document.querySelectorAll('.divmdEditor')[1].style.display = 'none'
            document.querySelectorAll('.enterMarkdown')[0].style.display = 'flex'
            document.querySelectorAll('.enterMarkdown')[1].style.display = 'flex'
            document.querySelector('.enterMarkdown').style.display = 'flex'
        }else{
            document.querySelectorAll('.divmdEditor')[0].style.display = 'none'
            document.querySelectorAll('.divmdEditor')[1].style.display = 'none'
            document.querySelectorAll('.enterMarkdown')[0].style.display = 'none'
            document.querySelectorAll('.enterMarkdown')[1].style.display = 'none'
            document.querySelector('.config').style.display = 'none'     
        }
        deadOrAlive = true
    }  
    if(deadOrAlive === false){
        setTimeout(() => {
            makeEverythingWork()
        }, 2500);
    }

    const callMudançasPerfil = async(status) => {
        switch(status){
            case 'IG':
                showModal('loading','Atualizando o Banco','barLoading')
                    
                try{
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({
                            nome: nome,
                            logo: imgUrl,
                            descricaoLonga: torneio.descricaoLonga,
                            descricaoBreve: torneio.descricaoBreve,
                            thumbnail: torneio.imgUrl2,
                            imgFundo: torneio.imgUrl3,
                            participantes: torneio.participantes,
                            gameId: torneio.gameId,
                            chave: torneio.chave,
                            quantiaParticipantes: torneio.quantiaParticipantes,
                            donoCriacao: torneio.donoCriacao,
                            admins: torneio.admins
                        })
                        
                    }
                    closeModal('success', 'atualizado!',null)
                    await fetch('https://web-production-8ce4.up.railway.app/api/torneio/' + torneio.id,  requestOptions)
                    window.location.href = '/t/' + torneio.id 
                    }catch(e){
                    }
                break
            case 'PP':
                showModal('loading','Atualizando o Banco','barLoading')
                    
                try{
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({
                            nome: nome,
                            logo: imgUrl,
                            descricaoLonga: torneio.descricaoLonga,
                            descricaoBreve: torneio.descricaoBreve,
                            thumbnail: torneio.imgUrl2,
                            imgFundo: torneio.imgUrl3,
                            participantes: torneio.participantes,
                            gameId: torneio.gameId,
                            chave: torneio.chave,
                            quantiaParticipantes: torneio.quantiaParticipantes,
                            donoCriacao: torneio.donoCriacao,
                            admins: torneio.admins
                        })
                        
                    }
                    closeModal('success', 'atualizado!',null)
                    await fetch('https://web-production-8ce4.up.railway.app/api/torneio/' + torneio.id,  requestOptions)
                    window.location.href = '/t/' + torneio.id
                    }catch(e){
                        
                    }
                break
        }
    }

    const apagarEquipe = async() => { 
        const requestOptions = {
            method: 'DELETE',
        }
        await fetch(`https://web-production-8ce4.up.railway.app/api/torneio/${torneio.id}`,  requestOptions)
        window.location.href = '/now'
    }
    return (
    
        <div className='divParticiparMainContainer'>
        <ModalCustom/>
        <Loading/>
        <div className="newModal3" style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems:'center',position: 'fixed', zIndex: '184', overflow: 'hidden',display: 'none', backgroundColor: '#00000066', width: '100vw', height: '101vh', marginTop: '-80px'}}>
                <div style={{border: '1px solid #fc6b03', position: 'fixed', backgroundColor: '#121212',width: '40%', borderRadius: 20, marginTop: '-150px'}}>
                    <div style={{paddingLeft: '30px',paddingRight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 style={{color: 'white'}}>Com qual time você deseja participar?</h2>
                        <div style={{borderRadius: '5px', color: 'black',width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f05e54', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold'}} onClick={() => {document.querySelector('.newModal3').style.display = 'none'
                        document.querySelector('body').style.overflowY = 'scroll'

                    }}>X</div>
                    </div>
                    <hr/>
                    <div>
                        <div>
                            <div className='inputButtonFlex'>
                                {
                                                                                

                                    time.map( (times) => {
                                        for(let i = 0; i < 5;i++){

                                            if(JSON.parse(times.equipeAtiva)[i] === loggedUser.id){
                                                let values = time.map((time) => {
                                                    if(JSON.parse(times.equipeAtiva)[i] === loggedUser.id){

                                                        return {value: time.id, label: time.nome}
                                                    }
                                                })
                                                return <Select onChange={e => setTimeEscolhido(e.value)} className='selectInfoCriarEquipe' style={{zIndex: '424'}} options={values}  placeholder='Seu Time'/>


                                            }
                                        }
                                    }
                                    ) 
                            
                                                                            
                                }
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className='buttonFromModal'  onClick={() => {}}>Confirmar participação</button>
                    </div>
                </div>
            </div>
            {
            torneio &&
                <div className='divFundoMainContainer' style={{backgroundImage: `url(${torneio.imgFundo})`, backgroundSize: 'cover', backgroundPosition: 'center',}}>
                    <div className='divContainerFundoMainContainer'/>
                </div>
            }
            <div className='divUsuarioSubMainContainerD paddingLeft '>
                <div className='divUsuarioComplexContainer divEquipeComplexContainer' >
                    <div className='divRightMainComplexoContainerCompo' style={{}} >
                        
                            {
                                torneio &&
                                <div className='divRightUserInfoCompo'>
                                    <div className='imgUserprofileIcon' style={{backgroundImage: `url(${torneio.logo})`, backgroundColor: '#121212'}}></div>
                                    <h4 style={{marginTop: '25px'}}>{torneio.nome}</h4>
                                </div>
                            }
                            
                        <div>
                            <div className='divRightSubMainContainerCompo' >
                                <h2>Jogo</h2>
                                { torneio &&
                                    jogo.map((jogo) => {
                                        if(jogo.id === parseInt(torneio.gameId)){
                                            return <label style={{textAlign: 'center', display: 'flex', alignItems: 'center'}}><img style={{marginRight: '10px'}} width={50} height={50} src={jogo.logo}/>{jogo.nome}</label>

                                        }
                                    })
                                }
                                
                                
                            </div>
                            <div className='divRightSubMainContainerCompo' >
                                <h2>Administradores</h2>
                                {torneio &&
                                    users.map((user) => {
                                        
                                        if(user.username === torneio.donoCriacao){
                                            return <div style={{width: '80%'}}>
                                                        <label className='criador' onClick={() => window.location.href = '/u/' + user.username} style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'no-wrap', flexDirection: 'row'}}>
                                                            <img style={{marginRight: '10px', borderRadius: 50, border: '1px solid' + user.corP,backgroundColor: '#121212'}} width={37} height={37} src={user.icon}/>
                                                            <label>Criado por <SiEdotleclerc sx={{fontSize: "2vh", color: "#fc6b03"}}/> {user.username}</label>
                                                        </label>

                                                    </div>

                                        }
                                        
                                    })
                                }                        
                            </div>
                            <div className='divRightSubMainContainerCompo'>
                            <div onClick={() => callModal()} className='playerPartTourneament' style={{padding: '1%', backgroundColor: '#222222', border: '1px solid #fc6b03', borderRadius: '10px', textAlign: 'center', cursor: 'pointer'}}>Participar</div>
                            <div onClick={() => callModal()} className='adminStartTourneament' style={{padding: '1%', backgroundColor: '#222222', border: '1px solid #fc6b03', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', display: 'none'}}>Começar Torneio</div>

                            </div>
                        </div>
                    </div>
                    <div className='divUsuarioSubMainContainerGeneral'  style={{}}>
                        <div className='perfilNavigation' style={{}}>
                            <div onClick={() => setPage('geral')} className='perfilConfig geral'><div className='imgUsuarioGearEditing visaoImg'/>Visão Geral</div>
                            <div onClick={() => setPage('equipe')} className='perfilConfig equipe'><div className='imgUsuarioGearEditing equipesImg'/>Equipes</div>
                            <div onClick={() => setPage('torneio')} className='perfilConfig torneio'><div className='imgUsuarioGearEditing torneiosImg'/>Chave</div>
                            <div onClick={() => setPage('config')} className='perfilConfig config'><div className='imgUsuarioGearEditing'/>Configurar Torneio</div>
                        </div>

                        <div className='divAllContainersUser' style={{}} >
                            <div className='divUsuarioSubMainContainerCompo'  style={{}} >
                                <div className='divContainerUsuarioContent' style={{}} >
                                    <div className='divmdEditor' style={{}}>
                                        <MDEditor
                                            className='wrapper'
                                            style={{boxShadow: '0px 1px 0px 0px '}} 
                                            visibleDragbar={false}
                                            height={'52.4vh'}
                                            fullscreen={false}
                                            value={descB}
                                            onChange={setDescB}
                                            preview={'edit'}
                                            
                                        />
                                    </div>
                                    <div className='divmdViewer' style={{}}>
                                        <MDEditor.Markdown className='markdownShower'  source={descB} style={{ whiteSpace: 'pre-wrap'}} />
                                    </div>
                                    <div className='divmdEditor' style={{}}>
                                        <MDEditor
                                            className='wrapper'
                                            style={{boxShadow: '0px 1px 0px 0px '}} 
                                            visibleDragbar={false}
                                            height={'52.4vh'}
                                            fullscreen={false}
                                            value={desc}
                                            onChange={setDesc}
                                            preview={'edit'}
                                            
                                        />
                                        <div className='editMarkdownButton exitMarkdown' onClick={() => callEditMarkdownEditor('exit')}><p>Editar</p></div>
                                    </div>
                                    <div className='divmdViewer' style={{}}>
                                        <MDEditor.Markdown className='markdownShower'  source={desc} style={{ whiteSpace: 'pre-wrap'}} />
                                        <div className='editMarkdownButton enterMarkdown' onClick={() => callEditMarkdownEditor('enter')} style={{borderColor: `${loggedUser.corP}`}} ><p>Editar</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className='divEquipesSubMainContainerCompo' >
                                <div className='divContainerTeamsOnUserTab' style={{width: '95%'}}>
                                { torneio && 
                                    <div style={{width: '100%'}}>
                                        
                                        <h3>Equipes Participando - {JSON.parse(torneio.participantes).length}/{torneio.quantiaParticipantes}</h3>
                                        
                                        
                                            {time.map( (time) => {

                                                        if(JSON.parse(torneio.participantes)?.find((ac) => {return ac === time.id})){
                                                            return  <div key={time.id} className='usersOnActive divUsersOnTeamSubContainer' id={'selectById'+time.id}>
                                                                        <div  className='divUserOnTeamContainer'>
                                                                            <img className='divUserOnTeamImg' src={time.logo} style={{border: '1px solid #fc6b03', boxShadow: `0px 0px 11px 0px #121212`}}/>
                                                                            <div style={{cursor: 'pointer'}} onClick={() => {window.location.href = '/e/' + time.nome}}>
                                                                                <h4>{time.nome}</h4>
                                                                            </div>
                                                                            <DoDisturbIcon onClick={() => {// deleteActiveUser(user.id)
                                                                            }} 
                                                                            className='doDisturbIcon' id={time.id} sx={{fontSize: "4vh", color: "#fc6b03"}}/>
                                                                        </div>
                                                                    </div>
                                                        }
                                                }
                                            )


                                        } 
                                    </div>
                                }
                                </div>
                            </div>
                            <div className='divTorneiosSubMainContainerCompo'>
                            </div>
                            
                            <div className='divConfigSubMainContainerCompo' style={{borderColor: '#fc6b03'}}>        
                                <div className='divConfigSubMainContainer' style={{borderColor: '#fc6b03'}}>
                                    <div className='divConfigConfigsContainer' style={{borderColor: '#fc6b03'}}>
                                        <div className='divConfigConfigsSubContainer' style={{borderColor: '#fc6b03'}}>
                                            <h1>Configurar Perfil</h1>
                                            <h2>Informações Gerais</h2>

                                            <div className='divOmgConfigs'>
                                                <div className='divContainerConfigSub4' style={{borderColor: '#fc6b03', flexDirection: 'column', gap: 15, marginLeft: '120px', alignItems: 'flex-start'}}>
                                                    <label className='premiumConfigs' style={{borderColor: '#fc6b03'}}>Icone:
                                                        <div className='divContainerNewImage'>
                                                            <img className='gearSelectImage' src={require('./components/assets/selecionar100x100.png')}/>
                                                            {
                                                                !imgUrl &&
                                                                <div className='outerbar'>
                                                                <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                                                                </div>
                                                            }
                                                            {
                                                                imgUrl &&
                                                                
                                                                <img src={imgUrl} alt='uploaded file' className='imgUploaded' style={{borderColor: '#fc6b03'}} />
                                                            }
                                                            
                                                            <form className='form' >
                                                                <input style={{display: 'none'}} onChange={(event) => {handleSubmit(event); 
                                                                    }} className='inputTypeFile' type='file' accept=".png,.jpeg"/> 
                                                            </form>
                                                        </div>
                                                    </label>
                                                    {torneio && 
                                                        <label>Nome do Torneio: <input value={nome} onChange={(event) => setNome(event.target.value)} placeholder={torneio.nome}/></label>
                                                    }
                                                </div>

                                                <div className='divContainerConfigSub'>


                                                    
                                                </div>
                                            </div>
                            

                                    <div>
                                        <button onClick={() => callMudançasPerfil('IG')} id='buttonChangeSettingsAccount buttonChangeSettingsAccount1'>Confirmar Mudanças - Informações Gerais</button>
                                    </div>
                                    <div className='divConfigConfigsSubContainer premiumConfigs2'>
                                        <h3>Personalização</h3>
                                            <div className='divOmgConfigs'>  
                                                    <div className='divContainerConfigSub2 ' style={{borderColor: '#fc6b03', flexDirection: 'column', gap: 15, marginLeft: '320px', alignItems: 'flex-start', padding: '20px'}}>
                                                        <label>Imagem Thumbnail: 
                                                            <div className='divContainerNewImage' style={{borderColor: '#fc6b03'}}>
                                                                <img className='gearSelectImage2' src={require('./components/assets/selecionar450x250.png')}/>

                                                                {
                                                                    !imgUrl3 &&
                                                                    <div className='outerbar'>
                                                                    <div className='innerbar' style={{ width: `${progresspercent3}%` }}>{progresspercent3}%</div>
                                                                    </div>
                                                                }
                                                                {
                                                                    imgUrl3 &&
                                                                    <img src={imgUrl3} alt='uploaded file' className='imgUploaded2'  style={{borderColor: '#fc6b03'}}/>
                                                                }
                                                                <form className='form'>
                                                                    <input style={{display: 'none'}} onChange={(event) => {handleSubmitImgFundoDois(event); 
                                                                    }} className='inputTypeFile' type='file' accept=".png,.jpeg"/> 
                                                                </form>
                                                            </div>
                                                        </label>
                                                        <label>Imagem atrás da página: 
                                                                                                                        
                                                            <div className='divContainerNewImage' style={{borderColor: '#fc6b03'}}>
                                                                <img className='gearSelectImage3' src={require('./components/assets/selecionar1600x250.png')}/>
                                                                {
                                                                    !imgUrl2 &&
                                                                    <div className='outerbar'>
                                                                    <div className='innerbar' style={{ width: `${progresspercent2}%` }}>{progresspercent2}%</div>
                                                                    </div>
                                                                }
                                                                {
                                                                    imgUrl2 &&
                                                                    <img src={imgUrl2} alt='uploaded file' className='imgUploaded3'   style={{borderColor: '#fc6b03'}}/>
                                                                }
                                                                <form className='form' >
                                                                    <input style={{display: 'none'}} onChange={(event) => {handleSubmitImgFundo(event); 
                                                                        }} className='inputTypeFile' type='file' accept=".png,.jpeg, .jpg"/> 
                                                                </form>
                                                            </div>
                                                        </label>
                                                    </div>
                                            </div>
                                        
                                    </div>
                                    <div id="premiumConfigs2">
                                        <button onClick={() => callMudançasPerfil('PP')} id='buttonChangeSettingsAccount buttonChangeSettingsAccount4 '>Confirmar Mudanças - Personalização</button>
                                    </div>
                                    <div>
                                        <button onClick={() => apagarEquipe()}>Apagar Torneio</button>
                                    </div>
                                </div>

                            </div>            
                        </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div> 
        </div>
                
        <Footer/>
    </div>
    
    )

}

export default Participar