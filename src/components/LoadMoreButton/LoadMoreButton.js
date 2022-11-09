import React from "react";

const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <button
      type="button"
      className="movies-section__load-more-btn"
      onClick={onLoadMore}
    >
      Ещё
    </button>
  );
};

export default LoadMoreButton;
