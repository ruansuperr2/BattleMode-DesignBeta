import React from 'react'
import './index.css'
import { HiX } from 'react-icons/hi'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'

function Integrante() {
    const [inputProcurar, setInputProcurar] = useState('')
    const [jogadores, setJogadores] = useState([])

    const handleChange = e => {
        setInputProcurar(e.target.value)
    }

    const addJogador = nomeJogador => {
        setJogadores([...jogadores, { id: jogadores.length + 1, username: nomeJogador }])
        setInputProcurar('')
    }

    const handleRemove = id => {
        const novaListaJogadores = jogadores.filter((item) => item.id !== id)
        setJogadores(novaListaJogadores)
    }

    return (
        <>
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
                        <div className='cardBody' key={item.id}>
                            <div className='userIcon'/>
                            <span className='userName'><a href='#'>{item.username}</a></span>
                            <button 
                                className='buttonRemoveJogador'
                                onClick={() => handleRemove(item.id)}><HiX style={{fontSize: '20px', color: '#fc6b03'}}/></button>
                        </div>
                    ))}
            </div>
        </>
    )
}
export default Integrante