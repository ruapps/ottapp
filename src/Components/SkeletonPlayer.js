import { Box, Stack, Divider, Skeleton } from "@mui/material";

const SkeletonPlayer = () => {
  return (
    <Box
      sx={{
        "& > div": { borderBottom: "1px solid #fff", p: "1.5rem 0 2rem" },
        "& h5, & p, & .movie_clips": { color: "#fff", mb: "1rem" },
        "& h4": { color: "#fff" },
        // pr: { xs: 0, sm: "2rem" },
        overflow: "hidden",
      }}
      className="player"
    >
      {/* Video Player Placeholder */}
      <Box sx={{ mx: { xs: "-16px", md: "0" } }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          animation="wave"
          sx={{
            bgcolor: "grey.800",
            height: { xs: "240px", sm: "300px", lg: "320px" },
          }}
        />
      </Box>

      {/* Poster & Movie Bio */}
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ py: { xs: "20px !important", md: "0" } }}
      >
        <Box
          sx={{
            width: {
              xs: "calc(100% - 70%)",
              sm: "calc(100% - 80%)",
              lg: "calc(100% - 75%)",
            },
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            animation="wave"
            sx={{
              borderRadius: "8px",
              bgcolor: "grey.800",
              height: { xs: "140px", sm: "200px", md: "220px", lg: "300px" },
            }}
          />
        </Box>
        <Box className="movie_bio" sx={{ width: "100%" }}>
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              variant="text"
              width="60%"
              height={30}
              animation="wave"
              sx={{ bgcolor: "grey.800", mb: 1 }}
            />
          ))}
        </Box>
      </Stack>

      {/* Tabs Placeholder */}
      <Box>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Skeleton
            variant="text"
            width={100}
            height={35}
            animation="wave"
            sx={{ bgcolor: "grey.800" }}
          />
          <Skeleton
            variant="text"
            width={100}
            height={35}
            animation="wave"
            sx={{ bgcolor: "grey.800" }}
          />
        </Stack>

        {/* Related Movies Placeholder */}
        <Box sx={{ mt: "1rem", display: "flex", gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              animation="wave"
              sx={{
                borderRadius: "8px",
                bgcolor: "grey.800",
                width: {
                  xs: "calc(100% - 53%)",
                  sm: "calc(100% - 84.80%)",
                  lg: "calc(100% - 84.80%)",
                },
                height: { xs: "180px", sm: "200px", lg: "260px" },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Movie Clips Placeholder */}
      <Box className="movie_clips" sx={{ mt: 2 }}>
        <Skeleton
          variant="text"
          width={120}
          height={35}
          animation="wave"
          sx={{ bgcolor: "grey.800", mb: 2 }}
        />
        <Stack direction="row" spacing={2}>
          {[1, 2].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="90%"
              animation="wave"
              sx={{
                borderRadius: "8px",
                bgcolor: "grey.800",
                height: { xs: "240px", lg: "320px" },
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SkeletonPlayer;
