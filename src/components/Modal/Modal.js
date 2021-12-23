import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { YouTube } from "@material-ui/icons";
import './Modal.css'
import Carousel from '../Carousel/Carousel'
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const style = {
  width: "90%",
  height: "80%",
  backgroundColor: "#1b2a47",
  borderRadius: "10px",
  color: "white",
  boxShadow: 15,
  padding: "15px",
  zIndex: 1000,
};
const modal = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "999",
};

export default function Modalka({ children, id, media_type }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);
  const key = "918aeca640d9dd6504c0dfd695858a95";

  const fetchingData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${key}&language=en-US`
    );
    setContent(data);
  };
  const fetchingVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${key}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };
  useEffect(() => {
    fetchingData();
    fetchingVideo();
  }, []);

  return (
    <>
    <div
      className="media"
      style={{ cursor: "pointer" }}
      color="inherit"
      onClick={handleOpen}
    >
      {children}
    </div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      style={modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        {content && (
          <div style={style}>
            <div className="ContentModal">
              <img
                src={
                  content.poster_path
                    ? `${img_500}/${content.poster_path}`
                    : unavailable
                }
                alt={content.name || content.title}
                className="ContentModal__portrait"
              />
              <img
                src={
                  content.backdrop_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape
                }
                alt={content.name || content.title}
                className="ContentModal__landscape"
              />
              <div className="ContentModal__about">
                <span className="ContentModal__title">
                  {content.name || content.title} (
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  )
                </span>
                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}

                <span className="ContentModal__description">
                  {content.overview}
                </span>

                <div>
                  <Carousel id={id} media_type={media_type} />
                </div>

                <Button
                  variant="contained"
                  startIcon={<YouTube />}
                  className="btn"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  Watch the Trailer
                </Button>
              </div>
            </div>
          </div>
        )}
      </Fade>
    </Modal>
  </>
  );
}
