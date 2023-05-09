import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../../Utils/constant";
import "./SearchMovie.css";

var timerId;
const SearchMovie = () => {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [movieList, setMovieList] = useState([]);
  const history = useNavigate();

  const getMovieHandler = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputValue}&page=1&include_adult=false`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((val) => {
        setMovieList(val.results);
      });
  };

  const debounce = (func, delay) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
  };

  const searchMovieHandler = (newInputValue) => {
    setInputValue(newInputValue);
    debounce(getMovieHandler, 300);
  };
  const movieDetailHandler = (movieId) => {
    history(`movie/${movieId}`);
  };
  return (
    <div>
      <div className="search_border">
        <Autocomplete
          freeSolo
          selectOnFocus
          clearOnBlur
          id="search_movie"
          disableClearable
          value={value}
          options={movieList}
          getOptionLabel={(option) => option.title}
          inputValue={inputValue}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            searchMovieHandler(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search movie"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option.title, inputValue, {
              insideWords: true,
            });
            const parts = parse(option.title, matches);
            return (
              <li
                {...props}
                onClick={(event) => {
                  event.preventDefault();
                  movieDetailHandler(option.id);
                }}
              >
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={"list-" + index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
        />
      </div>
    </div>
  );
};
export default SearchMovie;
