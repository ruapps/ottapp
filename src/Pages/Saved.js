import { useDispatch, useSelector } from "react-redux";
import Listitems from "../Components/Listitems";
import { deleteMovie } from "../Api/savedApi";

const Saved = () => {
  const { status, items } = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <Listitems
      movies={items}
      status={status}
      compName="saved"
      onDelete={handleDelete}
      text={"No items saved yet"}
    />
  );
};

export default Saved;
