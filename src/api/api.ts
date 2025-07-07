const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    console.log("Raw fetch response:", response);
    if (!response.ok) {
      throw new Error("검색 요청에 실패했습니다.");
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    if (data.Response === "False") {
      throw new Error(data.Error || "결과 없음");
    }

    return data.Search; // 영화 배열 반환
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
};

// 영화상세정보 api
export const getMovieDetail = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);

    if (!response.ok) {
      throw new Error("상세 정보 요청 실패");
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "상세 정보 없음");
    }

    return data; // 상세 영화 데이터 반환
  } catch (error) {
    console.error("상세 API 오류:", error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=2024`);
    if (!response.ok) throw new Error("요청 실패");
    const data = await response.json();
    if (data.Response === "False")
      throw new Error(data.Error || "검색 결과 없음");
    return data.Search; // 이 부분 주의!!
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};
