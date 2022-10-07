import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Img from '../../resources/img/abyss.jpg'
import './singleComicPage.scss';
import set from 'core-js/library/fn/reflect/set';


const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const [characters, setCharacters] = useState([])

    const {loading, error, getComic, _getCharactersComic ,clearError} = useMarvelService();
    
    useEffect(() =>{
        updateComic();
        

    },[comicId]);

    useEffect(() => {
        onRequest(comicId)  
    },[comicId])

    const onRequest = (comicId) => {
        _getCharactersComic(comicId)
            .then(onCharactersLoaded)
            clearError()

    }


    const updateComic = () => {
        getComic(comicId)
            .then(onComicLoaded)
        clearError();
    }

    const onCharactersLoaded = (charactersList) => {
        setCharacters([...charactersList, ...characters,])
    }
    
   const onComicLoaded = (comic) => {
        setComic(comic);
    }
    

    const renderItems = (arr) => {

        const items = arr.map(item => {
            return (
            <li className='single-comic__characters__item' key={item.id}>
                <img src={item.thumbnail} alt={item.name} />
                <div className='single-comic__characters__name'>{item.name}</div> 
            </li>
            )
        })

        return (
            <div className='single-comic__characters'>
                <h3 className='single-comic__characters__title'>Characters</h3>
                <ul className='single-comic__characters__grid'>
                    {characters ? items : 'not yet'}               
                </ul>
            </div>
        )
    }

    const items = renderItems(characters)
    

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View items={items} comic={comic}/> : null;
    const contentChars = !(loading || error || !characters) ? items : null;


    return (
      <>
      {errorMessage}
      {spinner}
      {content}
      {contentChars}
      </>
    )
}




const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, price} = comic;
    const navigate = useNavigate();
    return (
        <>
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            
            <button className="single-comic__back"
                    onClick={() => navigate(-1)}
            >
                Back to all
            </button>
            
        </div>
        </>
    )
}
export default SingleComicPage;