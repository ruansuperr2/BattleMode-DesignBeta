import React, { useEffect, useState, useRef } from 'react'
import './index.css'




let able = 0

export default function NewHome() {
    const DEFAULT_COLOR = '#fc6b03'
    let root = document.querySelector(':root')

    
    // Define os estados iniciais para os valores de página e slide atuais.
    const [currentPage, setCurrentPage] = useState('PageOne')
    const [currentSlide, setCurrentSlide] = useState('slideOne')


    // Use um useRef para armazenar o ID do temporizador atual.
    const timerId = useRef(null)

    const callPageChanger = () => {
        try {
            const pages = document.querySelectorAll('.pageNumber')
            const containerPages = document.querySelectorAll('.containerPageHomeContent')

            // Adiciona a classe "currentPageHome" ao elemento da página atual e
            // remove a classe "currentPageHome" dos outros elementos de página.
            for (const page of pages) {
                if (page.classList.contains(`${currentPage}`)) {
                    page.classList.add('currentPageHome')
                    
                } else {
                    page.classList.remove('currentPageHome')
                }
            }

            // Faz o conteúdo da página atual rolar suavemente para a visão.
            for (const containerPage of containerPages) {
                if (containerPage.classList.contains(`container${currentPage}HomeContent`)) {
                    containerPage.scrollIntoView({
                        behavior: 'smooth'
                    }, 500)
                }
            }
        } catch {
            // Trata o erro aqui, se necessário.
        }
    }

    const callSlideChanger = () => {
        // Encontra os elementos do slide atual e dos demais slides.
        const currentSlideElement = document.querySelector(`.${currentSlide}`)
        const otherSlideElements = document.querySelectorAll('.divSliderPage')

        // Define a largura do slide atual para 100% e a largura dos outros slides para 0%.
        for (const slideElement of otherSlideElements) {
            if (slideElement === currentSlideElement) {
                slideElement.style.width = '100%'
            } else {
                slideElement.style.width = '0%'
            }
        }

        // Atualiza o conteúdo do lado direito do slide com o conteúdo do slide atual.
        switch (currentSlide) {
            case 'slideOne':
                document.querySelector('.dotOneSlide').classList.add('currentPageHome')
                document.querySelector('.dotTwoSlide').classList.remove('currentPageHome')
                document.querySelector('.dotThreeSlide').classList.remove('currentPageHome')
                document.querySelector('.sliderRightTitle').textContent = 'O perfil do seu jeito!'
                document.querySelector('.sliderRightFirstText').textContent = `Visual é tudo, e aqui você poderá fazer o perfil com a sua cara, podendo personalizar quaisquer aspectos para uma experiência diferente`
                document.querySelector('.sliderRightSecondText').textContent = `O potêncial de todos os jogadores pode ser liberado através de uma pequena mudança de cor, talvez o seu perfil chame a atenção de um Chefe de Equipe e te convide para a próxima temporada de BattleMode Racing?`
                break
            case 'slideTwo':
                document.querySelector('.dotOneSlide').classList.remove('currentPageHome')
                document.querySelector('.dotTwoSlide').classList.add('currentPageHome')
                document.querySelector('.dotThreeSlide').classList.remove('currentPageHome')
                document.querySelector('.sliderRightTitle').textContent = 'A equipe dos sonhos!'
                break
            case 'slideThree':
                document.querySelector('.dotOneSlide').classList.remove('currentPageHome')
                document.querySelector('.dotTwoSlide').classList.remove('currentPageHome')
                document.querySelector('.dotThreeSlide').classList.add('currentPageHome')
                document.querySelector('.sliderRightTitle').textContent = 'Jogos incríveis!'
                break
            default:
                // Define o conteúdo padrão para o lado direito do slide.
                document.querySelector('.sliderRightTitle').textContent = 'Bem-vindo ao nosso site!'
        }
    }

    useEffect(() => {
        callPageChanger()
        callSlideChanger()
    }, [currentPage, currentSlide])

    const [data, setData] = useState({})
    const [loggedUser, setLoggedUser] = useState(undefined)
    useEffect(() => {
        const loadData = async () => {
            try {
                const [jogoResponse, torneioResponse, userResponse] = await Promise.all([
                    fetch('http://localhost:6090/api/jogo'),
                    fetch('http://localhost:6090/api/torneio'),
                    fetch('http://localhost:6090/api/user/' + JSON.parse(localStorage.getItem('dasiBoard'))),
                ]);
                const [jogoData, torneioData, userData] = await Promise.all([
                    jogoResponse.json(),
                    torneioResponse.json(),
                    userResponse.json()
                ]);
                setData({ jogo: jogoData.data, torneio: torneioData.data });
                setLoggedUser(userData.data);
                root.style.setProperty("--customPageColor", loggedUser.corS)

            } catch (e) {
                if (JSON.parse(localStorage.getItem('dasiBoard')) === null) {
                    const [jogoResponse, torneioResponse] = await Promise.all([
                        fetch('http://localhost:6090/api/jogo'),
                        fetch('http://localhost:6090/api/torneio'),
                    ]);
                    const [jogoData, torneioData] = await Promise.all([
                        jogoResponse.json(),
                        torneioResponse.json(),
                    ]);
                    setData({ jogo: jogoData.data, torneio: torneioData.data });
                    root.style.setProperty("--customPageColor", DEFAULT_COLOR)
                }
            }
        }

        loadData()
    }, [])


    return (
        <div className="containerNewHome">
            {/* <Navbar page='home'/> */}
            <div className="paddingLeft paddingTop containerNewHome">
                <div>
                    <div className="containerPageHome">
                        <div className="containerPageHomeContent containerPageOneHomeContent ">
                            <div className="miniDivider"></div>
                            <label className='labelTorneios'><img className='logoLabel' src={require("./logo.png")} style={{ marginRight: '1rem', height: '6rem', width: '6rem' }} />PRÓXIMOS EVENTOS</label>
                            <div className='tourneamentHighlightContainer'>
                                {data.torneio && data.torneio.slice(-3).map((findTorneio) => {

                                    return <div onClick={() => { window.location.href = `./t/${findTorneio.id}` }} key={findTorneio.id} style={{ backgroundImage: `url(${findTorneio.thumbnail})` }} className='tourneamentHighlighted bigTourneamentHiglightOne'>
                                        <div className='tourneamentHighlitedDecoration'></div>


                                        <label><img src={findTorneio.logo} alt='img' />{findTorneio.nome}</label>
                                    </div>

                                })}
                            </div>
                            <label className='labelAskingPageOneHome'>
                                <label>Ficou interessado em algum evento? </label>
                                <label>Faça <a href='./login' style={{ color: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>login agora</a> e veja torneios de vários jogos e modalidades!</label>
                            </label>
                        </div>
                        <div className='containerDivider containerTwoDivider' />
                        <div className="containerPageHomeContent containerPageTwoHomeContent" >

                            <div className="miniDivider"></div>
                            {/* <div className="labelPageTwoHome"></div> */}

                            <label className='labelTorneios'><img className='logoLabel' src={require("./logo.png")} style={{ marginRight: '1rem', height: '6rem', width: '6rem' }} />TORNEIOS DE FAVORITOS</label>
                            <div className='gamesHighlightContainer paddingTop'>
                                {data.jogo && data.jogo.slice(-4).map((findGame) => {

                                    return <div onClick={() => { window.location.href = `./feed/${findGame.id}` }} style={{ backgroundImage: `url(${findGame.imgFundo})` }} className='gameHighlighted bigGameHiglightTwo'>
                                        <div className='gameHighlitedDecoration'></div>
                                        {/* <div className='tourneamentHighlitedImgTwo'></div> */}
                                    </div>

                                })}
                            </div>
                            <label className='labelAskingPageOneHome'>
                                <label>E essa lista só aumenta! </label>
                                <label>Faça <a href='./login' style={{ color: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>login agora</a> e adicione o seu jogo favorito para o seu perfil!</label>
                            </label>
                        </div>
                        <div className='containerDivider containerThreeDivider' />
                        <div className="containerPageHomeContent containerPageThreeHomeContent" >

                            <div className="miniDivider"></div>
                            <label className='labelTorneios'><img className='logoLabel' src={require("./logo.png")} style={{ marginRight: '1rem', height: '6rem', width: '6rem' }} />PERSONALIZE COM SUA IDENTIDADE</label>
                            <div className='customizationSliderHighlightContainer' style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>
                                <div className='divContainerSliderNewHome' style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>

                                    <div className='customizationSliderImageSlide' style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>

                                        <div className='divContainerSliderPages'>
                                            <div className='divSliderPage slideOne'>

                                            </div>
                                            <div className='divSliderPage slideTwo'>

                                            </div>
                                            <div className='divSliderPage slideThree'>

                                            </div>
                                        </div>
                                        <div className='sliderDots'>
                                            <div onClick={() => {
                                                setCurrentSlide('slideOne')
                                                callSlideChanger()
                                            }} className='dotsFromSlide dotOneSlide' />
                                            <div onClick={() => {
                                                setCurrentSlide('slideTwo')
                                                callSlideChanger()
                                            }} className='dotsFromSlide dotTwoSlide' />
                                            <div onClick={() => {
                                                setCurrentSlide('slideThree')
                                                callSlideChanger()
                                            }} className='dotsFromSlide dotThreeSlide' />
                                        </div>
                                    </div>
                                    <div className='customizationSliderTextSlide' style={{ borderColor: loggedUser ? loggedUser.corP : DEFAULT_COLOR }}>
                                        <div className='sliderTextConteiner'>
                                            <h2 className='sliderRightTitle'>Titulo</h2>
                                        </div>
                                        <div className='sliderTextConteiner'>
                                            <p className='sliderRightFirstText'>Visual é tudo, e aqui você poderá fazer o perfil com a sua cara, podendo personalizar quaisquer aspectos para uma experiência diferente</p>
                                            <p className='sliderRightSecondText'>O potêncial de todos os jogadores pode ser liberado atravez de uma pequena mudança de cor, talvez o seu perfil chame a atenção de um Chefe de Equipe e te convide para a próxima temporada de BattleMode Racing? </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className="containerPagesSelector">
                <div onClick={() => {
                    setCurrentPage('PageOne')
                    callPageChanger()

                }} className="pageSelector pageNumber PageOne currentPageHome" ></div>
                <div onClick={() => {
                    setCurrentPage('PageTwo')
                    callPageChanger()

                }} className="pageSelector pageNumber PageTwo" ></div>
                <div onClick={() => {
                    setCurrentPage('PageThree')
                    callPageChanger()

                }} className="pageSelector pageNumber PageThree" ></div>
            </div>
        </div>
    )
}