import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d5c9c505cc54748f832a25955e962c3b';
    const _baseOffset = 210;

    

   const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

   const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?format=comic&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }


    const _transformComics = (comics) => {
        return {
            id: comics.id,
            thumbnail: comics.thumbnail.path + '.'+ comics.thumbnail.extension,
            title: comics.title,
            price: comics.prices[0].price ? comics.prices[0].price+'$' : 'NOT AVAIBLE',
        }
    }

   const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        clearError,
        _getAllComics
    }
}

export default useMarvelService;