import { fetchArticlesError, fetchArticlesRequest, fetchArticlesSucces } from "../store/articlesReducer";

export const fetchArticles = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticlesRequest());
      const response = await fetch('https://newsapi.org/v2/everything?q=apple&from=2023-04-07&to=2023-04-07&sortBy=popularity&apiKey=756331e6e9324983bfdba48eb24848d4')
      const data = await response.json();

      dispatch(fetchArticlesSucces(data.articles))
    } catch(error) {
      dispatch(fetchArticlesError(error));
    }
  }
}