import React, { useState, useEffect } from "react";
import axios from 'axios'
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Search } from "@material-ui/icons";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const SearchPage = () => {
  const key = "918aeca640d9dd6504c0dfd695858a95";
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState('')

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const searching = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results)
    setTotalPages(data.total_pages)
  } 

  useEffect(() => {
    window.scroll(0,0);
    // searching();
  }, [type, page])

  return (
    <div>
      <span className="pageTitle">Search</span>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            label="Search..."
            variant="filled"
            style={{ flex: 1 }}
            className="searchBox"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" style={{ marginLeft: 10 }} onClick={searching}>
            <Search />
          </Button>
        </div>
        <div className="tab-container">
          <Tabs
            value={type}
            indicatorColor="primary"
            style={{ width: "100%" }}
            centered
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1)
            }}
          >
            <Tab label="Search Movies" style={{ width: "50%" }} />
            <Tab label="Search Series" style={{ width: "50%" }} />
          </Tabs>
        </div>
      </ThemeProvider>
      <div className="trending">
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                title={c.title || c.name}
                poster={c.poster_path}
                date={c.first_air_date || c.release_date}
                media_type="Movie"
                vote_average={c.vote_average}
              />
            ))}
            {searchText && 
              !content && 
               type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2> 
            }
        </div>
        {totalPages > 1 && <CustomPagination setPage={setPage} totalPages={totalPages} />}
    </div>
  );
};

export default SearchPage;
