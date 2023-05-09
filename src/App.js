import "./App.css";
import SearchMovie from "./Components/MovieList/SearchMovie";
import PopularMovie from "./Components/MovieList/PopularMovie";

function App() {
  return (
    <div className="App">
      <div className="app_heading">
        <SearchMovie />
      </div>
      <div className="app_container">
        <div className="app_card">
          <PopularMovie />
        </div>
      </div>
    </div>
  );
}

export default App;
