import React, {useContext,useEffect, useState} from "react"
import {Context} from "../store/appContext"
import {useParams } from 'react-router-dom';
import {UserProfileComponent} from "../component/UserProfileComponent.jsx"

function UserProfile(){
    const params = useParams()
    const {store, actions} = useContext(Context)
    const [userEmail, setUserEmail] = useState("asd")

    useEffect(()=>{
        async function fetchData (){
            let response = await actions.genericFetchProtected("get_users", "POST", params.userId)
            console.log(response.email)
            setUserEmail(response.email)
        }
        fetchData()
    },[])
    

    return(
        <div>
            <UserProfileComponent userEmail={userEmail}/>
            
        </div>
    )  
}

export {UserProfile}