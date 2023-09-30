import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import ModalCustom from '../Modal';
import { showModal, closeModal} from "../Modal";
import './index.css';
import { useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'

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

let respira
let detectPositionActive = -1
let detectPositionReserve = 0
let detectPositionCT = 0

function Times() {
    const { id } = useParams();
    const [page, setPage] = useState('geral')
    const DEFAULT_COLOR = '#fc6b03'

    const [loggedUser, setLoggedUser] = useState(null)
    const [users, setUsers] = useState(null)
    const [time, setTime] = useState(null)
    const [value, setValue] = useState('')
    const [jogo, setJogo] = useState(null)
    const [tag, setTag] = useState('')

    const [username, setUsername] = useState([])

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
                const [jogoResponse, userResponse, viewResponse, timeResponse] = await Promise.all([
                    fetch('https://web-production-8ce4.up.railway.app/api/jogo'),
                    fetch('https://web-production-8ce4.up.railway.app/api/user/' + JSON.parse(localStorage.getItem('dasiBoard'))),
                    fetch('https://web-production-8ce4.up.railway.app/api/user/'),
                    fetch('https://web-production-8ce4.up.railway.app/api/time/')
                ])
                const [jogoData, userData, viewData, timeData] = await Promise.all([
                    jogoResponse.json(),
                    userResponse.json(),
                    viewResponse.json(),
                    timeResponse.json()
                ])
                setJogo(jogoData.data)
                setLoggedUser(userData.data)
                setUsers(viewData.data)
                setTime(timeData.data.find((e) => {return e.nome === id}))
                setValue(time.descricao)
            } catch (e) {
            }
        }

        loadData()
    }, [])

    const callMudançasPerfil = async(status) => {
        switch(status){
            case 'IG':
                showModal('loading','Atualizando o Banco','barLoading')
                    
                try{
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({
                            nome: username,
                            tag: tag,
                            logo: imgUrl,
                            imgFundo: time.imgFundo,
                            equipeAtiva: time.equipeAtiva,
                            reserva: time.reserva,
                            comissaoTecnica: time.comissaoTecnica,
                            jogoPrincipal: time.jogoPrincipal,
                            conquistas: time.conquistas,
                            descricao: time.descricao,
                            imgFundo2: time.imgFundo2,
                            dataCriacao: time.dataCriacao,
                            donoCriacao: time.donoCriacao,
                            capitao: time.capitao
                        })
                        
                    }
                    closeModal('success', 'atualizado!',null)
                    await fetch('https://web-production-8ce4.up.railway.app/api/time/' + time.id,  requestOptions)
                    window.location.href = '/e/' + username
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
                                        nome: time.nome,
                                        tag: time.tag,
                                        logo: time.logo,
                                        imgFundo: imgUrl2,
                                        equipeAtiva: time.equipeAtiva,
                                        reserva: time.reserva,
                                        comissaoTecnica: time.comissaoTecnica,
                                        jogoPrincipal: time.jogoPrincipal,
                                        conquistas: time.conquistas,
                                        descricao: time.descricao,
                                        imgFundo2: imgUrl3,
                                        dataCriacao: time.dataCriacao,
                                        donoCriacao: time.donoCriacao,
                                        capitao: time.capitao
                                    })
                                    
                                }
                                closeModal('success', 'atualizado!',null)
                                await fetch('https://web-production-8ce4.up.railway.app/api/time/' + time.id,  requestOptions)
                                window.location.href = '/e/' + time.nome
                                }catch(e){
                                    
                                }
                            break
        }
    }


    if(fed === true){
        if (JSON.parse(time.equipeAtiva).length < 5 && time.capitao === loggedUser.username || JSON.parse(time.equipeAtiva).length < 5 && time.donoCriacao === loggedUser.username) {
            document.querySelector('.usersOnActiveAdd').addEventListener('click', () => {
                document.querySelector('.newModal').style.display = `flex`
                document.querySelector('body').style.overflow = 'hidden'
            })
        }
        if (JSON.parse(time.reserva).length < 9 && time.capitao === loggedUser.username ||JSON.parse(time.reserva).length < 9 && time.donoCriacao === loggedUser.username) {
            document.querySelector('.usersOnReserveAdd').addEventListener('click', () => {
                document.querySelector('.newModal2').style.display = `flex`
                document.querySelector('body').style.overflow = 'hidden'
            })
        }
        if (JSON.parse(time.comissaoTecnica).length < 3 && time.capitao === loggedUser.username || JSON.parse(time.comissaoTecnica).length < 3 && time.donoCriacao === loggedUser.username) {
            document.querySelector('.usersOnTecnicoAdd').addEventListener('click', () => {
                document.querySelector('.newModal3').style.display = `flex`
                document.querySelector('body').style.overflow = 'hidden'
            })
        }
    }
    
    
    useEffect(() => {

    
        switch(page){
            case 'geral':
                document.querySelector('.divUsuarioSubMainContainerCompo').style.display = 'flex'
                document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'none'
                // document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divConfigSubMainContainerCompo').style.display = 'none'

                document.querySelector('.geral').classList.add('perfilActive')
                document.querySelector('.equipe').classList.remove('perfilActive')
                document.querySelector('.config').classList.remove('perfilActive')
                break
            case 'equipe':
                document.querySelector('.divUsuarioSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'flex'
                // document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divConfigSubMainContainerCompo').style.display = 'none'

                document.querySelector('.geral').classList.remove('perfilActive')
                document.querySelector('.equipe').classList.add('perfilActive')
                document.querySelector('.config').classList.remove('perfilActive')

                if(fed === false){
                    
                        if (JSON.parse(time.equipeAtiva).length < 5 && time.capitao === loggedUser.username || JSON.parse(time.equipeAtiva).length < 5 && time.donoCriacao === loggedUser.username) {
                                document.querySelector('.divAppendAP').innerHTML = 
                                `
                                    <div class='usersOnActiveAdd divUsersOnTeamSubContainer' style="borderColor: #fc6b03" id="selectById+user.id">
                                        <div style="cursor: pointer" class='divUserOnTeamContainer'>
                                            <img class='divUserOnTeamImg' src="https://raw.githubusercontent.com/MonoDryad/BattleMode/main/Source/userDefault.png" style="borderColor: #fc6b03, boxShadow: '0px 0px 11px 0px #fc6b03'"/>
                                            <div >
                                                <h4>Adicionar Jogador</h4>
                                            </div>
                                        </div>
                                    </div>
                                `
                                if (JSON.parse(time.reserva).length < 9 && time.capitao === loggedUser.username || JSON.parse(time.reserva).length < 9 && time.donoCriacao === loggedUser.username) {
                                document.querySelector('.divAppendRP').innerHTML = 
                                `
                                    <div class='usersOnReserveAdd divUsersOnTeamSubContainer' style="borderColor: #fc6b03" id="selectById+user.id">
                                        <div style="cursor: pointer" class='divUserOnTeamContainer'>
                                            <img class='divUserOnTeamImg' src="https://raw.githubusercontent.com/MonoDryad/BattleMode/main/Source/userDefault.png" style="borderColor: #fc6b03, boxShadow: '0px 0px 11px 0px #fc6b03'"/>
                                            <div >
                                                <h4>Adicionar Reserva</h4>
                                            </div>
                                        </div>
                                    </div>
                                `
                                }if (JSON.parse(time.comissaoTecnica).length < 3 && time.donoCriacao === loggedUser.username || JSON.parse(time.comissaoTecnica).length < 3 && time.capitao === loggedUser.username) {
                                document.querySelector('.divAppendCT').innerHTML = 
                                `
                                    <div class='usersOnTecnicoAdd divUsersOnTeamSubContainer' style="borderColor: #fc6b03" id="selectById+user.id">
                                        <div style="cursor: pointer" class='divUserOnTeamContainer'>
                                            <img class='divUserOnTeamImg' src="https://raw.githubusercontent.com/MonoDryad/BattleMode/main/Source/userDefault.png" style="borderColor: #fc6b03, boxShadow: '0px 0px 11px 0px #fc6b03'"/>
                                            <div >
                                                <h4>Adicionar Técnico</h4>
                                            </div>
                                        </div>
                                    </div>
                                `}
                            
                        }
                        fed = true
                }
                break
            case 'torneio':
                // document.querySelector('.divUsuarioSubMainContainerCompo').style.display = 'none'
                // document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'none'
                // document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'flex'
                // document.querySelector('.divConfigSubMainContainerCompo').style.display = 'none'

                document.querySelector('.geral').classList.remove('perfilActive')
                document.querySelector('.equipe').classList.remove('perfilActive')
                document.querySelector('.config').classList.remove('perfilActive')
                break
            case 'config':
                document.querySelector('.divUsuarioSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divEquipesSubMainContainerCompo').style.display = 'none'
                // document.querySelector('.divTorneiosSubMainContainerCompo').style.display = 'none'
                document.querySelector('.divConfigSubMainContainerCompo').style.display = 'flex'

                document.querySelector('.geral').classList.remove('perfilActive')
                document.querySelector('.equipe').classList.remove('perfilActive')
                document.querySelector('.config').classList.add('perfilActive')
                
                break
        }
    })

    const makeEverythingWork = () => {
        setValue(time.descricao)
        setImgUrl(time.logo)
        setImgUrl2(time.imgFundo)
        setImgUrl3(time.imgFundo2)

        if(loggedUser.username === time.donoCriacao || loggedUser.username === time.capitao){
            document.querySelector('.config').style.display = 'flex'
            document.querySelector('.divmdEditor').style.display = 'none'
            document.querySelector('.enterMarkdown').style.display = 'flex'
            let list = document.querySelectorAll(`.doDisturbIcon`)

            for(let i = 0; i < 16; i++){
                list[i].style.display = 'block'
            }
        }else{
            document.querySelector('.divmdEditor').style.display = 'none'
            document.querySelector('.enterMarkdown').style.display = 'none'
            document.querySelector('.config').style.display = 'none'
        
            let list = document.querySelectorAll(`.doDisturbIcon`)

            for(let i = 0; i < 16; i++){
                list[i].style.display = 'none'
            }
            
            
        }
        deadOrAlive = true
    }  
    if(deadOrAlive === false){
        setTimeout(() => {
            makeEverythingWork()
        }, 2500);
    }

    const deleteTCUser = async(user,pos) => {
        showModal('loading','Atualizando o Banco','barLoading')
        let timeA = JSON.parse(time.comissaoTecnica)


        let indexOf = JSON.parse(time.comissaoTecnica).indexOf(user)
        timeA.splice(indexOf,1)
        time.comissaoTecnica = timeA
        document.querySelector('#selectById3'+user).style.display = 'none'
        try{
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    nome: time.nome,
                    tag: time.tag,
                    logo: time.logo,
                    imgFundo: time.imgFundo,
                    equipeAtiva: time.equipeAtiva,
                    reserva: time.reserva,
                    comissaoTecnica: JSON.stringify(timeA),
                    jogoPrincipal: time.jogoPrincipal,
                    conquistas: time.conquistas,
                    descricao: time.descricao,
                    imgFundo2: time.imgFundo2,
                    dataCriacao: time.dataCriacao,
                    donoCriacao: time.donoCriacao,
                    capitao: time.capitao
                })
                
            }
            closeModal('success', 'atualizado!',null)
            await fetch(`https://web-production-8ce4.up.railway.app/api/time/${time.id}`,  requestOptions)
            // window.location.href = '/e/' + time.nome
            }catch(e){
                
            }
    }

    const deleteReserveUser = async(user,pos) => {
        showModal('loading','Atualizando o Banco','barLoading')
        let timeA = JSON.parse(time.reserva)


        let indexOf = JSON.parse(time.reserva).indexOf(user)
        timeA.splice(indexOf,1)
        time.reserva = timeA
        document.querySelector('#selectById2'+user).style.display = 'none'
        try{
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    nome: time.nome,
                    tag: time.tag,
                    logo: time.logo,
                    imgFundo: time.imgFundo,
                    equipeAtiva: time.equipeAtiva,
                    reserva: JSON.stringify(timeA),
                    comissaoTecnica: time.comissaoTecnica,
                    jogoPrincipal: time.jogoPrincipal,
                    conquistas: time.conquistas,
                    descricao: time.descricao,
                    imgFundo2: time.imgFundo2,
                    dataCriacao: time.dataCriacao,
                    donoCriacao: time.donoCriacao,
                    capitao: time.capitao
                })
                
            }
            closeModal('success', 'atualizado!',null)
            await fetch(`https://web-production-8ce4.up.railway.app/api/time/${time.id}`,  requestOptions)
            // window.location.href = '/e/' + time.nome
            }catch(e){
                
            }
    }

    const deleteActiveUser = async(user,pos) => {
        showModal('loading','Atualizando o Banco','barLoading')
        let timeA = JSON.parse(time.equipeAtiva)


        let indexOf = JSON.parse(time.equipeAtiva).indexOf(user)
        timeA.splice(indexOf,1)
        time.equipeAtiva = timeA
        document.querySelector('#selectById'+user).style.display = 'none'
        try{
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    nome: time.nome,
                    tag: time.tag,
                    logo: time.logo,
                    imgFundo: time.imgFundo,
                    equipeAtiva: JSON.stringify(timeA),
                    reserva: time.reserva,
                    comissaoTecnica: time.comissaoTecnica,
                    jogoPrincipal: time.jogoPrincipal,
                    conquistas: time.conquistas,
                    descricao: time.descricao,
                    imgFundo2: time.imgFundo2,
                    dataCriacao: time.dataCriacao,
                    donoCriacao: time.donoCriacao,
                    capitao: time.capitao
                })
                
            }
            closeModal('success', 'atualizado!',null)
            await fetch(`https://web-production-8ce4.up.railway.app/api/time/${time.id}`,  requestOptions)
            // window.location.href = '/e/' + time.nome
            }catch(e){
                
            }
    }

    const [inputProcurar, setInputProcurar] = useState('')
    const [jogadores, setJogadores] = useState([])

    const [inputReserva, setInputReserva] = useState('')
    const [reservas, setReservas] = useState([])

    const [inputTec, setInputTec] = useState('')
    const [tecnicos, setTecnicos] = useState([])

    const handleRemoveTec = id => {
        document.querySelector('.addJogador3').style.display = 'block'

        const novaListaJogadores = tecnicos.filter((item) => item.id !== id)
        setTecnicos(novaListaJogadores)
    }

    const handleChangeTec = e => {
        setInputTec(e.target.value)
    }

    const addTecnico = nomeJogador => {
        let backup = reservas
        document.querySelector('.addJogador3').style.display = 'none'
        try{
            setTecnicos([...tecnicos, users.find(usuario => {return usuario.username === nomeJogador} )])
        }catch(e){
            showModal('erro', 'Não foi possível encontrar esse usuário.', 'barLoading')
            console.log(e)
            setTecnicos(tecnicos)
        }
        
        setInputReserva('')
    }


    const handleRemoveReserva = id => {
        document.querySelector('.addJogador2').style.display = 'block'

        const novaListaJogadores = reservas.filter((item) => item.id !== id)
        setReservas(novaListaJogadores)
    }

    const handleChangeReserva = e => {
        setInputReserva(e.target.value)
    }

    const addReserva = nomeJogador => {
        let backup = reservas
        document.querySelector('.addJogador2').style.display = 'none'
        try{
            setReservas([...reservas, users.find(usuario => {return usuario.username === nomeJogador} )])
        }catch(e){
            showModal('erro', 'Não foi possível encontrar esse usuário.', 'barLoading')
            console.log(e)
            setReservas(reservas)
        }
        
        setInputReserva('')
    }

    const handleRemove = id => {
        document.querySelector('.addButtonCriarEquipe').style.display = 'block'

        const novaListaJogadores = jogadores.filter((item) => item.id !== id)
        setJogadores(novaListaJogadores)
    }

    const handleChange = e => {
        setInputProcurar(e.target.value)
    }

    const addJogador = nomeJogador => {
        let backup = jogadores
        document.querySelector('.addButtonCriarEquipe').style.display = 'none'
        try{
            setJogadores([...jogadores, users.find(usuario => {return usuario.username === nomeJogador} )])
        }catch(e){
            showModal('erro', 'Não foi possível encontrar esse usuário.', 'barLoading')
            console.log(e)
            setJogadores(jogadores)
        }
        
        setInputProcurar('')
    }

    const confirmarAdicaoJogador = async() => {
        let newTeam = JSON.parse(time.equipeAtiva)
        newTeam.push(jogadores[0].id)

        try{
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    nome: time.nome,
                    tag: time.tag,
                    logo: time.logo,
                    imgFundo: time.imgFundo,
                    equipeAtiva: JSON.stringify(newTeam),
                    reserva: time.reserva,
                    comissaoTecnica: time.comissaoTecnica,
                    jogoPrincipal: time.jogoPrincipal,
                    conquistas: time.conquistas,
                    descricao: time.descricao,
                    imgFundo2: time.imgFundo2,
                    dataCriacao: time.dataCriacao,
                    donoCriacao: time.donoCriacao,
                    capitao: time.capitao
                })
                
            }
            await fetch(`https://web-production-8ce4.up.railway.app/api/time/${time.id}`,  requestOptions)
            window.location.href = '/e/' + time.nome
            }catch(e){
                
            }
    }

    const confirmarAdicaoReserva = async() => {
        let newTeam = JSON.parse(time.reserva)
        newTeam.push(reservas[0].id)

        try{
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    nome: time.nome,
                    tag: time.tag,
                    logo: time.logo,
                    imgFundo: time.imgFundo,
                    equipeAtiva: time.equipeAtiva,
                    reserva: JSON.stringify(newTeam),
                    comissaoTecnica: time.comissaoTecnica,
                    jogoPrincipal: time.jogoPrincipal,
                    conquistas: time.conquistas,
                    descricao: time.descricao,
                    imgFundo2: time.imgFundo2,
                    dataCriacao: time.dataCriacao,
                    donoCriacao: time.donoCriacao,
                    capitao: time.capitao
                })
                
            }
            await fetch(`https://web-production-8ce4.up.railway.app/api/time/${time.id}`,  requestOptions)
            window.location.href = '/e/' + time.nome
            }catch(e){
                
            }
    }

    

    const confirmarAdicaoTecnico = async() => {
        let newTeam = JSON.parse(time.comissaoTecnica)
        newTeam.push(tecnicos[0].id)

        try{
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    nome: time.nome,
                    tag: time.tag,
                    logo: time.logo,
                    imgFundo: time.imgFundo,
                    equipeAtiva: time.equipeAtiva,
                    reserva: time.reserva,
                    comissaoTecnica: JSON.stringify(newTeam),
                    jogoPrincipal: time.jogoPrincipal,
                    conquistas: time.conquistas,
                    descricao: time.descricao,
                    imgFundo2: time.imgFundo2,
                    dataCriacao: time.dataCriacao,
                    donoCriacao: time.donoCriacao,
                    capitao: time.capitao
                })
                
            }
            await fetch(`https://web-production-8ce4.up.railway.app/api/time/${time.id}`,  requestOptions)
            window.location.href = '/e/' + time.nome
            }catch(e){
                
            }
    }

    const apagarEquipe = async() => { 
        const requestOptions = {
            method: 'DELETE',
        }
        await fetch(`https://web-production-8ce4.up.railway.app/api/time/${time.id}`,  requestOptions)
        window.location.href = '/find/t'
    }

    const callEditMarkdownEditor = async(type) =>{
        if(type === 'enter'){
            document.querySelector('.divmdEditor').style.display = 'block'
            document.querySelector('.divmdViewer').style.display = 'none'
        }else{
            document.querySelector('.divmdEditor').style.display = 'none'
            document.querySelector('.divmdViewer').style.display = 'block'

            showModal('loading','Atualizando o Banco','barLoading')
                    
            try{
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        nome: time.nome,
                        tag: time.tag,
                        logo: time.logo,
                        imgFundo: time.imgFundo,
                        equipeAtiva: time.equipeAtiva,
                        reserva: time.reserva,
                        comissaoTecnica: time.equipeAtiva,
                        jogoPrincipal: time.jogoPrincipal,
                        conquistas: time.conquistas,
                        descricao: value,
                        imgFundo2: time.imgFundo2,
                        dataCriacao: time.dataCriacao,
                        donoCriacao: time.donoCriacao,
                        capitao: time.capitao
                    })
                    
                }
                closeModal('success', 'atualizado!',null)
                await fetch('https://web-production-8ce4.up.railway.app/api/time/' + time.id,  requestOptions)
                }catch(e){
                }
        }
    }

    return(
        <div className='divParticiparMainContainer'>
            <ModalCustom/>
            <Loading/>
            <div className="newModal3" style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems:'center',position: 'fixed', zIndex: '184', overflow: 'hidden',display: 'none', backgroundColor: '#00000066', width: '100vw', height: '101vh', marginTop: '-80px'}}>
                <div style={{border: '1px solid #fc6b03', position: 'fixed', backgroundColor: '#121212',width: '40%', borderRadius: 20, marginTop: '-150px'}}>
                    <div style={{paddingLeft: '30px',paddingRight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 style={{color: 'white'}}>Adicionar novo técnico</h2>
                        <div style={{borderRadius: '5px', color: 'black',width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f05e54', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold'}} onClick={() => {document.querySelector('.newModal3').style.display = 'none'
                        document.querySelector('body').style.overflowY = 'scroll'

                    }}>X</div>
                    </div>
                    <hr/>
                    <div>
                        <div>
                            <div className='inputButtonFlex'>
                                <input 
                                    className='inputProcurarJogador' 
                                    placeholder='Adicionar jogador...'
                                    onChange={handleChangeTec}
                                    value={inputTec}/>
                                <button 
                                    className='addJogador3 addButtonCriarEquipe'
                                    onClick={() => addTecnico(inputTec)}><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button>
                            </div>
                            <div className='divMostrarJogadores'>
                            {tecnicos.map((item) => (
                                        <div className='cardBody' style={{width: '100%', marginLeft: '190px'}} key={item.id}>
                                            <div className='userIcon' style={{backgroundPosition: 'center', backgroundSize: 'cover',backgroundImage: `url(${item.icon})`}}/>
                                            <span className='userName'><a href='#'>{item.username}</a></span>
                                            <button 
                                                className='buttonRemoveJogador'
                                                onClick={() => handleRemoveTec(item.id)}><HiX style={{fontSize: '20px', color: '#fc6b03'}}/></button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className='buttonFromModal'  onClick={() => confirmarAdicaoTecnico()}>Confirmar adição</button>
                    </div>
                </div>
            </div>
            <div className="newModal2" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems:'center',position: 'fixed', zIndex: '184', overflow: 'hidden',display: 'none', backgroundColor: '#00000066', width: '100vw', height: '101vh', marginTop: '-80px'}}>
                <div style={{border: '1px solid #fc6b03', position: 'fixed', backgroundColor: '#121212',width: '40%', borderRadius: 20, marginTop: '-150px'}}>
                    <div style={{paddingLeft: '30px',paddingRight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 style={{color: 'white'}}>Adicionar novo reserva</h2>
                        <div style={{borderRadius: '5px', color: 'black',width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f05e54', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold'}} onClick={() => {document.querySelector('.newModal2').style.display = 'none'
                        document.querySelector('body').style.overflowY = 'scroll'

                    }}>X</div>
                    </div>
                    <hr/>
                    <div>
                        <div>
                            <div className='inputButtonFlex'>
                                <input 
                                    className='inputProcurarJogador' 
                                    placeholder='Adicionar jogador...'
                                    onChange={handleChangeReserva}
                                    value={inputReserva}/>
                                <button 
                                    className='addJogador2 addButtonCriarEquipe'
                                    onClick={() => addReserva(inputReserva)}><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button>
                            </div>
                            <div className='divMostrarJogadores'>
                            {reservas.map((item) => (
                                        <div className='cardBody' style={{width: '100%', marginLeft: '190px'}} key={item.id}>
                                            <div className='userIcon' style={{backgroundPosition: 'center', backgroundSize: 'cover',backgroundImage: `url(${item.icon})`}}/>
                                            <span className='userName'><a href='#'>{item.username}</a></span>
                                            <button 
                                                className='buttonRemoveJogador'
                                                onClick={() => handleRemoveReserva(item.id)}><HiX style={{fontSize: '20px', color: '#fc6b03'}}/></button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className='buttonFromModal' onClick={() => confirmarAdicaoReserva()}>Confirmar adição</button>
                    </div>
                </div>
            </div>
            <div className="newModal" style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems:'center',position: 'fixed', zIndex: '184', overflow: 'hidden',display: 'none', backgroundColor: '#00000066', width: '100vw', height: '101vh', marginTop: '-80px'}}>
                <div style={{border: '1px solid #fc6b03', position: 'fixed', backgroundColor: '#121212',width: '40%', borderRadius: 20, marginTop: '-150px'}}>
                    <div style={{paddingLeft: '30px',paddingRight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 style={{color: 'white'}}>Adicionar novo jogador</h2>
                        <div style={{borderRadius: '5px', color: 'black',width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#f05e54', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold'}} onClick={() => {document.querySelector('.newModal').style.display = 'none'
                        document.querySelector('body').style.overflowY = 'scroll'

                    }}>X</div>
                    </div>
                    <hr/>
                    <div>
                        <div>
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
                                        <div className='cardBody' style={{width: '100%', marginLeft: '190px'}} key={item.id}>
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
                    <hr/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className='buttonFromModal'  onClick={() => confirmarAdicaoJogador()}>Confirmar adição</button>
                    </div>
                </div>
            </div>
            <div className='divFundoMainContainer' style={{backgroundImage: `url(${time && time.imgFundo})`, backgroundSize: 'cover', backgroundPosition: 'center',}}>
                <div className='divContainerFundoMainContainer'/>
            </div>
            <div className='divUsuarioSubMainContainerD paddingLeft '>
                <div className='divUsuarioComplexContainer divEquipeComplexContainer' >
                    <div className='divRightMainComplexoContainerCompo' style={{}} >
                        <div className='divRightUserInfoCompo'  style={{backgroundImage: `url(${time && time.imgFundo2}`, backgroundSize: 'cover',}}>
                            <div className='imgUserprofileIcon' style={{backgroundImage: `url(${time && time.logo})`, backgroundColor: '#121212'}}></div>
                            <h2>{time && time.nome}</h2>
                            <h4>{time && time.tag}</h4>
                            
                        </div>
                        <div>
                            <div className='divRightSubMainContainerCompo' >
                                <h2>Jogo Principal</h2>
                                { jogo &&
                                    jogo.map((jogo) => {
                                        if(jogo.id === parseInt(time.jogoPrincipal)){
                                            return <label style={{textAlign: 'center', display: 'flex', alignItems: 'center'}}><img style={{marginRight: '10px'}} width={50} height={50} src={jogo.logo}/>{jogo.nome}</label>

                                        }
                                    })
                                }
                                
                                
                            </div>
                            <div className='divRightSubMainContainerCompo' >
                                { users &&
                                    users.map((user) => {
                                        
                                        if(user.username === time.donoCriacao){
                                            return <div style={{width: '80%'}}>
                                                        <label className='criador' onClick={() => window.location.href = '/u/' + user.username} style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'no-wrap', flexDirection: 'row'}}>
                                                            <img style={{marginRight: '10px', borderRadius: 50, border: '1px solid' + user.corP,backgroundColor: '#121212'}} width={37} height={37} src={user.icon}/>
                                                            <label>Criado por <SiEdotleclerc sx={{fontSize: "2vh", color: "#fc6b03"}}/> {user.username}</label>
                                                        </label>

                                                    </div>

                                        }
                                        
                                    })
                                }
                                { users &&
                                    users.map((user) => {
                                        
                                        if(user.username === time.capitao){
                                            return <div style={{width: '80%'}}>
                                                        <label className='criador' onClick={() => window.location.href = '/u/' + user.username} style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'no-wrap', flexDirection: 'row'}}>
                                                            <img style={{marginRight: '10px', borderRadius: 50, border: '1px solid' + user.corP,backgroundColor: '#121212'}} width={37} height={37} src={user.icon}/>
                                                            <label>Capitão <AiFillCrown sx={{fontSize: "2vh", color: "#fc6b03"}}/> {user.username}</label>
                                                        </label>
                                                        <label style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                                            <label>Data de Criação: {time.dataCriacao}</label>
                                                            
                                                        </label>
                                                    </div>

                                        }
                                        
                                    })
                                }
                                
                                
                                
                            </div>
                        </div>
                    </div>
                    <div className='divUsuarioSubMainContainerGeneral'  style={{}}>
                        <div className='perfilNavigation' style={{}}>
                            <div onClick={() => setPage('geral')} className='perfilConfig geral'><div className='imgUsuarioGearEditing visaoImg'/>Visão Geral</div>
                            <div onClick={() => setPage('equipe')} className='perfilConfig equipe'><div className='imgUsuarioGearEditing equipesImg'/>Jogadores</div>
                            <div onClick={() => setPage('config')} className='perfilConfig config'><div className='imgUsuarioGearEditing'/>Configurar Equipe</div>
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
                                            value={value}
                                            onChange={setValue}
                                            preview={'edit'}
                                            
                                        />
                                         <div className='editMarkdownButton exitMarkdown' onClick={() => callEditMarkdownEditor('exit')}><p>Editar</p></div>
                                    </div>
                                    <div className='divmdViewer' style={{}}>
                                        <MDEditor.Markdown className='markdownShower'  source={value} style={{ whiteSpace: 'pre-wrap'}} />
                                        <div className='editMarkdownButton enterMarkdown' onClick={() => callEditMarkdownEditor('enter')} style={{borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR}} ><p>Editar</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className='divEquipesSubMainContainerCompo' >
                                <div className='divContainerTeamsOnUserTab' style={{width: '95%'}}>
                                    <div style={{width: '100%'}}>
                                        <h3>Equipe Ativa</h3>

                                        { time &&
                      
                                                users.map( (user) => {
                                                    if(time.donoCriacao === user.username && JSON.parse(time.equipeAtiva).find((ac) => {return ac === user.id})){
                                                        return  <div key={user.id} className='usersOnActive divUsersOnTeamSubContainer' style={{borderColor: user.corP}} id={'selectById'+user.id}>
                                                                    <div  className='divUserOnTeamContainer'>
                                                                        <img className='divUserOnTeamImg' src={user.icon} style={{borderColor: user.corP, boxShadow: `0px 0px 11px 0px ${user.corP}`}}/>
                                                                        <div style={{cursor: 'pointer'}} onClick={() => {window.location.href = '/u/' + user.username}}>
                                                                            <h4 style={{display: 'flex', alignItems: 'center'}}>{user.username} <SiEdotleclerc style={{marginLeft: '6px'}} id={user.id} sx={{fontSize: "4vh", color: "#fc6b03"}}/><h5 style={{marginLeft: '4px'}}>Criador</h5></h4>
                                                                        </div>
                                                                        <DoDisturbIcon onClick={() => {deleteActiveUser(user.id)}} className='doDisturbIcon' id={user.id} sx={{fontSize: "4vh", color: "#fc6b03"}}/>
                                                                    </div>
                                                                </div>
                                                        
                                                    }else if(time.capitao === user.username && JSON.parse(time.equipeAtiva).find((ac) => {return ac === user.id})){
                                                        return  <div key={user.id} className='usersOnActive divUsersOnTeamSubContainer' style={{borderColor: user.corP}} id={'selectById'+user.id}>
                                                                    <div  className='divUserOnTeamContainer'>
                                                                        <img className='divUserOnTeamImg' src={user.icon} style={{borderColor: user.corP, boxShadow: `0px 0px 11px 0px ${user.corP}`}}/>
                                                                        <div style={{cursor: 'pointer'}} onClick={() => {window.location.href = '/u/' + user.username}}>
                                                                            <h4 style={{display: 'flex', alignItems: 'center'}}>{user.username} <AiFillCrown style={{marginLeft: '6px'}} id={user.id} sx={{fontSize: "4vh", color: "#fc6b03"}}/><h5 style={{marginLeft: '4px'}}>Capitão</h5></h4>
                                                                        </div>
                                                                        <DoDisturbIcon onClick={() => {deleteActiveUser(user.id)}} className='doDisturbIcon' id={user.id} sx={{fontSize: "4vh", color: "#fc6b03"}}/>
                                                                    </div>
                                                                </div>

                                                    }else if(JSON.parse(time.equipeAtiva).find((ac) => {return ac === user.id})){
                                                        return  <div key={user.id} className='usersOnActive divUsersOnTeamSubContainer' style={{borderColor: user.corP}} id={'selectById'+user.id}>
                                                                    <div  className='divUserOnTeamContainer'>
                                                                        <img className='divUserOnTeamImg' src={user.icon} style={{borderColor: user.corP, boxShadow: `0px 0px 11px 0px ${user.corP}`}}/>
                                                                        <div style={{cursor: 'pointer'}} onClick={() => {window.location.href = '/u/' + user.username}}>
                                                                            <h4>{user.username}</h4>
                                                                        </div>
                                                                        <DoDisturbIcon onClick={() => {deleteActiveUser(user.id)}} className='doDisturbIcon' id={user.id} sx={{fontSize: "4vh", color: "#fc6b03"}}/>
                                                                    </div>
                                                                </div>

                                                    }
                                                
                                                    
                                                }
                                            ) 
                                        }
                                        <div className='divAppendAP'></div>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <h3>Equipe Reserva</h3>

                                        { users &&
                      
                                            users.map( (user) => {
                                                                    
                                                for(let i = 0; i < 5;i++){

                                                    if(JSON.parse(time.reserva)[i] === user.id){
                                                        return  <div key={user.id} className='divUsersOnTeamSubContainer' style={{borderColor: user.corP}} id={'selectById2'+user.id}>
                                                                    <div className='divUserOnTeamContainer'>
                                                                        <img className='divUserOnTeamImg' src={user.icon} style={{borderColor: user.corP, boxShadow: `0px 0px 11px 0px ${user.corP}`}}/>
                                                                        <div onClick={() => {window.location.href = '/u/' + user.username}}>
                                                                            <h4>{user.username}</h4>
                                                                        </div>
                                                                        <DoDisturbIcon onClick={() => {deleteReserveUser(user.id)}} className='doDisturbIcon' id={user.id} sx={{fontSize: "4vh", color: "#fc6b03"}}/>

                                                                    </div>
                                                                </div>

                                                    }
                                                }
                                            }
                                            ) 
                                        }
                                        <div className='divAppendRP'></div>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <h3>Equipe Técnica</h3>

                                        { users &&
                      
                                            users.map( (user) => {
                                                                    
                                                for(let i = 0; i < 5;i++){

                                                    if(JSON.parse(time.comissaoTecnica)[i] === user.id){
                                                        return  <div key={user.id} className='divUsersOnTeamSubContainer' style={{borderColor: user.corP}} id={'selectById3'+user.id}>
                                                                    <div className='divUserOnTeamContainer'>
                                                                        <img className='divUserOnTeamImg' src={user.icon} style={{borderColor: user.corP, boxShadow: `0px 0px 11px 0px ${user.corP}`}}/>
                                                                        <div onClick={() => {window.location.href = '/u/' + user.username}}>
                                                                            <h4>{user.username}</h4>
                                                                        </div>
                                                                        <DoDisturbIcon onClick={() => {deleteTCUser(user.id)}} className='doDisturbIcon' id={user.id} sx={{fontSize: "4vh", color: "#fc6b03"}}/>

                                                                    </div>
                                                                </div>

                                                    }
                                                }
                                            }
                                            ) 
                                        }
                                        <div className='divAppendCT'></div>
                                    </div>
                                </div>
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
                                                    <label>Nome da Equipe: <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder={time && time.nome}/></label>
                                                    <label>Tag da Equipe: <input value={tag} onChange={(event) => setTag(event.target.value)} placeholder={time && time.tag}/></label>

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
                                                            <label>Imagem atrás do nome: 
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
                                            <button onClick={() => apagarEquipe()}>Apagar Equipe</button>
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

export default Times