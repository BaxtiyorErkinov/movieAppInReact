import React, { useState, useEffect } from "react";
import axios from "axios";
import Singlecontent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useFetching } from "../../components/hooks/useFetching";
import Loader from "../../components/Loader";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const key = "918aeca640d9dd6504c0dfd695858a95";

  const [fetchMovies, loading, MovieError] = useFetching(async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&page=${page}`
    );
    setContent(data.results);
    setTotalPages(data.total_pages);
  });

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      {loading ? (
        <Loader />
      ) : (
        <div className="trending">
          {content &&
            content.map((c) => (
              <Singlecontent
                key={c.id}
                id={c.id}
                title={c.title || c.name}
                poster={c.poster_path}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            ))}
        </div>
      )}

      <CustomPagination setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Trending;
