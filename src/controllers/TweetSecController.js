import { render } from '@testing-library/react'
import React from 'react'
import {TwitterTweetEmbed} from 'react-twitter-embed';
import TweetSecView from '../views/TweetSecView';

class TweetSecController extends React.Component {
    state = {}

    render() {
        return (
                <TwitterTweetEmbed tweetId='1278764736876773383' options={{
                    align: 'center',
                    //width: 250,
                    //maxWidth: 500,
                  }} /> 
        )
    }
}
export default TweetSecController;
