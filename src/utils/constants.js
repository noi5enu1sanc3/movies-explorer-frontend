export const SUBMIT_ERROR_TEXT = "Нужно ввести ключевое слово";

export const BASE_MOVIES_URL = "https://api.nomoreparties.co";
export const BASE_MAIN_URL = process.env.REACT_APP_API_ENDPOINT;
export const BEATFILM_URL = "/beatfilm-movies";

export const MOVIEAPI_ERROR_TEXT =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const PROFILE_EDIT_SUCCESS_TEXT = "Профиль отредактирован!";
export const LOGIN_SUCCESS_TEXT = "Добро пожаловать!";

export const ERROR_CODE_VALIDATION_ERROR = 400;
export const ERROR_CODE_UNAUTHORIZED = 401;
export const ERROR_CODE_CONFLICT = 409;

export const ERROR_VALIDATION_TEXT = "Неправильно заполнено одно из полей";
export const ERROR_UNAUTHORIZED_TEXT = "Неверный email или пароль";
export const ERROR_CONFLICT_TEXT = "Пользователь с таким email уже существует";
export const ERROR_INTERNAL_SERVER_TEXT =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";

export const NOTHING_FOUND_TEXT = "По этому запросу ничего не найдено";
export const NOTHING_SAVED_TEXT = "Вы ещё ничего не сохранили!";

export const MOVIE_NAME_PLACEHOLDER = "unknown";
export const MOVIE_NUM_PLACEHOLDER = 0;
export const MOVIE_VIDEO_LINK_PLACEHOLDER = "https://www.youtube.com/";

export const STORE_KEY = "store";
export const JWT_KEY = "jwt";
export const ALL_MOVIES_KEY = "allMovies";
export const USER_MOVIES_KEY = "userMovies";
export const USER_SEARCH_KEY = "userSearch";

export const LINK_REGEX =
  /^https?:\/\/(www\.)?[a-zA-z\d-]+\.[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const NAME_REGEX = /^[A-Za-zА-ЯЁа-яё\-\s]*$/;

export const MAX_WIDTH = {
  SINGLE_COLUMN_LAYOUT: 767,
  TWO_COLUMNS_LAYOUT: 1275,
};

export const ITEMS_COUNT = {
  INITIAL: {
    SINGLE_COLUMN_LAYOUT: 5,
    TWO_COLUMNS_LAYOUT: 8,
    THREE_COLUMNS_LAYOUT: 12,
  },
  TO_LOAD: {
    SINGLE_COLUMN_LAYOUT: 2,
    TWO_COLUMNS_LAYOUT: 2,
    THREE_COLUMNS_LAYOUT: 3,
  },
};
