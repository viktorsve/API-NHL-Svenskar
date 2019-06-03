import React, { Component } from 'react';
import axios from 'axios';

import backupPic from '../../Assets/backup-img.jpg';
import styles from './NewsFeedComponent.module.css';

// Component that renders a news feed with articles from svenskafans.com RSS-feed.
class NewsFeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: null,
      errorState: null,
    };
  }

  /* Fetching RSS feed, when component mounts, from svenskafans.com,
  then parsing it to json via rss2json.com.
  */
  componentDidMount() {
    axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.svenskafans.com%2Frss%2Fsite%2F11.aspx&api_key=zqx0lobt8y4x5sumbn23oe1yrk2zszur10ruetd5')
      .then((res) => {
        const news = res.data;
        this.setState({ news });
      })
      .catch((error) => {
        const errorState = error.message;
        this.setState({ errorState });
      });
  }

  render() {
    const { news, errorState } = this.state;

    if (!news) {
      return <p>{errorState}</p>;
    }

    return (
      <div className={styles.newsFeedWrapper}>
        {news.items.map((article, i) => (
          <div key={article.guid}>
            {(Object.values(news.items[i].enclosure).includes('https://svenskafanscdn.blob.core.windows.net/image-7/null.jpg') || !news.items[i].enclosure.link) ? <img src={backupPic} alt="Bild kopplat till nyheten" /> : <img src={news.items[i].enclosure.link} alt="Bild kopplat till nyheten" />}
            <h1>
              <a rel="noopener noreferrer" target="_blank" href={news.items[i].guid}>
                {news.items[i].title}
              </a>
            </h1>
            <p>
              {news.items[i].content}
            </p>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default NewsFeedComponent;
