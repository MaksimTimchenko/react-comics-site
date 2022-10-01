import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
const Page404 = () => {

    return (
        <div>
            <ErrorMessage/>
            <Link style={{'display': 'block', 'textAlign': 'center', 'marginTop': '30px'}} to="/">
                <button style={{'padding': '10px 30px' ,'borderRadius': '20px', 'border': 'none', 'background': '#9F0013', 'color': '#ffff', 'cursor': 'pointer', 'margin': '0px auto'}}>Back to main page</button>
            </Link>
        </div>
    )
}

export default Page404