import "./NoResults.css";
import { useLocation } from "react-router-dom";
import iconSad from "../../images/unsuccessful.svg";
import iconHappy from "../../images/successful.svg";
import { extractFromStorage } from "../../utils/storageUtils";
import {
  NOTHING_FOUND_TEXT,
  NOTHING_SAVED_TEXT,
  USER_MOVIES_KEY,
  USER_SEARCH_KEY,
} from "../../utils/constants";

const NoResults = () => {
  const location = useLocation();

  const nothingSaved =
    location.pathname === "/saved-movies" &&
    extractFromStorage(USER_MOVIES_KEY).length === 0;

  const nothingFound =
    (location.pathname === "/movies" && extractFromStorage(USER_SEARCH_KEY)) ||
    (location.pathname === "/saved-movies" &&
      extractFromStorage(USER_MOVIES_KEY).length > 0);

  const noPreviousSearches =
    location.pathname === "/movies" && !extractFromStorage(USER_SEARCH_KEY);

  return (
    <section className="no-results">
      {noPreviousSearches && (
        <>
          <img
            src={iconHappy}
            alt="Улыбающийся эмоджи"
            className="no-results__img no-results__img_type_no-searches"
          />
        </>
      )}
      {nothingFound && (
        <>
          <img
            src={iconSad}
            alt="Грустный эмоджи"
            className="no-results__img"
          />
          <p>{NOTHING_FOUND_TEXT}</p>
        </>
      )}
      {nothingSaved && (
        <>
          <img
            src={iconHappy}
            alt="Улыбающийся эмоджи"
            className="no-results__img"
          />
          <p>{NOTHING_SAVED_TEXT}</p>
        </>
      )}
    </section>
  );
};

export default NoResults;
