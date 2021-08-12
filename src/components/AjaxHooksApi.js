import React, { useState, useEffect } from 'react';

export default function AjaxHooksApi(){

    function Character({avatar,name, gender, status}){
        return(
            
            <div className="col">
                <div className="card">
                <img src={avatar} alt={name} className="card-img-top" />
                <div className="card-body">
                    <h4 className="card-title">{name} </h4>
                    <h6 className="d-inline mt-2">Gender: </h6>
                    <p className="d-inline">{gender} </p>
                    <br/>
                    <h6 className="d-inline">Status: </h6>
                    <p className="d-inline">{status} </p>
                </div>
                </div>
            </div>

        );
    }

    const [characters, setCharacters] = useState([])

    useEffect(() => {
        let url= 'https://rickandmortyapi.com/api/character';
        fetch(url)
            .then((res)=>res.json())
            .then((json)=>{
                console.log(json.results);
                json.results.forEach(el => {
                    let character = {
                        id:el.id,
                        name:el.name,
                        gender:el.gender,
                        avatar:el.image,
                        status:el.status
                    }
                    
                    setCharacters((characters)=>[...characters,character])
                });
            });
            //console.log(character);
        
    }, [])

    return(
        <>
        <h2>
            Rick And Morty App
        </h2>
        {characters.length===0 ? (
            <h3>Cargando...</h3>
        ):(
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
            {
                characters.map((el) => (
                <Character key={el.id} name={el.name} avatar={el.avatar} gender={el.gender} status={el.status} />
            ))
            }
            </div>
        )}
        </>
    )
}