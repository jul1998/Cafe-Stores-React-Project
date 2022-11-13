import React, {useContext, useEffect, useState} from "react"
import {Context} from "../store/appContext"
import {useParams, Link } from 'react-router-dom';
import "../../styles/home.css";

function UserProfileComponent({userEmail}){
    const params = useParams()
    const {store, actions} = useContext(Context)
    const [cafeStoreList, setCafeStoreList] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [favoriteCafeList, setFavoriteCafeList] = useState([])

    
    useEffect(()=>{
        async function fetchData (){
            let response = await actions.genericFetch("cafe_list")
            setCafeStoreList(response)

        }
        fetchData()

    },[])

    function addFavorite(item){
        setFavoriteCafeList(prevList=>[...prevList,item])
    }

    function removeFavorite(card){
        setFavoriteCafeList((current) =>
            current.filter((item) => item.id !== card.id))
    }

    console.log(favoriteCafeList)


    return(

        <div>
            {!localStorage.getItem("token")? <div>No current token</div>:
            <div>
                <h2>Login profile from {userEmail}</h2>
                <button onClick={() => setIsClicked(false)}>Hide cafe stores</button>
                <button onClick={()=>setIsClicked(true)}>Click here to see cafe stores</button>
                <div className="list_cafes">
                {isClicked?cafeStoreList.map((item,index) =>{
                return(
                <div className="list_stores" key={index}>
                    <div  className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div id="card" className="card h-100">
                        <img src={item.img_url} className="card-img-top" alt="..."/>
                            <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <i style={{color: "red", paddingLeft: "10px"}} onClick={()=>addFavorite(item.name)} className="fa-solid fa-heart"></i>
                            <i  style={{paddingLeft: "10px"}} onClick={()=> removeFavorite(item.id)}  className="fa-regular fa-x"></i>
                            </div>
                        </div>
                    </div>
                </div>

                </div>)}):null}
                </div>
                
                
                
            </div>
            
            
            }
        </div>
    )  
}

export {UserProfileComponent}