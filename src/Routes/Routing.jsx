import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "../Components/ErrorPage/NoPage";
import MovieDetails from "../Components/MovieList/MovieDetails";
import App from "../App";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
