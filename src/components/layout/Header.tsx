import { Link } from 'react-router-dom';
import SearchBar from "../search/SearchBar";
import logo from "../../assets/images/logo.svg"
type HeaderProps = {
    onSearch: (value: string) => void;
};
const Header = ({ onSearch })=>{
    return(
        <header className="header">
            <div className="header__inner">
                <Link to={`/`} >
                    <h1 className="logo"><img src={logo} alt="" /></h1>
                </Link>
                <SearchBar onSearch={onSearch}/>
                <Link to="/favorites" className="btn-bookmark">⭐즐겨찾기</Link>
            </div>
        </header>
    )
}
export  default Header