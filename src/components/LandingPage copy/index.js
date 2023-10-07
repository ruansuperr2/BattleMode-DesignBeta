import React, { useEffect, useState, useMemo, useRef } from 'react';
import './landingpage.css';
import data from '../../version.json'
import { useNavigate } from "react-router-dom";

import userTest from './assets/json/users.json'

function LandingPageDev(props) {
  console.log(process.env.REACT_APP_SERVER + ":" + process.env.REACT_APP_PORT)
  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([])
  const [number, setNumber] = useState(Math.floor(Math.random() * 4 + 1))
  const [pageState, setpageState] = useState(true)

  const [checkStateMusic, setCheckStateMusic] = useState(true)
  const [checkStateAnim, setCheckStateAnim] = useState(false)
  const [connection, setConnection] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [usernameCAD, setUsernameCAD] = useState("")
  const [passwordCAD, setPasswordCAD] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [emailCAD, setEmailCAD] = useState("")

  const [UsernameStatus, setStatusUsernameCad] = useState("")
  const [EmailStatus, setStatusEmailCad] = useState("")
  const [PasswordStatus, setStatusPasswordCad] = useState("")
  const [ConfirmStatus, setStatusConfirmCad] = useState("")

  const [regCheck1, setregCheck1] = useState(false)
  const [regCheck2, setregCheck2] = useState(false)
  const [regCheck3, setregCheck3] = useState(false)
  const [regCheck4, setregCheck4] = useState(false)

  const [logging, setLogging] = useState(false)
  const [connectionMessage, setConnectionMessage] = useState("")
  const [CADMessage, setCADMessage] = useState("")
  const [dbConnection, setdbConnection] = useState(null)



  const verifyCredentials = async (e) => {

    if (e === "username") {

      if (pageState === false) {
        if (usernameCAD.match(/^[a-zA-Z0-9]{4,16}$/) && username !== users.find((account) => { return account.username === username })) {
          setStatusUsernameCad('')
          setregCheck1(true)
        } else {
          setStatusUsernameCad('Nome indisponível/inválido')
          setregCheck1(false)
        }
      }
    }
    if (e === "email") {

      if (pageState === false) {
        if (emailCAD.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g) && emailCAD !== users.find((account) => { return account.email === emailCAD })) {
          setStatusEmailCad('')
          setregCheck2(true)
        } else {
          setStatusEmailCad('Email indisponível/inválido')
          setregCheck2(false)
        }
      }
    }

    if (e === "password") {

      if (pageState === false) {
        if (passwordCAD.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])(?=.{8,})/g)) {
          setStatusPasswordCad('')
          setregCheck3(true)
        } else {
          setStatusPasswordCad('Senha abaixo do padrão, adicione caracteres especiais, numeros e letra maiuscula')
          setregCheck3(false)
        }
      }
    }

    if (e === "confirm") {

      if (pageState === false) {
        if (passwordCAD === ConfirmPassword) {
          setStatusConfirmCad('')
          setregCheck4(true)
        } else {
          setStatusConfirmCad('Senhas não combinam')
          setregCheck4(false)
        }
      }
    }
  }




  useEffect(() => {
    if (pageState === true) {

      if (username.length > 1 && password.length > 1) {
        document.querySelector('#buttonSignIn').removeAttribute('disabled')
      } else {
        document.querySelector('#buttonSignIn').setAttribute('disabled', true)
      }
    }

  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://' +  process.env.REACT_APP_SERVER + ':' + process.env.REACT_APP_PORT + '/api')
        const data = response.json()
        data.then(val => {
          setConnection(true)
          setdbConnection(true)
          if (JSON.parse(localStorage.getItem('dasiBoard')) != null && val.success === 'true') {
            navigate("/home")
          }
        })

      } catch (e) {
        setConnection(false)
        setdbConnection(false)
      }
    }




    const detectServerConnection = async () => {
      try {
        const response = await fetch('http://' +  process.env.REACT_APP_SERVER + ':' + process.env.REACT_APP_PORT + '/api')
        const data = response.json()
        console.log(data)
        if (data !== null) {

          data.then(val => {
            console.log(val.success, val)
            setConnection(true)
            setdbConnection(true)
            const loadDataU = async () => {
              try {
                const [response] = await Promise.all([
                  fetch('http://' +  process.env.REACT_APP_SERVER + ':' + process.env.REACT_APP_PORT + '/api/user'),
                ]);
                const [user] = await Promise.all([
                  response.json(),
                ])
                setUsers(user.data)
    
              } catch (e) {
              }
            };
    
            loadDataU()
          })
        } else {
          setConnection(false)
          setdbConnection(false)
        }

      } catch (e) {
      }
      console.log(connection, dbConnection)
    }
    if (dbConnection === null || dbConnection === false) {

      detectServerConnection()
      fetchData()
      console.log(connection, dbConnection)

    }
    console.log(connection, dbConnection)

  },[users, dbConnection])



  useEffect(() => {
    if (checkStateMusic === true) {
      document.querySelector('.videoSeasonIntro').volume = 0
    } else {
      document.querySelector('.videoSeasonIntro').removeAttribute("muted")
      document.querySelector('.videoSeasonIntro').volume = 1
    }
  }, [checkStateMusic])

  useEffect(() => {
    if (checkStateAnim === true) {
      document.querySelector('.StaticImage').style.display = "block"
    } else {
      document.querySelector('.StaticImage').style.display = "none"
    }
  }, [checkStateAnim])

  const callRegister = async () => {
    setLogging(true)
    setCADMessage("Conectando ao banco de dados")
    document.querySelector('.inputBlockCAD1').setAttribute('disabled', true)
    document.querySelector('.inputBlockCAD2').setAttribute('disabled', true)
    document.querySelector('.inputBlockCAD3').setAttribute('disabled', true)
    document.querySelector('.inputBlockCAD4').setAttribute('disabled', true)
    document.querySelector('#buttonRegister').setAttribute('disabled', true)
    if (regCheck1 === true && regCheck2 === true && regCheck3 === true && regCheck4 === true) {


      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            username: usernameCAD,
            email: emailCAD,
            password: passwordCAD,
          })

        }
        await fetch('http://' +  process.env.REACT_APP_SERVER + ':' + process.env.REACT_APP_PORT + '/api/user', requestOptions)
        setCADMessage("Usuário registrado, redirecionando")
        setTimeout(() => {
          setpageState(true)
          setLogging(false)
        }, 1000)
      } catch (error) {
        setCADMessage(error)
        setLogging(false)

      }
    } else {
      setCADMessage("Preencha todos os campos")
      setTimeout(() => {
        setLogging(false)
        document.querySelector('.inputBlockCAD1').removeAttribute('disabled')
        document.querySelector('.inputBlockCAD2').removeAttribute('disabled')
        document.querySelector('.inputBlockCAD3').removeAttribute('disabled')
        document.querySelector('.inputBlockCAD4').removeAttribute('disabled')
        document.querySelector('#buttonRegister').removeAttribute('disabled')
      }, 1000)
    }
  }

  const callSignIn = async () => {

    let audio = new Audio(require('./assets/audios/buttonclick.mp3'))
    audio.play()
    setLogging(true)
    setConnectionMessage("Conectando ao banco de dados")
    document.querySelector('.inputBlock1').setAttribute('disabled', true)
    document.querySelector('.inputBlock2').setAttribute('disabled', true)
    document.querySelector('.inputBlock3').setAttribute('disabled', true)
    document.querySelector('#buttonSignIn').setAttribute('disabled', true)

    if (window.location.href === "https://battlemode.netlify.app/" || window.location.href === "https://battlemode.netlify.app") {
      setConnectionMessage("DEV MODE: FINDING OFFLINE USER")
      setTimeout(() => {

        const userExists = userTest.find(account => account.username === username)
        setLoggedUser(userExists)
        localStorage.setItem('offline', JSON.stringify(userExists.id))
        setConnectionMessage("Bem-vindo de volta " + userExists.username)
        setTimeout(() => {
          navigate("/home");
        }, 600)
      }, 2700);
    } else {

      // fetch aqui
      if (connection === true) {
        const [response] = await Promise.all([
          fetch('http://' +  process.env.REACT_APP_SERVER + ':' + process.env.REACT_APP_PORT + '/api/user'),
        ]);
        const [user] = await Promise.all([
          response.json(),
        ])
        setUsers(user.data)

        setConnectionMessage("Procurando por usuário")
        try {
          setTimeout(() => {

            const userExists = users.find(account => account.username === username)
            if (userExists) {
              // Verificar se a senha está correta
              if (userExists.password === password) {
                setLoggedUser(userExists)
                localStorage.setItem('dasiBoard', JSON.stringify(userExists.id))
                setConnectionMessage("Bem-vindo de volta " + userExists.username)
                setTimeout(() => {
                  navigate("/home");
                }, 600)
              } else {

                setConnectionMessage("Usuário ou senha incorreto")
                setLogging(false)

              }

            } else {
              setConnectionMessage("Usuário ou senha incorreto")
              setTimeout(() => {
                document.querySelector('.inputBlock1').removeAttribute('disabled')
                document.querySelector('.inputBlock2').removeAttribute('disabled')
                document.querySelector('.inputBlock3').removeAttribute('disabled')
                document.querySelector('#buttonSignIn').removeAttribute('disabled')

                setLogging(false)
              }, 1600)
            }
          }, 600)

        } catch (error) {
        }
      } else {

        setConnectionMessage("Unable to reach servers")
        setTimeout(() => {
          document.querySelector('.inputBlock1').removeAttribute('disabled')
          document.querySelector('.inputBlock2').removeAttribute('disabled')
          document.querySelector('.inputBlock3').removeAttribute('disabled')
          document.querySelector('#buttonSignIn').removeAttribute('disabled')
          document.querySelector('#buttonSignUp').removeAttribute('disabled')

          setLogging(false)
        }, 1600)
      }
    }
  }

  return (
    <div className="divContainerLoginScreen">

      <iframe src='https://olafwempe.com/mp3/silence/silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style={{ display: 'none' }}></iframe>
      <div className="divMainBodyLoginScreen">

        {/* Parte do Video */}
        <div className="divVideoBodyLoginScreen">
          <div className="videoLoginShadow"></div>
          <img className="StaticImage" src={require('./assets/images/StaticImage.png')} />
          <video className="videoSeasonIntro" loop src={require(`./assets/videos/seasonintro${number}.mp4`)} autoPlay={true} type="video/mp4"></video>
          <div className="animationButton">
            <label><input onClick={() => setCheckStateAnim(!checkStateAnim)} checked={checkStateAnim} type="checkbox"></input>Disable animation</label>
            <label><input onClick={() => setCheckStateMusic(!checkStateMusic)} checked={checkStateMusic} type="checkbox"></input>Disable Music</label>
          </div>
        </div>

        {pageState &&
          /* Parte do Login */
          <div className="divUserBodyLoginScreen">

            <img className="responsiveBmLogo" style={{ width: "14vw" }} src={require("./assets/images/BMlogo.png")} />
            <h2>Entrar</h2>
            <input className="inputBlock1" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="USERNAME"></input>
            <input className="inputBlock2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="PASSWORD"></input>
            <label className="staySignedIn"><input className="inputBlock3" type="checkbox"></input>Continuar conectado</label>
            {logging &&
              <div style={{ position: "absolute", bottom: "22%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img className="loadingSpinner" src={require('./assets/images/spinner.png')} />
                <h3 id="statusLoging">{connectionMessage}</h3>
              </div>
            }

            {/* Botão de CADASTRO */}
            <div className='divButtonSignUp' onClick={async (e) => {
              setpageState(false)
              try {
                const response = await fetch('http://localhost:6090/api/user')
                const data = response.json()
                data.then(val => {
                  setUsers(val.data)
                })
              } catch (error) {
              }
            }}>
              <label className="labelSignUp">Fazer o cadastro</label>
            </div>

            {/* Botão de ENTRAR */}
            <div className='divButtonSignIn' onClick={(e) => {
              callSignIn()
            }}>

              <button onMouseOver={() => {
                let audio = new Audio(require('./assets/audios/buttonhover.mp3'))
                audio.play()
              }}
                id='buttonSignIn' className="inputBlock" disabled ><label className="labelSignIn">ENTRAR</label></button>
            </div>
            <p className='dataVersion'>{data.version}</p>
          </div>
        }
        {!pageState &&
          /* Parte do Cadastro */
          <div className="divUserBodyLoginScreen">

            <img style={{ width: "14vw" }} src={require("./assets/images/BMlogo.png")} />
            <h2>Cadastro</h2>
            <input className="inputBlockCAD1" value={usernameCAD} onChange={(e) => { setUsernameCAD(e.target.value); verifyCredentials('username') }} onKeyDown={(e) => verifyCredentials('username')} onMouseLeave={(e) => verifyCredentials('username')} type="text" placeholder="USERNAME"></input>
            <label id="StatusUsernameCAD">{UsernameStatus}</label>
            <input className="inputBlockCAD2" value={emailCAD} onChange={(e) => { setEmailCAD(e.target.value); verifyCredentials('email') }} onKeyDown={(e) => verifyCredentials('email')} onMouseLeave={(e) => verifyCredentials('email')} type="text" placeholder="EMAIL"></input>
            <label id="StatusEmailCAD">{EmailStatus}</label>
            <input className="inputBlockCAD3" value={passwordCAD} onChange={(e) => { setPasswordCAD(e.target.value); verifyCredentials('password') }} onKeyDown={(e) => verifyCredentials('password')} onMouseLeave={(e) => verifyCredentials('password')} type="password" placeholder="PASSWORD"></input>
            <label id="StatusPasswordCAD">{PasswordStatus}</label>
            <input className="inputBlockCAD4" value={ConfirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); verifyCredentials('confirm') }} onKeyDown={(e) => verifyCredentials('confirm')} onMouseLeave={(e) => verifyCredentials('confirm')} type="password" placeholder="CONFIRM PASSWORD"></input>
            <label id="StatusConfirmCAD">{ConfirmStatus}</label>


            {logging &&
              <div style={{ position: "absolute", bottom: "20%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img className="loadingSpinner" src={require('./assets/images/spinner.png')} />
                <h3 id="statusLoging">{CADMessage}</h3>
              </div>
            }

            {/* Botão de VOLTAR */}
            <div className='divButtonSignUp' onClick={(e) => {
              setpageState(true)
            }}>
              <label className="labelSignUp">Voltar ao login</label>
            </div>

            {/* Botão de CADASTRAR */}
            <div className='divButtonSignIn'>

              <button onClick={() => {
                callRegister()
                let audio = new Audio(require('./assets/audios/buttonclick.mp3'))
                audio.play()
              }}
                id='buttonRegister' className="inputBlock"  ><label className="labelSignIn">CADASTRAR</label></button>
            </div>
            <p className='dataVersion'>{data.version}</p>
          </div>
        }
      </div>
    </div>
  )
}



export default LandingPageDev;