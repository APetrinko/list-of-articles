export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_SUCCES = 'FETCH_ARTICLES_SUCCES';
export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';

export const addArticle = (article) => ({ type: ADD_ARTICLE, payload: article });
export const deleteArticle = (title) => ({ type: DELETE_ARTICLE, payload: title });

export const fetchArticlesRequest = () => ({ type: FETCH_ARTICLES });
export const fetchArticlesSucces = (articles) => ({ type: FETCH_ARTICLES_SUCCES, payload: articles });
export const fetchArticlesError = (error) => ({ type: FETCH_ARTICLES_ERROR, payload: error });

const initialState = {
  articles: [],
  loading: false,
  error: null,
}

const arcticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return { ...state, loading: true, error: null, articles: [] }
    case FETCH_ARTICLES_SUCCES:
      return { ...state, loading: false, error: null, articles: action.payload }
    case FETCH_ARTICLES_ERROR:
      return { ...state, loading: false, error: action.payload, articles: [] }
    case ADD_ARTICLE:
      return {
        ...state, articles: [action.payload, ...state.articles]
      };
    case DELETE_ARTICLE:
      return { ...state, articles: state.articles.filter((article) => article.title !== action.payload) };
    default:
      return state;
  }
}

export default arcticlesReducer;