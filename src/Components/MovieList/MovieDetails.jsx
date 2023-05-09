import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY } from "../../Utils/constant";
import { renderMovieInfo } from "../../Utils/helper";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [movieDetail, setMovieDetails] = useState({});
  const [showLoader, setProgressLoader] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((resp) => {
        return resp.json();
      })
      .then((val) => {
        setMovieDetails(val);
        setProgressLoader(true);
      });
  }, [movieId]);

  return (
    <div>
      {!showLoader ? (
        <div className="movie_details_loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="movie_details_main">
          <h1 className="center">{movieDetail?.title}</h1>
          <div className="movie_details_card">
            <div className="movie_details_tag">
              <label className="font_bold">Original Title:</label>
              {movieDetail?.original_title}
            </div>
            <div className="movie_details_tag">
              <label className="font_bold">Runtime: </label>{" "}
              {movieDetail?.runtime} min
            </div>
            {movieDetail?.status && (
              <div className="movie_details_tag">
                <label className="font_bold">Status: </label>
                {movieDetail?.status}
              </div>
            )}
            <div className="movie_details_tag">
              <label className="font_bold">Release Date: </label>
              {moment(movieDetail?.release_date).format("MMM, Do YYYY")}
            </div>
            <div className="movie_details_tag">
              <label className="font_bold">Genre: </label>
              {renderMovieInfo(movieDetail?.genres, "name")}
            </div>
            <div className="movie_details_tag">
              <label className="font_bold mr_btm">Overview </label>
              {movieDetail?.overview}
            </div>
            <div className="movie_details_tag">
              <label className="font_bold">Language: </label>
              {renderMovieInfo(movieDetail?.spoken_languages, "english_name")}
            </div>
            <div className="movie_details_tag">
              <label className="font_bold">Production Companies: </label>
              {renderMovieInfo(movieDetail?.production_companies, "name")}
            </div>
            {movieDetail?.homepage && (
              <div className="movie_details_tag">
                <label className="font_bold">More Details: </label>
                <a
                  href={movieDetail?.homepage}
                  target="_blank"
                  rel="noreferrer"
                >
                  HomePage
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default MovieDetails;
