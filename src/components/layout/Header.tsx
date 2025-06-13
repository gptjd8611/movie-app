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
                <h1 className="logo"><a href=""><img src={logo} alt="" /></a></h1>
                <SearchBar onSearch={onSearch}/>
                <Link to="/favorites" className="header-bookmark">⭐즐겨찾기</Link>
            </div>
        </header>
    )
}
export  default Header