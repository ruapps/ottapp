import React, { useState } from "react";
import { Stack, Box, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Playerclips from "./Playerclips";
import Listitems from "./Listitems";
import SkeletonPlayer from "./SkeletonPlayer";

const Player = () => {
  const { item, status } = useSelector((state) => state.player);
  const moviesData = useSelector((state) => state.movies.items);

  const [tabno, settabno] = useState(1);
  // const [vidclips, setVidclips] = useState([]);

  let relatedMovies = { items: [], genrelength: [] };

  // looping on raw movie data;
  for (let movie of moviesData) {
    relatedMovies.genrelength = [];
    // looping on player item's genre(Array) property
    for (let it of item?.genre) {
      // Checking if genrelength length less then 3;
      if (relatedMovies.genrelength.length < 3) {
        // then only add genre into genrelenth
        if (movie.genre.includes(it)) {
          relatedMovies.genrelength.push(it);
        }
        // pusing movie item relatedmovies item array
      } else {
        movie.id !== item?.id && relatedMovies.items.push(movie);
        break;
      }
    }
  }

  const handleTab = (n) => {
    settabno(n);
  };

  // ✅ Check if data is still loading
  if (!status) {
    return <SkeletonPlayer />;
  }

  return (
    <Box
      sx={{
        "& > div": { borderBottom: "1px solid #fff", p: "1.5rem 0 2rem" },
        "& h5, & p, & .movie_clips": { color: "#fff", mb: "1rem" },
        "& h4": { color: "#fff" },
        "& .movie_bio h5 span": { color: "#afaea6" },
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
          <img src={item?.Poster} alt="dfdg" width="100%" />
        </Box>
        <div className="movie_bio">
          <h5>
            Name: <span>{item?.Title}</span>{" "}
          </h5>
          <h5>
            Year: <span>{new Date(item?.Year).getFullYear()}</span>
          </h5>
          <h5>
            Language: <span>{item?.original_language}</span>
          </h5>
          <h5>
            Overview: <span>{item?.overview}</span>
          </h5>
        </div>
      </Stack>
      <Box>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            "& > div": { cursor: "pointer" },
          }}
        >
          <Box
            onClick={(e) => handleTab(1)}
            sx={{
              pb: 1,
              borderBottom: `${tabno == 1 && "1px solid #fff"}`,
            }}
          >
            <h4>More like this</h4>
          </Box>
          <Box
            onClick={(e) => handleTab(2)}
            sx={{
              pb: 1,
              borderBottom: `${tabno == 2 && "1px solid #fff"}`,
            }}
          >
            <h4>Episodes</h4>
          </Box>
        </Stack>
        {tabno == 2 ? (
          <Playerclips clips={moviesData} />
        ) : (
          <Box
            sx={{
              mt: "1rem",
            }}
            className={tabno !== 2 ? " listmore" : "list"}
          >
            <Listitems movies={relatedMovies.items} status={status} />
          </Box>
        )}
      </Box>
      <Box className="movie_clips">
        <h3>Movieclips</h3>
        <Playerclips clips={moviesData} />
      </Box>
    </Box>
  );
};

export default Player;
