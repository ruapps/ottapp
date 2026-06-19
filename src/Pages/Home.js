import HomeMoviesCategories from "../Components/HomeMoviesCategories"
import { useSelector } from "react-redux";
import Headslider from "../Components/Headslider";
import AnimeMovies from "../Components/AnimeMovies";
import { recommendationNext, recommendationPrev,topMnext, topMprev } from "../Store/carouselSlice";
// const SearchbarItems = React.lazy(() => import("../Components/SearchbarItems"));

const Home = () => {
  const moviesData = useSelector((state) => state.movies.items);
  const recommendations = useSelector((state) => state.recommendations.items);
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  const carouselItemInd = useSelector((state) => state.carousel);
  console.log("Home rendered");

  return (
    <>
      <Headslider></Headslider>
      <HomeMoviesCategories MoviesData={recommendations} title="Recommended" isLoggedIn={loggedIn} carouselItemInd={carouselItemInd[2]} slideactions={{ next: recommendationNext, prev: recommendationPrev }} />
      <HomeMoviesCategories MoviesData={moviesData} title="Top Movies" carouselItemInd={carouselItemInd[1]} slideactions={{ next: topMnext, prev: topMprev }} />
      <AnimeMovies MoviesData={moviesData} />
    </>
  );
};

export default Home;
