import { useSelector } from "react-redux";
// import Overlay from "./Overlay";
// import { Box } from "@mui/material";
import Listitems from "./Listitems";

const SearchbarItems = () => {
  const serchedItems = useSelector((state) => state.serchedItems.items);

  return <Listitems movies={serchedItems} compName="searchbaritems" />;
};

export default SearchbarItems;
