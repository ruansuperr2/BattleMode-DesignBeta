import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './index.css';


function Jogos() {
    const DEFAULT_COLOR = '#fc6b03';
    const [jogos, setJogos] = useState([]);
    const [corBorda, setCorBorda] = useState(DEFAULT_COLOR);

    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [response] = await Promise.all([
                    fetch('http://localhost:6090/api/user/' + JSON.parse(localStorage.getItem('dasiBoard'))),
                ]);
                const [user] = await Promise.all([
                    response.json(),
                ])
                setLoggedUser(user.data)
            } catch (e) {
                console.error(e)
            }
        };

        loadData()

        
        return () => {
            // Limpar qualquer recurso criado na função de efeito
        };
    }, [])
    

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(
                    'http://localhost:6090/api/jogo',
                );
                const data = response.json();
                data.then ((val)=> {
                    setJogos(val.data)
                    console.log(val)
                })
            } catch (error) { }
        };

        loadData()

        
        return () => {
            // Limpar qualquer recurso criado na função de efeito
        };
    }, [])
    // A cor da borda do container do jogo é armazenada na memória

    return (
        <div>
            <div className="paddingLeft divMainJogos">
                <h3 className="titleGames">Biblíoteca de jogos</h3>
                <div className="divJogosMainContainer">
                    {jogos &&
                    jogos.map((jogo) => (
                        <div key={jogo.id} className='divJogosSubContainer' id={jogo.id}>
                            <div className='divJogosContainer' style={{ borderColor: corBorda }}>
                                <img className='divJogosImg' src={jogo.imgFundo} />
                                <div className='nomeDescricao'>
                                    <h5>{jogo.nome}</h5>
                                    <p>{jogo.descricaoLonga}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Jogos;