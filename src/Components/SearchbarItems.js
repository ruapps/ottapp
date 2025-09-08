import { useSelector } from "react-redux";

import Listitems from "./Listitems";

const SearchbarItems = () => {
  const { status, items } = useSelector((state) => state.serchedItems);

  return <Listitems movies={items} status={status} text={"No items found"} />;
};

export default SearchbarItems;
