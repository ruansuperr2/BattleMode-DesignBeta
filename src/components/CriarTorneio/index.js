import React, { useEffect, useState } from 'react'
import './index.css'
import NavBar from '../Navbar'
import Footer from '../Footer'
import Select from 'react-select'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'
import ModalCustom, {showModal, closeModal} from '../Modal'
import { storage } from '../FireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

let getUsersTry = 0

function CriarTorneio (){
    
    const [loggedUser, setLoggedUser] = useState({})
    const [users, setUsers] = useState([])
    const [jogo, setJogo] = useState([])
    const [torneio, setTorneio] = useState([])
    const [time, setTime] = useState([])
    const [nome, setNome] = useState('')
    const [descB, setDescB] = useState('')
    const [desc, setDesc] = useState('')
    const [chave, setChave] = useState('')
    const [quantiaParticipantes, setQuantiaParticipantes] = useState(0)


    const [imgUrl, setImgUrl] = useState(null);
    const [imgUrl2, setImgUrl2] = useState(null);
    const [imgUrl3, setImgUrl3] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [progresspercent2, setProgresspercent2] = useState(0);
    const [progresspercent3, setProgresspercent3] = useState(0);

    const [gameId, setGameId] = useState()

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
            const response = await fetch('http://localhost:6090/api/torneio')
            const data = response.json()
            data.then(
                (val) => {setTorneio(val.data)})
        }catch(error){
            
        }
    }

    const callGames = async() => {
        try{
            const response = await fetch('http://localhost:6090/api/jogo')
            const data = response.json()
            data.then(
                (val) => {setJogo(val.data)})
        }catch(error){
            
        }
    }

    const callTime = async () => {
        try{
            const responseUser = await fetch('http://localhost:6090/api/time/')
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
            const responseUser = await fetch('http://localhost:6090/api/user/' + JSON.parse(localStorage.getItem('dasiBoard')))
            const dataUser = responseUser.json()

            const responseUsers = await fetch('http://localhost:6090/api/user/')
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
    
    if(getUsersTry < 3){
        if(JSON.parse(localStorage.getItem('dasiBoard')) === null){
            window.location.href = '/userNotFound'
        }
        getUsersTry++
        getUsers()
        callGames()
        callTorneio()
        callTime()
    }



    const sendEverything = async() => {
        showModal('spin', 'Enviando informações...', 'barLoading')
        if(nome.length > 3){
            if(desc.length > 1){
                    try{
                        const requestOptions = {
                                method: 'POST',
                                headers: {'Content-type': 'application/json'},
                                body: JSON.stringify({
                                    nome: nome,
                                    logo: imgUrl,
                                    descricaoLonga: desc,
                                    descricaoBreve: descB,
                                    thumbnail: imgUrl2,
                                    imgFundo: imgUrl3,
                                    participantes: JSON.stringify([]),
                                    gameId: gameId,
                                    chave: chave,
                                    quantiaParticipantes: quantiaParticipantes,
                                    donoCriacao: loggedUser.username,
                                    admins: JSON.stringify([])
                                })
                                
                        }
                        await fetch('http://localhost:6090/api/torneio/', requestOptions)
                        closeModal('success', 'Redirecionando...', false)
                        setTimeout(() => {
                            window.location.href = '/t/' + (torneio[torneio.length - 1].id + 1)
                        }, 1000)
                    }catch(error){
                            
                    }
            }else{
                closeModal('erro', 'Descrição inválida...', false)
            }
        }else{
            closeModal('erro', 'Nome inválido...', false)
        }
        
    }
    



    const chaves = [
        { value: 'classificatoria', label: 'Classificatoria' },
        { value: 'eliminatoria', label: 'Eliminatoria' },
        { value: 'grupo', label: 'Grupo' },
        { value: 'swiss', label: 'Swiss' }
    ]
    
    const jogos = jogo.map((jogo) => {
            return {value: jogo.id, label: jogo.nome}
        })


    const quantia = [
        { value: 2, label: '2' },
        { value: 4, label: '4' },
        { value: 6, label: '6' },
        { value: 8, label: '8' },
        { value: 10, label: '10' },
        { value: 12, label: '12' },
        { value: 14, label: '14' },
        { value: 16, label: '16' },
        { value: 18, label: '18' },
        { value: 20, label: '20' },
        { value: 22, label: '22' },
        { value: 24, label: '24' },
        { value: 26, label: '26' },
        { value: 28, label: '28' },
        { value: 30, label: '30' },
        { value: 32, label: '32' },
        { value: 34, label: '34' },
        { value: 36, label: '36' },
        { value: 64, label: '64' },
        { value: 128, label: '128' },
        { value: 256, label: '256' },
        { value: 512, label: '512' },
        { value: 1024, label: '1024' },
        { value: 2048, label: '! 2048' },
        { value: 4096, label: '! 4096' },
    ]
        
    return(
        <div className="DivCriarTorneio">
            <div className="divMainCriarTorneio paddingLeft">
                <ModalCustom/>
                <div className="divSubCriarTorneio">
                    <div className="divDivisorCriarTorneio">

                        <div className="addthumb">
                            <div className="imgthumb">
                                <label>
                                {
                                        !imgUrl2 &&
                                        <div className='outerbar'>
                                        <div className='innerbar' style={{ width: `100%` }}>Thumbnail {progresspercent3}%</div>
                                        </div>
                                    }
                                    {
                                        imgUrl2 &&
                                        
                                        <img src={imgUrl2} alt='uploaded file' className='imgUploadedLogo' style={{borderColor: loggedUser.corP}} />
                                    }
                                    
                                    <form className='form' style={{borderColor: loggedUser.corP}}>
                                        <input style={{borderColor: loggedUser.corP, display: 'none'}} onChange={(event) => {handleSubmitImgFundo(event); 
                                            }} className='inputTypeFile' type='file' accept=".png,.jpeg,.jpg"/> 
                                    </form>
                                </label>
                            </div>

                            {/* <button className="funçaoThumb addButtonTorneio"><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button> */}
                        </div>

                        <div className="addlogo">
                            <div className="imglogo">
                                <label>
                                    {
                                        !imgUrl &&
                                        <div className='outerbar'>
                                        <div className='innerbar' style={{ width: `100%` }}>Logo {progresspercent3}%</div>
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

                            {/* <button className="funçaoLogo addButtonTorneio"><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button> */}
                        </div>

                        <div className="addfundo">
                            <div className="imgfundo">
                                <label>
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

                            {/* <button className="funçaologo addButtonTorneio"><AiOutlinePlus style={{fontSize: '20px', color: '#fc6b03', backgroundColor: 'transparent'}}/></button> */}
                        </div>

                    </div>

                    <div className="divInfoCriarTorneio">
                        <input className="torneioInput" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome seu do torneio..."></input>
                        <textarea className="textAreaTorneio" value={descB} onChange={(e) => setDescB(e.target.value)} placeholder="Informações breve do seu torneio... 1000 Caracteres - MarkDown File"></textarea>
                        <textarea className="textAreaTorneio" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Informações do seu torneio... 3000 Caracteres - MarkDown File"></textarea>
                        <div className="divMoreinfoCriarTorneios" style={{color: 'black'}}>
                            <Select options={chaves} onChange={(e) => setChave(e.value)} className="select" placeholder='Chaves' />
                            <Select options={jogos} onChange={(e) => setGameId(e.value)} className="select"  placeholder='Jogos'/>
                            <Select options={quantia} onChange={(e) => setQuantiaParticipantes(e.value)} className="select"  placeholder='Quantia de Jogadores'/>
                        </div>
                        <button className='buttonConfirmarCriarTorneio' onClick={() => {sendEverything()}}>Confirmar <AiOutlineCheck style={{fontSize: '25px', marginLeft: '.5rem', color: '#fc6b03', backgroundColor: 'transparent'}}/></button>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default CriarTorneio
