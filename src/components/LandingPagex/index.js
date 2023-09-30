import React from 'react';
import './index.css';

import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

function hideNavbar(funcNav) {
  funcNav(false);
}

function LandingPageDev(props) {
  hideNavbar(props.funcNav);
  return (
    <div className='divMainLanding'>
      <div className='divMainLandingPageNavbar'>
        <button
          id='loginButton'
          onClick={() => {
            window.location.href = './login';
          }}
          className='buttonNavbar'
        >
          Entrar
        </button>
        <button
          id='cadastroButton'
          onClick={() => {
            window.location.href = './cadastro';
          }}
          className='buttonNavbar'
        >
          Cadastrar-se
        </button>
      </div>
      <div className='divDivisaoTelasLandingPage'>
        <div className='divImgInfoLandingPage'>
          <img className='logoL' src={require('./assets/logo.png')}></img>
          <h1 className='h1_Animate'>O caminho para a gloria começa aqui</h1>
          <p>Prepare-se para o desafio à frente! Junte-se a uma equipe e encare os vários torneios criados pela comunidade!</p>
          <button onClick={() => {
            window.location.href = './now';
          }}>Continuar</button>

          <div className='divIconsRedesLandingPage'>
            <a href='https://github.com/ravusvbs/BattleMode'>
              <GitHubIcon
                sx={{ height: '56.16px', width: '56.16px', color: '#fc6b03' }}
              ></GitHubIcon>
            </a>

            <a href='https://x.com/'>
              <TwitterIcon
                sx={{ height: '56.16px', width: '56.16px', color: '#fc6b03' }}
              ></TwitterIcon>
            </a>

            <a href=''>
              <img
                className='discord'
                src={require('./assets/discord.png')}
              ></img>
            </a>
          </div>
        </div>
        <div className='divVideoLandingPage'>
          <video
            loop
            autoPlay={true}
            muted
            src={require('./assets/video.mp4')}
            type='video/mp4'
          >
          </video>
        </div>
        {/* <img src={require('./assets/Capturar.PNG')} className='imgMundoSenai'/> */}
      </div>
    </div>
  );
}

export default LandingPageDev;