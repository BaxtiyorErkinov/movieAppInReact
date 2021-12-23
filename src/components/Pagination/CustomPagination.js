import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Custompagination = ({ setPage, totalPages = 10 }) => {
  const pageChanging = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          color="primary"
          count={totalPages}
          onChange={(e) => pageChanging(e.target.textContent)}
          variant="outlined"
          size="medium"
        />
      </ThemeProvider>
    </div>
  );
};

export default Custompagination;
