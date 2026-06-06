import React from "react";
import SkeletonPlayer from "./SkeletonPlayer";
import Player from "./Player";
import { useSelector } from "react-redux";

const WrapperPlayer = () => {
const { status } = useSelector((state) => state.player);

 if (!status) {
    return <SkeletonPlayer />;
  }

  return (
    <>
        <Player status={status} />
    </>
  );
};

export default WrapperPlayer;
