import { fetchArticlesError, fetchArticlesRequest, fetchArticlesSucces } from "../store/articlesReducer";

export const fetchArticles = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticlesRequest());
      const response = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=4f7332fc6061446993eabc77c0e9ecb5')
      const data = await response.json();

      dispatch(fetchArticlesSucces(data.articles))
    } catch(error) {
      dispatch(fetchArticlesError(error));
    }
  }
}