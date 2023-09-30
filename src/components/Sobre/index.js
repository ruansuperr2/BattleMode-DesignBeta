import React, {useState} from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
// import { Dropdown } from './components/dropdown'
import './index.css'

function Sobre() {
    const [value, setValue] = useState('Duvidas? Selecione a sua pergunta no botão acima.')

    const options = [
        { label: 'Não consigo entrar em um torneio, o que devo fazer?', value: 'Verifique se o seu time está em ordem para entrar no torneio, é possível que o torneio esteja cheio ou em andamento. Todo problema que pode aparecer pode ser resolvido pelo organizador do torneio ou pelo suporte da BattleMode™' },
        { label: 'Tomei punição em um jogo, como eu faço para continuar jogando os torneios', value: 'Se você sofreu alguma punição durante, antes ou depois de um torneio, a organização do torneio e a equipe BattleMode™ não deverá ser responsabilidade por isso, todos os jogadores e organizadores concordam em seguir as regras dos jogos durante um torneio.' },
        { label: 'Não consigo chamar meus amigos para o time.', value: 'Verifique se esse usuário realmente existe, se o problema persistir, contate o suporte da BattleMode™.' },
    ]

    const handleChange = (event) => {
      setValue(event.target.value)
    }


    return (
        <div className="divMainContainerD">
            {/* <Navbar page="about"/> */}
            
            <div className='divMainContainerSobre paddingLeft'>
                <img className='divFundoDropdown' src={require('./assets/fundo.png')}/>
                <div className='divDropdown'>
                    {/* <Dropdown
                        label="FAQ - Perguntas Frequentes"
                        key={'index'}
                        options={options}
                        value={value}
                        onChange={handleChange}
                    /> */}
                    {/* <p className='valueDropdown'>{value}</p> */}
                    <h2 className='FAQ'>FAQ - Perguntas Frequentes</h2>
                    <div>
                        <h4 className='tituloPerguntaFAQ'>Não consigo entrar em um torneio, o que devo fazer?</h4>
                        <p className='respostaFAQ'>Verifique se o seu time está em ordem para entrar no torneio, é possível que o torneio esteja cheio ou em andamento. Todo problema que pode aparecer pode ser resolvido pelo organizador do torneio ou pelo suporte da BattleMode™</p>
                    </div>
                    <div className='questionDivider'/>
                    <div>
                        <h4 className='tituloPerguntaFAQ'>Tomei punição em um jogo, como eu faço para continuar jogando os torneios</h4>
                        <p className='respostaFAQ'>Se você sofreu alguma punição durante, antes ou depois de um torneio, a organização do torneio e a equipe BattleMode™ não deverá ser responsabilidade por isso, todos os jogadores e organizadores concordam em seguir as regras dos jogos durante um torneio.</p>
                    </div>
                    <div className='questionDivider'/>
                    <div>
                        <h4 className='tituloPerguntaFAQ'>Não consigo chamar meus amigos para o time</h4>
                        <p className='respostaFAQ'>Verifique se esse usuário realmente existe, se o problema persistir, contate o suporte da BattleMode™</p>
                    </div>
                    <div className='questionDivider'/>
                </div>
                <div className='divConteudo'>
                    <div className='divImagens'>
                    </div>
                    <div className='divTextoSobre'>
                        <h1 className='sobreTitle'>Sobre BattleMode™</h1>
                        <p>A BattleMode™ permite a você e seus amigos competirem em torneios criados 
                        pela comunidade. Nós, a Inexorabilis Team, temos como objetivo tornar esses 
                        eventos fáceis de criar, intuitivos e altamente customizáveis, tanto para 
                        organizadores quanto participantes. Além disso, também queremos que seu 
                        campeonato ou time cresça no cenário e ganhe visibilidade nas nossas redes sociais.</p>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
        )
}




export default Sobre