export const renderMovieInfo = (movieInfo, type) => {
  return movieInfo?.map((movie, index) => {
    return (
      <div key={`movie-${index}`}>
        &nbsp;
        {`${movie[type]}${index === movieInfo.length - 1 ? "." : ","}`}
      </div>
    );
  });
};
