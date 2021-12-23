import React, { useState, useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Genres = ({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  type,
  setPage,
}) => {
  const key = "918aeca640d9dd6504c0dfd695858a95";

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, []);

  const handleAdd = (genre) => {
      setSelectedGenres([...selectedGenres, genre]);
      setGenres(genres.filter((g) => g.id !== genre.id));
      setPage(1)
  }
  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1)
  }

  return (
    <div style={{ padding: "6px 0" }}>
      <ThemeProvider theme={darkTheme}>
      {selectedGenres && selectedGenres.map(g => <Chip label={g.name} color="primary" style={{ margin: "2px" }} key={g.name} size="small" onDelete={() => handleRemove(g)} />)}
        {genres && genres.map(g => <Chip label={g.name} color="default" style={{ margin: "2px" }} key={g.name} size="small" onClick={() => handleAdd(g)} />)}
      </ThemeProvider>
    </div>
  );
};

export default Genres;
