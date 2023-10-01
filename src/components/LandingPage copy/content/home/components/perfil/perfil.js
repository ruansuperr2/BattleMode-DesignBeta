
import './perfil.css'
export default function Perfil(props) {
    return (
        <div className='perfilDivSection'>
            <div className='perfilNavbar'>
                <label>{props.loggedUser.username}</label>
                <label>Equipes</label>
                <label>Torneios</label>
                <label>Amigos</label>
                <label>Conquistas</label>
            </div>
            <div className='divMainBodyPerfil'>
                <div className='userProfileBanner'>
                    <div>
                        <video poster={props.loggedUser.icon} src={props.loggedUser.icon}></video>
                        <label>
                            {props.loggedUser.username}
                        </label>
                    </div>
                    <div className='trimProfileBanner'></div>
                </div>
            </div>
        </div>
     )
}