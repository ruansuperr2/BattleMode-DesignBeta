import React from 'react'
import './index.css'


function LoginOrUpcomings() {
    return(
        <div className='divMainContainerLoginOrUpcoming'>
            <div className='divMainContainerAskingAccount'>
                <div className="divMainContainerAsking">
                    <h3>Ainda não possui uma conta?</h3>   
                </div>
                
                <div className="divMainContainerChooseAccount">
                    <h3 className="buttonMainContainerChooseRegister">Faça o seu registro agora!</h3>
                    <h2>Ou</h2>
                    <h3 className="buttonMainContainerChooseEnter">Entre agora com a sua conta!</h3>
                </div>
            </div>
            <div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default LoginOrUpcomings