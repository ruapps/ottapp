import { useSelector } from "react-redux";
// import Overlay from "./Overlay";
// import { Box } from "@mui/material";
import Listitems from "./Listitems";

const SearchbarItems = () => {
  const { status, items } = useSelector((state) => state.serchedItems);

  return <Listitems movies={items} status={status} text={"No items found"} />;
};

export default SearchbarItems;
