import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, ComicsPage, Page404, SingleComicPage} from "../pages";
import AppHeader from "../appHeader/AppHeader";
// import WishListPage from "../pages/WishListPage";



const App = () => {
    const [wishList, setWishList] =useState([]); 

    const upgradeWishList = (id) => { 
        console.log(wishList);
            wishList.indexOf(id) == -1  ? setWishList(wishList => [id, ...wishList]) : setWishList(wishList => [...wishList])
    }
        return (
           <Router>
             <div className="app">
                <AppHeader wishListLength={wishList.length}/>
                <main>
                    <Routes>
                        <Route  path="/" element={<MainPage/>}/>
                        <Route  path="/comics" element={<ComicsPage upgradeWishList={upgradeWishList}/>}/>
                        <Route  path="/comics/:comicId" element={ <SingleComicPage/>}/>
                        {/* <Route  path="/wishlist" element={<WishListPage wishList={wishList}/>}/> */}
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
           </Router>
        )

}

export default App;