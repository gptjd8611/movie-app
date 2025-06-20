
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sch from "../../assets/images/sch.svg"

const SearchBar = ()=>{


    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = inputValue.trim();
        if (!query) return;
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setInputValue('');
    };

    return(
        <div className="sch">
            <form onSubmit={handleSubmit}>
                <div className="sch-box">
                <input
                    type="text"
                    placeholder="영화 검색"
                    value={inputValue}
                    className="sch-box__input"
                    onChange={(e) => setInputValue(e.target.value)}
                />
                </div>
                <button type="submit"  className="sch-btn"><img src={sch} alt=""/></button>
            </form>

        </div>


    )
}
export  default SearchBar;














