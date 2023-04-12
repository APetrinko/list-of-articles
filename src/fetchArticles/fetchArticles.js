import { fetchArticlesError, fetchArticlesRequest, fetchArticlesSucces } from "../store/articlesReducer";

export const fetchArticles = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticlesRequest());
      const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-03-12&sortBy=publishedAt&apiKey=756331e6e9324983bfdba48eb24848d4')
      const data = await response.json();

      dispatch(fetchArticlesSucces(data.articles))
    } catch(error) {
      dispatch(fetchArticlesError(error));
    }
  }
}