import { useDispatch, useSelector } from "react-redux";
import Listitems from "../Components/Listitems";
import { delItem } from "../Store/savedSlice";

const Saved = () => {
  const { status, items } = useSelector((state) => state.saved);
  const carouseItemInd = useSelector((state) => state.carousel);

  const dispatch = useDispatch();
  console.log("saved called");

  const handleDelete = (id) => {
    dispatch(delItem(id));
  };

  return (
    <Listitems
      movies={items}
      status={status}
      carouseItemInd={carouseItemInd}
      compName="saved"
      onDelete={handleDelete}
      text={"No items saved yet"}
    />
  );
};

export default Saved;
