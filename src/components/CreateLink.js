import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class CreateLink extends Component {
	state = {
		description: '',
		url: ''
	};

	render() {
		const { description, url } = this.state;

		const POST_MUTATION = gql`
			mutation PostMutation($description: String!, $url: String!) {
				post(description: $description, url: $url) {
					id
					createdAt
					url
					description
				}
			}
		`;

		return (
			<div>
				<div className="flex flex-column mt3">
					<input
						type="text"
						className="mb2"
						value={description}
						onChange={e =>
							this.setState({ description: e.target.value })
						}
						placeholder="A description for the link!"
					/>
					<input
						type="text"
						className="mb2"
						value={url}
						onChange={e => this.setState({ url: e.target.value })}
						placeholder="A URL for the link!"
					/>
				</div>
				<Mutation
					mutation={POST_MUTATION}
					variables={{ description, url }}
					onCompleted={() => this.props.history.push('/')}
				>
					{postMutation => (
						<button onClick={postMutation}>Submit</button>
					)}
				</Mutation>
			</div>
		);
	}
}

export default CreateLink;
