import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sch from "../../assets/images/sch.svg";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    // 영어만 포함되어 있는지 확인 (정규식)
    const isEnglish = /^[a-zA-Z0-9\s]+$/.test(query);
    if (!isEnglish) {
      alert("영화 제목을 영어로 입력해주세요.");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setInputValue("");
  };

  return (
    <div className="sch">
      <form onSubmit={handleSubmit}>
        <div className="sch-box">
          <input
            type="text"
            placeholder="영화 제목을 영어로 입력하세요."
            value={inputValue}
            className="sch-box__input"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button type="submit" className="sch-btn">
          <img src={sch} alt="검색 아이콘" />
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
