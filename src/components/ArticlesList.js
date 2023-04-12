import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../fetchArticles/fetchArticles";
import { NewArticleForm } from "./NewArticleForm";
import { deleteArticle } from "../store/articlesReducer";
import { Loader } from "./Loader";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export const ArticlesList = () => {
  const { articles, loading } = useSelector(state => state);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [numArticles, setNumArticles] = useState(10);
  const [pinnedArticle, setPinnedArticle] = useState(null);
  const [query, setQuery] = useState("");

  const handleDeleteArticle = (title) => {
    dispatch(deleteArticle(title));
  };

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch]);

  const handleShowMoreClick = () => {
    setNumArticles(numArticles + 10);
    setCurrentPage(currentPage + 1);
  }

  const filteredArticles = articles.filter(
    article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
  );

  const displayArticles = pinnedArticle ? [pinnedArticle, ...filteredArticles.slice(0, numArticles - 1)] : filteredArticles.slice(0, numArticles);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div className="App">
      <h2 style={{textAlign: "center"}}>Find news</h2>
      <input
        className="findNews"
        type="text"
        placeholder="Search news by title or description"
        value={query}
        onChange={handleInputChange}
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="grid">
          {displayArticles.map(el => (
            <div className="news-item">
              {pinnedArticle === el && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/73/73169.png"
                  alt="pinned"
                  className="pined"
                />
              )}
              <a
                href={el.url}
                className="news-item"
                key={displayArticles.indexOf(el)}
                target="_blank"
              >
                <div className="news-item__image">
                  <img src={el.urlToImage} alt="News Image" />
                </div>
                <div className="news-item__details">
                  <div className="news-item__author">{el.author}</div>
                  <h2 className="news-item__title">{el.title}</h2>
                  <p className="news-item__description">{el.description}</p>
                  {!el.source && (
                    <button type="submit" onClick={() => handleDeleteArticle(el.title)}>Delete article</button>
                  )}
                </div>
              </a>
              {pinnedArticle === el ? (
                <button onClick={() => setPinnedArticle(null)}>Unpin</button>
              ) : (
                <button onClick={() => setPinnedArticle(el)}>Pin</button>
              )}
            </div>
          ))
          }
        </div >
      )}

      <div>
        {displayArticles.length < articles.length && (
          <>
            <Box sx={{ '& button': { m: 1 } }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleShowMoreClick}
              >
                Show more
              </Button>
            </Box>
          </>
        )}
        <NewArticleForm />
      </div>
    </div >
  )
}
