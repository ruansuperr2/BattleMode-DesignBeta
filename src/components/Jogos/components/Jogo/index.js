export default function Jogo(props){
    return(
        <div className='divJogosSubContainer'>
            <div className='divJogosContainer'>
                <div className='divJogosImg' style={{backgroundImage: props.capa}}/>
                <div>
                    <div className="addButton"/>
                    <h5>{props.nome}</h5>
                    <p>O texto informativo é um texto em que o escritor expõe brevemente um tema, fato ou circunstância ao leitor.</p>
                </div>
            </div>
        </div>
    )
}