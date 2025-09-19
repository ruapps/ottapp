import Topmovies from "../Components/Topmovies";
import { useSelector } from "react-redux";
import Headslider from "../Components/Headslider";
import AnimeMovies from "../Components/AnimeMovies";
// const SearchbarItems = React.lazy(() => import("../Components/SearchbarItems"));

const Home = () => {
  const moviesData = useSelector((state) => state.movies.items);

  return (
    <>
      <Headslider></Headslider>
      <Topmovies MoviesData={moviesData} />
      <AnimeMovies MoviesData={moviesData} />
    </>
  );
};

export default Home;
