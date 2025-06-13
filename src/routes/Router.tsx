import { Routes, Route } from 'react-router-dom';
import {useEffect, useState} from 'react'

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Header from '../components/layout/Header';
import Search from '../pages/Search';
import MovieDetailPage from '../pages/MovieDetail';
import FavoriteList from '../pages/FavoriteList';


const Router = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (input: string) => {
        setSearchValue(input);
        console.log('검색어:', input); // 여기서 API 호출하거나, 필터링 등 가능
    };

    return (
       <>
            <Header onSearch={handleSearch}/>
            <Routes>
                <Route path="/search" element={<Search />} />
                {/*<Route path="/" element={<MovieSearchPage searchValue={searchValue}/>} />*/}
                <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
                <Route path="/favorites" element={<FavoriteList />} />
            </Routes>
       </>
    );
};

export default Router;
