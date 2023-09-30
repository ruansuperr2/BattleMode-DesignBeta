import React, {useState} from 'react'
import './index.css'
import ModalCustom ,{ showModal, closeModal } from '../Modal';

import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Cadastro (props) {
    props.funcNav(false);
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const [showPass1, setShowPass1] = useState(null)
    const [showPass2, setShowPass2] = useState(null)

    const callAgentFinder = async() => {
        try{
            const response = await fetch('http://localhost:6090/api/user')
            const data = response.json()
            data.then(
                (val) => {setUsers(val.data)

                }
            )
        }catch(error){
        }
    }

    
    const registerUser = async() => {
        callAgentFinder()
        showModal('spin','Aguarde',false)
        if(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g) && email !== users.find((account) => {return account.email === email })){
            if(username.match(/^[a-zA-Z0-9]{4,16}$/) && username !== users.find((account) => {return account.username === username })){
                if(password === confirmPassword && password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
                    closeModal('success','Você será redirecionado para o loading!','barLoading')
                    
                    try{
                        const requestOptions = {
                                method: 'POST',
                                headers: {'Content-type': 'application/json'},
                                body: JSON.stringify({
                                    username: username,
                                    email: email,
                                    password: password,
                                })
                                
                        }
                        await fetch('http://localhost:6090/api/user',  requestOptions)
                        setTimeout(() => {
                            window.location.href = '/login '
                        }, 1000)
                    }catch(error){
                    }
                }else{
                    closeModal('erro','Verifique a sua senha','barLoading')
                }

            }else{
                closeModal('erro','Preencha o campo de Usuário','barLoading')
            }
        }else{
            closeModal('erro','Esse email já esta em uso ou não uma formatação correta','barLoading')
        }
    }


    return (
        <div className='divMainCadastroLindo'>
            <div className="divCadastroMainContainer">
                <ModalCustom/>
                <div className="divCadastroLeftContainer">
                    <div>
                        <img className='IMG' src={require("./assets/logo.png")} />
                    </div>

                    <div>
                        <h1>Seu estilo, sua vitória</h1>
                    </div>

                    <div>
                        <p>Entre com estilo e ganhe nos mais diversos torneios disponível no site, torneios criado pela comunidade para a comunidade!</p>
                    </div>

                    <div className='links'>
                        <a href="https://github.com/MonoDryad/BattleMode">
                            <GitHubIcon sx={{fontSize: "8vh", color: "#fc6b03"}}></GitHubIcon>
                        </a>

                        <a href="https://twitter.com/gaiacup">
                            <TwitterIcon  sx={{fontSize: "8vh", color: "#fc6b03"}} ></TwitterIcon>
                        </a>

                        <a href="">
                            <img className="discord" src={require("./assets/discord.png")}></img>
                        </a>
                    </div>
                </div>
                <div className="divCadastroRightContainer">
                    <div className='divCadastrarRightSubContaner'>
                        <h1>Cadastre-se</h1>
                        <p className='p'>Entre com sua conta ja cadastrada</p>

                        <input value={username} onChange={event => {setUsername(event.target.value)}} placeholder='Usuário'></input>
                        <input value={email} onChange={event => {setEmail(event.target.value)}} placeholder='Email'></input>
                        <label>
                            <input type='password' id='1' value={password} onChange={event => {setPassword(event.target.value)}} placeholder='Senha'></input>
                            { !showPass1 &&
                                <VisibilityIcon onClick={() => {setShowPass1('view')
                                document.getElementById('1').setAttribute("type", "text")
                            }} className='aVIMG' sx={{fontSize: "4vh", color: "#fc6b03"}} ></VisibilityIcon>
                            }
                                                        
                            { showPass1 &&
                                <VisibilityOffIcon onClick={() => {setShowPass1(null)
                                document.getElementById('1').setAttribute("type", "password")
                                }} className='aVIMG' sx={{fontSize: "4vh", color: "#fc6b03"}} ></VisibilityOffIcon>
                            }
                        </label>
                        <label>
                            <input type='password' id='2' value={confirmPassword} onChange={event => {setConfirmPassword(event.target.value)}} placeholder='Confirmar senha'></input>
                            { !showPass2 &&
                                <VisibilityIcon onClick={() => {setShowPass2('view')
                                document.getElementById('2').setAttribute("type", "text")
                            }} className='aVIMG' sx={{fontSize: "4vh", color: "#fc6b03"}} ></VisibilityIcon>
                            }
                                                        
                            { showPass2 &&
                                <VisibilityOffIcon onClick={() => {setShowPass2(null)
                                    document.getElementById('2').setAttribute("type", "password")
                                }} className='aVIMG' sx={{fontSize: "4vh", color: "#fc6b03"}} ></VisibilityOffIcon>
                            }</label>
                        <button onClick={() => registerUser()}>Cadastrar-se</button>


                    </div>
                </div>
            </div>
        </div>
        )
}

export default Cadastro
