import React, { useEffect, useState } from "react";
import { Stack, Box, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Playerclips from "./Playerclips";
import Listitems from "./Listitems";

const Player = () => {
  const playerItem = useSelector((state) => state.player);
  const moviesData = useSelector((state) => state.movies.items);
  const [tabtxt, setTabtxt] = useState(0);
  const [vidclips, setVidclips] = useState([]);
  let relatedMovies = { items: [], genrelength: [] };
  for (let item of moviesData) {
    relatedMovies.genrelength = [];
    for (let it of playerItem[0].genre) {
      if (relatedMovies.genrelength.length < 3) {
        if (item.genre.includes(it)) {
          relatedMovies.genrelength.push(it);
        }
      } else {
        item.id !== playerItem[0].id && relatedMovies.items.push(item);
        break;
      }
    }
  }

  // useEffect(()=>{
  //         axios
  //         .get(`https://api.themo    viedb.org/3/movie/${playerItem[0].id}/videos?api_key=f1293eff1df23996522fa36decceb1cc`)
  //         .then((res)=>{
  //             setVidclips(res.data.results)
  //             // setVidclips({ data: res.data.results, key: res.data.results.map((item)=> item.key)})
  //         })

  //     // const func2= async ()=>{
  //     //     const genres= await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=f1293eff1df23996522fa36decceb1cc&language=en`)
  //     //     return genres.data.results
  //     // }
  // }, [])
  console.log(vidclips);
  const handleTab = (e) => {
    setTabtxt(e.target.textContent);
  };

  return (
    <Box
      sx={{
        "& > div": { borderBottom: "1px solid #fff", py: "1rem" },
        "& h5, & p, & .movie_clips": { color: "#fff", mb: "1rem" },
        "& h4": { color: "#fff" },
        "& .movie_bio h5 span": { color: "#afaea6" },
        pr: { xs: 0, sm: "2rem" },
        "& .movie_clips video": { borderBottom: "none" },
        overflow: "hidden",
      }}
      className="player"
    >
      <Box sx={{ mx: { xs: "-16px", md: "0" } }}>
        <video width="100%" height="240" autoplay muted controls>
          {/* <source src={`https://www.youtube.com/watch?v=${Key}`} /> */}
        </video>
      </Box>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ py: { xs: "20px !important", md: "0" } }}
      >
        <Box sx={{ width: "calc(100% - 80%)" }}>
          <img src={playerItem[0].Poster} alt="dfdg" width="100%" />
        </Box>
        <div className="movie_bio">
          <h5>
            Name: <span>{playerItem[0].Title}</span>{" "}
          </h5>
          <h5>
            Year: <span>{new Date(playerItem[0].Year).getFullYear()}</span>
          </h5>
          <h5>
            Language: <span>{playerItem[0].original_language}</span>
          </h5>
          <h5>
            Overview: <span>{playerItem[0].overview}</span>
          </h5>
        </div>
      </Stack>
      <Box sx={{}}>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            "& > div": { cursor: "pointer" },
            p: { xs: "10px 0 30px 0", md: "10px 0 0 0" },
          }}
        >
          <Box onClick={(e) => handleTab(e)}>
            <h4>More like this</h4>
          </Box>
          <Box onClick={(e) => handleTab(e)}>
            <h4>Episodes</h4>
          </Box>
        </Stack>
        {tabtxt === "Episodes" ? (
          "sldkjflksdjfl"
        ) : (
          <Box
            // sx={{
            //   transform: "scale(0)",
            //   opacity: 0,
            //   transition: "0.5s ease-in",
            // }}
            className={tabtxt !== "Episodes" ? " listmore" : "list"}
          >
            <Listitems movies={relatedMovies.items} />
          </Box>
        )}
      </Box>
      <Box className="movie_clips">
        <h3>Movieclips</h3>
        <Playerclips Clips={vidclips} />
      </Box>
    </Box>
  );
};

export default Player;
