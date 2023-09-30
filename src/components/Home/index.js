import React, { useState, useEffect } from 'react'
import './index.css'
import Noticias from './components/Noticias'
import LoginOrUpcomings from './components/LoginOrUpcomings'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useTransition, animated } from 'react-spring'
import { style } from '@mui/system'


function Home() {


    const [imageDotOne, setImageDotOne] = useState(true)
    const [imageDotTwo, setImageDotTwo] = useState(false)
    const [imageDotThree, setImageDotThree] = useState(false)
    const [carrosselImage, setCarrosselImage] = useState('./assets/CSGO.png')

    setTimeout(() => {
        if (imageDotOne === false && imageDotThree === true && imageDotTwo === false) {
            setCarrosselImage('./assets/CSGO.png')
            setImageDotOne(true)
            setImageDotTwo(false)
            setImageDotThree(false);

        } else if (imageDotOne === true && imageDotThree === false && imageDotTwo === false) {
            setCarrosselImage('./assets/F1_2022.png')
            setImageDotOne(false)
            setImageDotTwo(true)
            setImageDotThree(false);

        } else if (imageDotOne === false && imageDotThree === false && imageDotTwo === true) {
            setCarrosselImage('./assets/R6S.png')
            setImageDotOne(false)
            setImageDotTwo(false)
            setImageDotThree(true);

        }
    }, 2000)





    return (
        <div className="divMainContainerHome">
            <Navbar page="Home"/>
            <div className='paddingLeft'>
                <div className="divCarrosselMainContainerHome">
                    <div className="divVideoMainContainerHome">
                        <div className="divVideoShadowMainContainerHome" />
                        <img className='imgPassing' src={require('./assets/passing.png')}/>
                        <img className="imgCarrossel" src={require(`${carrosselImage}`)} />
                        <div className="divDots">
                            <div>
                                <input checked={imageDotOne} type="radio" id="rad1" name="rads"/>
                                <label></label>
                                <input checked={imageDotTwo}  type="radio" id="rad2" name="rads" />
                                <label></label>
                                <input checked={imageDotThree}  type="radio" id="rad3" name="rads" />
                                <label></label>
                            </div>
                        </div>
                    </div>
                </div>
                <Noticias/>
                <div className='divSecondMainContainerHome'>
                    <div className='divSubSecondContainerHome'>
                        <h1>Campeonatos personalizados</h1>
                        <p>Organizar um torneio a mão pode ser uma tarefa complicada, a BattleMode™ permite que você organize-os sem dor de cabeça e com uma personalização incrível, permitindo que o seu campeonato cresce e tenha um maior conhecimento atravez da plataforma BattleMode™</p>
                    </div>

                    <div className='divSubSecondDoisContainerHome'>
                        <img src={require("./assets/logo.png")}/>
                    </div>
                </div>
                <LoginOrUpcomings/>
                <Footer/>
            </div>
        </div>
    )
}

export default Home