import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import Badge from '@mui/material/Badge';
import { Mail } from '@material-ui/icons';
import Modal from '../Modal/Modal'
const Singlecontent = ({
  id,
  title,
  date,
  poster,
  media_type,
  vote_average,
}) => {
  return (
    <Modal media_type={media_type} id={id}>
      <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'warning'} />
      <img
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
        className="poster"
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "Tv Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </Modal>
  );
};

export default Singlecontent;
