// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api/api';
import {Link} from "react-router-dom";

type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
};

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const results = await fetchPopularMovies(); // 여기서 API 함수 호출
                setMovies(results);
            } catch (error) {
                console.error('인기 영화 가져오기 실패:', error);
            }
        };

        loadMovies();
    }, []);

    return (
        <section className="section">
            <div className="container">
                <h2 className="title">인기 영화</h2>
                <div className="poster">
                    <ul className="poster__wrap">
                        {movies.map((movie) => (
                            <li className="poster-card"  key={movie.imdbID} >
                                <Link to={`/movie/${movie.imdbID}`} className="poster-card__link">
                                    <div className="poster-card__img">
                                        <img src={movie.Poster} alt={movie.Title} />
                                    </div>
                                    <div className="poster-bot">
                                        <p className="poster-card__title">
                                            {movie.Title}

                                        </p>
                                        <p className="poster-card__year">{movie.Year}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>



                {/*<ul className="poster__wrap">*/}
                {/*    {movies.map((movie) => (*/}
                {/*        <li key={movie.imdbID} className="poster-card">*/}
                {/*            <img src={movie.Poster} alt={movie.Title} width={100} />*/}
                {/*            <p>{movie.Title} ({movie.Year})</p>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </div>
        </section>
    );
};

export default Home;
