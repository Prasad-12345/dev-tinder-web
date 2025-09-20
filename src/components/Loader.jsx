import React from "react";
import { useSelector } from "react-redux";

function Loader() {
  const isLoader = useSelector((store) => store.loaderStore.isLoading);
  console.log("isloader" + isLoader);
  return (
    <div>
      {isLoader && (
        <div className="fixed inset-0 z-25 flex items-center justify-center backdrop-blur-sm bg-black/15">
          <span
            className="loading loading-spinner loading-xxl text-white"
            style={{ width: "100px", height: "100px" }}
          ></span>
        </div>
      )}
    </div>
  );
}

export default Loader;
