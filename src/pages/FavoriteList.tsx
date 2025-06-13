import { useEffect, useState } from 'react';
import { getMovieDetail } from '../api/api';
import { Link } from 'react-router-dom';

const FAVORITES_KEY = 'favoriteMovies';

interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
    Year: string;
}

const FavoriteList = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            const stored = localStorage.getItem(FAVORITES_KEY);
            if (!stored) {
                setFavorites([]);
                setLoading(false);
                return;
            }

            const ids = JSON.parse(stored) as string[];

            try {
                const moviePromises = ids.map((id) => getMovieDetail(id));
                const movies = await Promise.all(moviePromises);
                setFavorites(movies);
            } catch (error) {
                console.error('영화 목록 로딩 실패', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    // ✅ 즐겨찾기에서 제거
    const removeFromFavorites = (id: string) => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (!stored) return;

        const updated = (JSON.parse(stored) as string[]).filter((favId) => favId !== id);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

        // UI에서도 제거
        setFavorites((prev) => prev.filter((movie) => movie.imdbID !== id));
    };

    if (loading) return <p>로딩 중...</p>;

    if (favorites.length === 0) return <p>즐겨찾기한 영화가 없습니다.</p>;

    //모두 제거거
   const clearAllFavorites = () => {
        localStorage.removeItem(FAVORITES_KEY);
        setFavorites([]);
    };
    return (
        <div style={{ padding: '20px' }}>
            <h1>⭐ 즐겨찾기 목록</h1>
            <button
                onClick={clearAllFavorites}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#888',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                모두 삭제
            </button>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {favorites.map((movie) => (
                    <li key={movie.imdbID} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <img src={movie.Poster} alt={movie.Title} width="100" />
                            </Link>
                            <div>
                                <h3>{movie.Title} ({movie.Year})</h3>
                                <button
                                    onClick={() => removeFromFavorites(movie.imdbID)}
                                    style={{
                                        marginTop: '8px',
                                        padding: '6px 12px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteList;
