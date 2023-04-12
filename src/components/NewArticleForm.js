import React from 'react';
import { useDispatch } from 'react-redux';
import { addArticle } from '../store/articlesReducer';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import './NewArticleForm.css'

export const NewArticleForm = () => {
  const [newTittle, setNewTitle] = useState('title');
  const [author, setNewAuthor] = useState('author');
  const [description, setDescription] = useState('description');
  const [urlToImage, setUrlToImage] = useState('http://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.newTittle.value;
    const description = event.target.description.value;
    const author = event.target.author.value;
    const urlToImage = event.target.urlToImage.value;

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (
      title !== 'title' &&
      description !== 'description' &&
      author !== 'author' &&
      urlRegex.test(urlToImage)
    ) {
      dispatch(addArticle({ title, description, author, urlToImage }));
      setNewTitle('title');
      setDescription('description');
      setNewAuthor('author');
      setUrlToImage('http://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original');
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect news data entered, please check if all fields are filled in.')
    }
  };


  return (
    <div className="new-article">
      <div className="article">
        <h1 className="title">Your article will look like this.</h1>
        <div className="news-item">
          <a
            href=""
            className="news-item"
            target="_blank"
          >
            <div className="news-item__image">
              <img src={urlToImage} alt="News Image" />
            </div>
            <div className="news-item__details">
              <div className="news-item__author">{author}</div>
              <h2 className="news-item__title">{newTittle}</h2>
              <p className="news-item__description">{description}</p>
            </div>
          </a>
          <button>Pin</button>
        </div>
      </div>
      <div className="forms">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1>Add new Article</h1>
          <div className="fields"></div>
          <TextField
            id="standard-basic"
            label="Author"
            variant="standard"
            name="author"
            value={author}
            onChange={e => setNewAuthor(e.target.value)}
            onFocus={e => setNewAuthor('')}
          />
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            name="newTittle"
            value={newTittle}
            onChange={e => setNewTitle(e.target.value)}
            onFocus={e => setNewTitle('')}
          />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            onFocus={e => setDescription('')}
          />
          <TextField
            id="standard-basic"
            label="URL for image"
            variant="standard"
            name="urlToImage"
            value={urlToImage}
            onChange={e => setUrlToImage(e.target.value)}
            onFocus={e => setUrlToImage('')}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
            >
              Add article
            </Button>
          </Stack>
        </Box>
        {errorMessage && (
          <h1>{errorMessage}</h1>
        )}
      </div>
    </div>
  );
};
