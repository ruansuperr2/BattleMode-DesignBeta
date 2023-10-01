
import './perfil.css'
export default function Perfil(props) {
    return (
        <div className='perfilDivSection'>
            {console.log()}
            <div className='perfilNavbar'>
                <label>{props.loggedUser.username}</label>
                <label>Equipes</label>
                <label>Torneios</label>
                <label>Amigos</label>
                <label>Conquistas</label>
            </div>
            <div className='divMainBodyPerfil' style={{ backgroundImage: `url(${props.loggedUser.imgFundo})` }}>
                <div className='userProfileBanner' style={{
                    borderRight: `${props.loggedUser.corP} solid 1px`
                }} >
                    <div>
                        <div className='userProfileIcon'>
                            <img src={require('../../../../assets/images/borders/rose_border.png')} alt=""></img>
                            <video poster={props.loggedUser.icon} src={props.loggedUser.icon}></video>
                        </div>
                        <label>
                            {props.loggedUser.username}
                        </label>
                    </div>
                    <div className='trimProfileBanner'>
                        <label>{props.loggedUser.status}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}