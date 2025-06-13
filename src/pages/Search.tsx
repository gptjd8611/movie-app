import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchMovies } from '../api/api';

const Search = () => {
    const [movies, setMovies] = useState([]);
    const location = useLocation();

    // 쿼리스트링에서 검색어 추출
    const queryParams = new URLSearchParams(location.search);
    const searchValue = queryParams.get('q') || '';

    useEffect(() => {
        if (!searchValue.trim()) return;

        const fetchData = async () => {
            try {
                const result = await searchMovies(searchValue);
                setMovies(result);
            } catch (error) {
                alert(error);
            }
        };

        fetchData();
    }, [searchValue]);

    return (
        <section className="section">
            <div className="container">
                <h1>
                    <strong className="col">'{searchValue}'</strong>에 대한 검색 결과입니다.
                </h1>
                <div className="poster">
                    <ul className="poster__wrap">
                        {movies.map((movie) => (
                            <li className="poster-card" key={movie.imdbID}>
                                <Link to={`/movie/${movie.imdbID}`} className="poster-card__link">
                                    <div className="poster-card__img">
                                        <img src={movie.Poster} alt="" />
                                    </div>
                                    <div className="poster-bot">
                                        <p className="poster-card__title">
                                            {movie.Title}
                                            <span className="poster-card__type">({movie.Type})</span>
                                        </p>
                                        <p className="poster-card__year">{movie.Year}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Search;
