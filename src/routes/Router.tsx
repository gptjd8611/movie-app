import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/layout/Header';
import Search from '../pages/Search';
import MovieDetailPage from '../pages/MovieDetail';
import FavoriteList from '../pages/FavoriteList';

const Router = () => {
    const handleSearch = (input: string) => {
        console.log('검색어:', input);
    };

    return (
       <>
            <Header onSearch={handleSearch}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
                <Route path="/favorites" element={<FavoriteList />} />
            </Routes>
       </>
    );
};

export default Router;
