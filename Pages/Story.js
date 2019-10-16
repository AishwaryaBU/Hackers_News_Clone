import fetch from 'isomorphic-fetch';
import { Component } from 'react';
import Layout from '../components/Layout';
import Error from 'next/error';

class Story extends React.Component {
	static async getIntialProps({ req, res, query }) {
		let story;
		try {
			const storyID = query.id;
			console.log(storyID);
			const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=2`);

			story = await response.json();
		} catch (err) {
			console.log(err);
			story = [];
		}
		return { story };
	}
	render() {
		const { story } = this.props;

		if (!story) {
			return <Error statusCode={503} />;
		}

		return (
			<Layout title={story.title}>
				<main>
					<h1>
						<a href={story.url}>{story.title}</a>
					</h1>
					<div className="story-details">
						<strong>{story.points} points</strong>
						<strong>{story.comments_count} comments</strong>
						<strong>{story.time_ago}</strong>
					</div>
				</main>
			</Layout>
		);
	}
}

export default Story;
