import './index.css'
import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';


export const closeModal = (titulo, corpo, funcao) => {
    // Adição dos Textos inseridos pelos props.
    const modalTitulo = document.querySelector('.modalTitulo');
    const modalCorpo = document.querySelector('.modalCorpo');
    modalCorpo.textContent = corpo;

    // Adicionar icones no titulo
    const removeAllIcons = () => {
        modalTitulo.classList.remove('erro-png');
        modalTitulo.classList.remove('check-png');
        modalTitulo.classList.remove('spin-gif');
    };
    if (titulo === 'spin') {
        removeAllIcons();
        modalTitulo.classList.remove('spin-gif');
    } else if (titulo === 'erro') {
        removeAllIcons();
        modalTitulo.classList.add('erro-png');
        console.log('barloading');
    } else if (titulo === 'success') {
        removeAllIcons();
        modalTitulo.classList.add('check-png');
    }

    // Verificar se o Modal terá função OU não.
    const modalButton = document.querySelector('.modalButton');
    if (funcao === false || funcao === null || funcao === 'barLoading') {
        modalButton.style.display = 'none';
    } else {
        modalButton.style.display = 'block';
        modalButton.textContent = funcao;
    }

    // Animação da barra de fechamento
    if (funcao === 'barLoading') {
        const barProgressionClosingI = document.querySelector('.barProgressionClosingI');
        barProgressionClosingI.classList.add('Anwidth');
    }

    // Finalização
    setTimeout(() => {
        const divModalContainer = document.querySelector('.divModalContainer');
        divModalContainer.classList.add('opacityReverse');
        setTimeout(() => {
            divModalContainer.style.display = 'none';
            divModalContainer.classList.remove('opacityReverse');
            const barProgressionClosingI = document.querySelector('.barProgressionClosingI');
            barProgressionClosingI.classList.remove('Anwidth');
        }, 460);
    }, 1000);
}

const fecharImm = () => {
    document.querySelector('.divModalContainer').classList.add('opacityReverse')
    setTimeout(() => {
        document.querySelector('.divModalContainer').style.display = 'none'
        document.querySelector('.divModalContainer').classList.remove('opacityReverse')
        document.querySelector('.barProgressionClosingI').classList.remove('Anwidth')
    }, 460)
}

export const showModal = (titulo, corpo, funcao) => {
    // Adição dos Textos inseridos pelos props.
    const modalTitulo = document.querySelector('.modalTitulo');
    const modalCorpo = document.querySelector('.modalCorpo');
    modalCorpo.textContent = corpo;

    // Adicionar icones no titulo
    const removeAllIcons = () => {
        modalTitulo.classList.remove('erro-png');
        modalTitulo.classList.remove('check-png');
        modalTitulo.classList.remove('spin-gif');
    };
    if (titulo === 'spin') {
        removeAllIcons();
        modalTitulo.classList.add('spin-gif');
    } else if (titulo === 'erro') {
        removeAllIcons();
        modalTitulo.classList.add('erro-png');
    } else if (titulo === 'success') {
        removeAllIcons();
        modalTitulo.classList.add('check-png');
    }

    // Verificar se o Modal terá função OU não.
    const modalButton = document.querySelector('.modalButton');
    if (funcao === false || funcao === null || funcao === 'barLoading') {
        modalButton.style.display = 'none';
    } else {
        modalButton.style.display = 'block';
        modalButton.textContent = funcao;
    }

    if (funcao === 'barLoading') {
        const barProgressionClosingI = document.querySelector('.barProgressionClosingI');
        barProgressionClosingI.classList.add('Anwidth');

        // Finalização com a Barra de Loading
        setTimeout(() => {
            const divModalContainer = document.querySelector('.divModalContainer');
            divModalContainer.classList.add('opacityReverse');
            setTimeout(() => {
                divModalContainer.style.display = 'none';
                divModalContainer.classList.remove('opacityReverse');
                barProgressionClosingI.classList.remove('Anwidth');
            }, 460);
        }, 1000);
    }

    // Animação de aparição
    const divModalContainer = document.querySelector('.divModalContainer');
    divModalContainer.style.display = 'flex';
    divModalContainer.classList.add('opacity');
    setTimeout(() => {
        divModalContainer.classList.remove('opacity');
    }, 500);
}

function ModalCustom(props) {

    return (
        <div className="divModalContainer" style={{ borderColor: props.cor }}>
            <div className="divModalContent" style={{ borderColor: props.cor }}>
                <div className='divCloseButton' style={{ borderColor: props.cor + ' !important' }}>
                    <button className='closeButton' onClick={fecharImm} style={{ borderColor: props.cor }}>
                        <IoIosClose style={{
                            color: props.cor,
                            fontSize: '50px',
                            display: 'flex',
                            alignSelf: 'flex-end',
                            float: 'right'
                        }} />
                    </button>
                </div>
                <label className='modalTitulo' style={{ borderColor: props.cor }} />
                <h5 className='modalCorpo' style={{ borderColor: props.cor }}></h5>
                <div style={{ borderColor: props.cor }}>
                    <button className='modalButton' onClick={() => closeModal('success', 'Você está participando do torneio', null)}></button>
                </div>
                <div className='barProgressionClosing'>
                    <div className='barProgressionClosingI' style={{ backgroundColor: props.cor }} />
                </div>
            </div>
        </div>
    )
}


export default ModalCustom