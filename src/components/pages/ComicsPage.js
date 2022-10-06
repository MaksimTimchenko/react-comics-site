import { useState } from "react";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";


const ComicsPage = ({upgradeWishList}) => {
    
    const addComicsToWishList = (id) => {
        upgradeWishList(id)
    }


    return (
        <>
        <AppBanner/>
        <ComicsList addComicsToWishList={addComicsToWishList}  /> 
        </> 
    )
}

export default ComicsPage
