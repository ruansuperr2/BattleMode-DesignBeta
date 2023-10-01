import { useEffect, useState } from 'react';
import "./games.css"

export default function Games(props) {

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [numeroPaginas, setNumeroPaginas] = useState(
        0
    );

    // Renderiza os jogos na página atual
    const jogosAtual = props.jogos.slice(
        (paginaAtual - 1) * 9,
        paginaAtual * 9
    );

    useEffect(() => {
        setNumeroPaginas(
            Math.ceil(props.jogos.length / 9)
        )
        if (props.jogos.length > 1) {
            document.querySelector(`#slide-${props.jogos[0].id}`).style.width = "100%";
            document.querySelector(`#slide-${props.jogos[1].id}`).style.width = "0%";
            document.querySelector(`#slide-${props.jogos[2].id}`).style.width = "0%";

            let currentSlide = 0;

            function nextSlideX() {
                if (props.currentPage === 'inicio') {
                    currentSlide++;
                    if (currentSlide > 2) {
                        currentSlide = 0;
                    }
                    setTimeout(() => {
                        if (document.querySelector(`#slide-${props.jogos[currentSlide].id}`) === null) {
                        } else {
                            document.querySelector(`#slide-${props.jogos[0].id}`).style.width = "0%";
                            document.querySelector(`#slide-${props.jogos[1].id}`).style.width = "0%";
                            document.querySelector(`#slide-${props.jogos[2].id}`).style.width = "0%";

                            let doc = document.querySelector(`#slide-${props.jogos[currentSlide].id}`);

                            doc.style.width = "100%";
                        }
                    }, 100);
                }
            }

            // Iniciar o slideshow
            let nextSlide = setInterval(nextSlideX, 6000);


            return () => {
                clearInterval(nextSlide);
            };
        }
    }, [props.currentPage, props.jogos]);


    return (
        <div className='divGamesBodyContainer'>
            <div className="divSlideGamesBodyContainer">
                {props.jogos &&
                    props.jogos.slice(0, 3).map((jogo) => (
                        <div key={jogo.id} className='divSliderGames' id={'slide-' + jogo.id}>
                            <div className='divSliderContainer'>
                                <video poster={jogo.imgFundo} src={jogo.imgFundo} autoPlay loop />
                                <div className='divSliderGameDescricao'>
                                    <div className='boxShadowSlider' />
                                    <video poster={jogo.imgBackground} src={jogo.imgBackground} autoPlay loop />
                                    <label>{jogo.descricaoBreve}</label>
                                    <h5>{jogo.nome}</h5>
                                    <p>{jogo.descricaoLonga}</p>
                                    <button>TORNEIOS</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <h2 className="h2Nossa">BIBLIOTECA DE JOGOS</h2>
            <div className='divGamesMainContainer'>
                {jogosAtual &&
                    jogosAtual.map((jogo) => (
                        <div key={jogo.id} className='divGamesSubContainer' id={jogo.id}>
                            <div className='divGamesContainer'>
                                <video poster={jogo.imgFundo} src={jogo.imgFundo} autoPlay loop />
                                <div className='divGameDescricao'>
                                    <h5>{jogo.nome}</h5>
                                    <p>{jogo.descricaoLonga}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className='divBtnPgCh'>
                <button disabled={paginaAtual === 1} className='btnPgDn btnPgCh' onClick={() => setPaginaAtual(paginaAtual - 1)}>
                    {'<'}
                </button>

                <div className="paginacao">
                    {Array(numeroPaginas).fill(null).map((pagina, index) => (
                        <button
                            key={index}
                            onClick={() => setPaginaAtual(index + 1)}
                            disabled={index === paginaAtual - 1}
                            style={
                                pagina === paginaAtual
                                    ? { backgroundColor: "red", color: "white" }
                                    : {}
                            }
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                {console.log(jogosAtual, numeroPaginas, Array(numeroPaginas).fill(null))}
                <button disabled={paginaAtual === Array(numeroPaginas).fill(null).length} className='btnPgUp btnPgCh' onClick={() => setPaginaAtual(paginaAtual + 1)}>
                    {'>'}
                </button>
            </div>
            <div className="divMainCTW">
                <h2 className='h2Nossa'>AMPLAS POSSIBILIDADES</h2>
                <div>
                    <div>
                        <h3>Crie o perfil do seu jeito</h3>
                        <label>Personalize o seu perfil de acordo com as suas preferências</label>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Busque ou forme a sua equipe ideal</h3>
                        <label>Junte amigos e crie a equipe perfeita!</label>
                    </div>
                </div>
                <div>

                    <div>
                        <h3>Participe de uma competição memorável</h3>
                        <label>Quem não gosta de se divertir e ser recompensado?</label>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Estabeleça novas amizades</h3>
                        <label>A amizade é um valor essencial, conheça novos indivíduos!</label>
                    </div>
                </div>
            </div>
        </div>
    )
}