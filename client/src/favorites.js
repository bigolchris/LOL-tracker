import React from 'react'
// import { Main, favorites, setFavorites } from './main'


export function Favorites({favorites}) {
    console.log(favorites)
  return (
    <div className="favorites-main">
        <h3 className="favorites-name">Favorites</h3>
        
            {/* <li className="favorites-item">{favorites} </li> */}
            {favorites.map((fav) => <li className="favorites-item" >{fav}</li>)}
        
    </div>
  )
}
