import AppBanner from "../appBanner/AppBanner"
import WishList from "../wishList/WishList"


const WishListPage =({wishList}) => {
    return(
        <>
        <AppBanner/>
        <WishList wishList={wishList}/>
        </>
    )
}

export default WishListPage