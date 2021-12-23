import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Trending/Trending.css";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres";
import useGenres from "../../components/hooks/useGenre";
import { useFetching } from '../../components/hooks/useFetching'
import Loader from '../../components/Loader'

const Series = () => {
  const key = "918aeca640d9dd6504c0dfd695858a95";
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenres(selectedGenres);

  const [fetchMovies, loading, MovieError] = useFetching(async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );
    setContent(data.results);
    setTotalPages(data.total_pages);
  })

  useEffect(() => {
    fetchMovies()
  }, [page, genreForURL]);

  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      
      { loading 
        ? <Loader />
        : <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              title={c.title || c.name}
              poster={c.poster_path}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      }
      
      <CustomPagination setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Series;
