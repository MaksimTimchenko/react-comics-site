import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d5c9c505cc54748f832a25955e962c3b';
    const _baseOffset = 210;
    
    // https://gateway.marvel.com:443/v1/public/characters/1010338/comics?format=comic&limit=8&apikey=d5c9c505cc54748f832a25955e962c3b

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

    const _getAllCharacterComics = async (id, offset) => {
        const res = await  request(`${_apiBase}characters/${id}/comics?format=comic&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _getCharactersComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}/characters?limit=8&${_apiKey}`)
   
        return res.data.results.map(_transformCharacter)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
            // characters: comics.characters.items.name
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
        _getAllComics,
        getComic,
        _getAllCharacterComics,
        _getCharactersComic
    }
}

export default useMarvelService;