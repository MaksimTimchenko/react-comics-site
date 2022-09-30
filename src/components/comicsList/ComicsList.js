import { useState, useEffect, useCallback  } from 'react';

import './comicsList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setoffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, _getAllComics} = useMarvelService();

    useEffect(()=> {
        request(offset,true)
    }, []);

    
    const request = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        _getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (comicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);

        setNewItemLoading(newItemLoading => false);
        setComicsEnded(comicsEnded => ended);
        setoffset(offset => offset + 8);
        

    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {


            return (
                <li className="comics__item"
                    key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    };


    const items = renderItems(comicsList)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => request(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;