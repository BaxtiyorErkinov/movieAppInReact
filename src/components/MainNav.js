import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Whatshot, Movie, LiveTv, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "./mNav.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    BackgroundColor: "#2d313a",
    zIndex: 100,
  },
});
export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className="navig"
      className={classes.root}
      style={{backgroundColor: '#2d313a'}}
    >
      <BottomNavigationAction component={Link} to="/" style={{color: '#fff'}} label="Trending" icon={<Whatshot />} />
      <BottomNavigationAction component={Link} to="/movies" style={{color: '#fff'}} label="Movies" icon={<Movie />} />
      <BottomNavigationAction component={Link} to="/series" style={{color: '#fff'}} label="Tv Series" icon={<LiveTv />} />
      <BottomNavigationAction component={Link} to="/search" style={{color: '#fff'}} label="Search" icon={<Search />} />

    </BottomNavigation>
  );
}
