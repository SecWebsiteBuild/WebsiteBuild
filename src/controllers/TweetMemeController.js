import { render } from '@testing-library/react'
import React from 'react'
import {TwitterTweetEmbed} from 'react-twitter-embed';
import TweetMemeView from '../views/TweetMemeView';

class TweetMemeController extends React.Component {
    state = {}

    render() {
        return (
            
            <TwitterTweetEmbed tweetId={'1276418907968925696'} />
        )
    }
}
export default TweetMemeController;

