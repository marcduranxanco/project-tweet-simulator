import React, { useState, useEffect } from "react";
import {Container, Snackbar } from '@material-ui/core';
import Header from './components/Header';
import SendTweet from './components/SendTweet';
import ListTweets from './components/ListTweets';
import {TWEETS_STORAGE} from './utils/Constants'

function App() {
  const [toastProps, setToastsProps] = useState({
    open: false,
    text: null
  })
  const [allTweets, setAllTweets] = useState([]);
  const [reloadTweets, setReloadTweets] = useState(false);

  useEffect(() => {
    const AllTweetsStorage = localStorage.getItem(TWEETS_STORAGE);
    const allTweetsArray = JSON.parse(AllTweetsStorage);
    setAllTweets(allTweetsArray);
    setReloadTweets(false);
  }, [reloadTweets]);

  const deleteTweet = (index) => {
    allTweets.splice(index, 1);
    setAllTweets(allTweets);
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweets));
    setReloadTweets(true);
  }

  return (
    <Container className="tweets-simulator" maxWidth={false}>
      <Header />
      <SendTweet setToastsProps={setToastsProps} allTweets={allTweets}/>
      <ListTweets allTweets={allTweets} deleteTweet={deleteTweet}/>
      <Snackbar 
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={toastProps.open}
        autoHideDuration={1000}
        message={<span id="message-id">{toastProps.text}</span>}
      />
    </Container>
  );
}

export default App;
