// import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';
import Link from 'next/link';

class Index extends React.Component {
	static async getInitialProps({ req, res, query }) {
		console.log(query);
		let stories;
		let page = Number(query.page) || 1;
		try {
			const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
			stories = await response.json();
		} catch (err) {
			console.log(err);
			stories = [];
		}

		return { stories, page };
	}

	render() {
		const { stories, page } = this.props;
		return (
			<Layout title="Hacker Next">
				<StoryList stories={stories} />
				<Link href={`/?page=${page + 1}`}>
					<a>Page: {page + 1}</a>
				</Link>
			</Layout>
		);
		if (stories.length === 0) {
			return (
				<div>
					<Error statusCode={503} />
				</div>
			);
		}
		return <div>Hello World!</div>;
	}
}

export default Index;
