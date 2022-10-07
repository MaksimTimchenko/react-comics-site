import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';



import './wishList.scss'

const WishList =({wishList}) => {

    const [comics, setComics] = useState([])
    const {getComic} = useMarvelService();


    useEffect(() => {
        render(wishList)    
    },[]);

    const request = (item) => {
        getComic(item)
        .then(loaded)
    }
    

    const loaded = (newComics) => {

            setComics(comics => [newComics, ...comics])
        
        
    }

    const render = (wishList) => {
        wishList.map(item => {
            request(item)
        })
    }

    function renderItems(arr) {
        const items = comics.map((item, i) => {
        return (
            <li className="wishList__Item" key={item.id}>
                        <a href="#">
                            <img src={item.thumbnail} alt={item.title} className="wishList__item-img"/>
                            <div className="wishList__item-name">{item.title}</div>
                            <div className="wishList__item-price">{item.price}</div>
                        </a>
            </li>
        )
    });
    return (
        <ul className="comics__grid">
            {items}
        </ul>
    )
    }

    const items = renderItems(comics);
    
    
    return (
        <div className="comics__list">
            {items}
        </div>
    )
}

export default WishList