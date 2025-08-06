import { useEffect, useState } from "react";
import { getMovieDetail } from "../api/api";
import { Link } from "react-router-dom";
import del from "../assets/images/del.svg";

const FAVORITES_KEY = "favoriteMovies";

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
        console.error("영화 목록 로딩 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // 즐겨찾기에서 제거
  const removeFromFavorites = (id: string) => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return;

    const updated = (JSON.parse(stored) as string[]).filter(
      (favId) => favId !== id
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

    // UI에서도 제거
    setFavorites((prev) => prev.filter((movie) => movie.imdbID !== id));

  };



  //모두 제거
  const clearAllFavorites = () => {
    localStorage.removeItem(FAVORITES_KEY);
    setFavorites([]);
  };
  return (
    <section className="section">
      <div className="container">
        <div className="flex-box">
          <h2 className="title mb-0">즐겨찾기 목록</h2>

          <button onClick={clearAllFavorites} className="btn-del">
            All Clear
          </button>
        </div>
        <div className="poster">
          {favorites.length === 0 && !loading ? (
              <div className="no-data">
               <p className="no-favorites">즐겨찾기한 영화가 없습니다.</p>
              </div>
              ) :(
          <ul className="poster__wrap">
            {favorites.map((movie) => (
              <li className="poster-card" key={movie.imdbID}>
                <button
                  onClick={() => removeFromFavorites(movie.imdbID)}
                  className="poster-card-del"
                >
                  <img src={del} alt="삭제 아이콘" />
                </button>
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="poster-card__link"
                >
                  <div className="poster-card__img">
                    <img src={movie.Poster} alt={movie.Title} />
                  </div>
                  <div className="poster-bot">
                    <p className="poster-card__title">{movie.Title}</p>
                    <p className="poster-card__year">{movie.Year}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
              )}
        </div>
      </div>
    </section>
  );
};

export default FavoriteList;
