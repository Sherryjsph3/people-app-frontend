//enable us to add client side functionality the diff btw link and a it does cause a page refresh, it manipulates browser history...theres a cause and effect happening
import { Link } from "react-router-dom"

function Header(props){
    return (
        <nav className="nav">
            <Link to="/">
                <div>People App</div>
            </Link>
        </nav>
    )
  } 
  
  export default Header;
