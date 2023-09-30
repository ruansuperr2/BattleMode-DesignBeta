import React, { useState} from 'react'
import Footer from '../Footer'
import './index.css'
import { useParams } from 'react-router-dom';
import { getListItemUtilityClass } from '@mui/material';

let getUsersTry = 0

export default function FindAll() {

    const [users, setUsers] = useState([])
    const [time, setTime] = useState([])

    const [loggedUser, setLoggedUser] = useState({})

    const { id } = useParams();
    const getUsers = async () => {
        try{
            const responseUsers = await fetch('https://web-production-8ce4.up.railway.app/api/user/')
            const dataUsers = responseUsers.json()
            dataUsers.then(
                (val) => {
                    setUsers(val.data)
                }
            )   

            const responseUser = await fetch('https://web-production-8ce4.up.railway.app/api/user/' + JSON.parse(localStorage.getItem('dasiBoard')))
            const dataUser = responseUser.json()
            dataUser.then(
                (val) => {
                    setLoggedUser(val.data)
                }
            )  
        }catch(error){
        }
    }

    const getTeam = async () => {
        try{
            const responseUsers = await fetch('https://web-production-8ce4.up.railway.app/api/time/')
            const dataUsers = responseUsers.json()
            dataUsers.then(
                (val) => {
                    setTime(val.data)
                }
            )   
        }catch(error){
        }
    }
    
    if(getUsersTry < 2){
        getUsersTry++
        getUsers()
        getTeam()
    }

    if(id === 'u'){
        return (
            <div className="divContainerFindAll">
                <div className='organizeList2'>
                <div className='stylizeLabel'>

                    <a href='/find/u'><label className='usuariosTitle' style={{color: loggedUser.corP}}>USUÁRIOS</label></a><label style={{marginInline: '.5rem'}}> & </label><a href='/find/t'><label className='' style={{color: loggedUser.corP}}>TIMES</label></a>
                </div>
                    <div className='containerSpecificUser paddingLeft'>
                        {
                            users.map( (users) => {
                                    return <div onClick={() => {window.location.href = `/u/${users.username}`}} key={users.id} style={{backgroundImage: `url(${users.imgFundo})`, borderColor: users.corP}} className='userHighlightedFeed bigTourneamentHiglightOne'>
                                    <label><img src={users.icon} alt='img' style={{borderColor: users.corP}}/>{users.username}</label>
                                </div>
                            })
                        }
                    </div>
                </div>
                <Footer/>
            </div>
            )
    }else if(id === 't'){
        return (
            <div className="divContainerFindAll">
                <div className='organizeList2'>
                    <div className='stylizeLabel'>

                        <a href='/find/u'><label className='usuariosTitle' style={{color: loggedUser.corP}}>USUÁRIOS</label></a><label style={{marginInline: '.5rem'}}> & </label><a href='/find/t'><label className='' style={{color: loggedUser.corP}}>TIMES</label></a>
                    </div>
                    <div className='containerSpecificUser paddingLeft'>
                        {
                            time.map( (time) => {
                                    return <div onClick={() => {window.location.href = `/e/${time.nome}`}} key={time.id} style={{backgroundImage: `url(${time.imgFundo})`}} className='userHighlightedFeed bigTourneamentHiglightOne'>
                                    <label><img src={time.logo} alt='img'/>{time.nome}</label>
                                </div>
                            })
                        }
                    </div>
                </div>
                <Footer/>
            </div>
            )
    }else{
        window.location.href = '/find/u'
    }

    
}