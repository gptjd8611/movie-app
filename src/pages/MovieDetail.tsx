import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../api/api';

const FAVORITES_KEY = 'favoriteMovies';


const MovieDetail = ()=>{
    const { imdbID } = useParams(); // URL에서 imdbID 추출
    const [movie, setMovie] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    // 즐겨찾기 여부 확인
    const checkFavorite = (id: string) => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (!stored) return false;
        const favorites = JSON.parse(stored) as string[];
        return favorites.includes(id);
    };

    // 즐겨찾기 토글
    const toggleFavorite = () => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        let favorites = stored ? (JSON.parse(stored) as string[]) : [];

        if (isFavorite) {
            // 제거
            favorites = favorites.filter((id) => id !== imdbID);
        } else {
            // 추가
            favorites.push(imdbID as string);
        }

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };


    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const result = await getMovieDetail(imdbID as string);
                setMovie(result);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchDetail();
    }, [imdbID]);



    // imdbID가 바뀔 때마다 즐겨찾기 여부 체크
    useEffect(() => {
        if (imdbID) {
            setIsFavorite(checkFavorite(imdbID));
        }
    }, [imdbID]);

    if (error) return <p>에러: {error}</p>;
    if (!movie) return <p>로딩 중...</p>;

    return(
        <div>
            <h1>{movie.Title}</h1>
            <p>{movie.Plot}</p>
            <p>감독: {movie.Director}</p>
            <img src={movie.Poster} alt={movie.Title} />
            {/* ⭐ 즐겨찾기 버튼 */}
            <button
                onClick={toggleFavorite}
                style={{
                    marginTop: '16px',
                    padding: '8px 16px',
                    backgroundColor: isFavorite ? '#ffcc00' : '#ccc',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}
            >
                {isFavorite ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기 추가'}
            </button>
        </div>
    )
}
export  default MovieDetail;