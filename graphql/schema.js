const { buildSchema } = require('graphql');

const schema = buildSchema(`
	type Query {
		posts: [Post!]!
		post(id: ID!): Post!
		tags: [Tag!]!
		tag(id: ID!): Tag!
		comments(postId: ID!): [Comment]!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		comments: [Comment!]!
		tags: [Tag!]!
		owner: User!
	}

	type Comment {
		id: ID!
		comment: String!
		owner: User!
	}

	type Tag {
		id: ID!
		tag: String!
	}

	type User {
		id: ID!
		name: String
		about: String
		email: String
	}

	type Mutation {
		addPost(title: String!, body: String!): Post!
		updatePost(id: ID!, title: String, body: String): Post!
		deletePost(id: ID!): Post!
		addPostTag(postId: ID!, tagId: ID!): Post!
		removePostTag(postId: ID!, tagId: ID!): Post!
		addComment(postId: ID!, comment: String!): Post!
		updateComment(postId: ID!, comId: ID!, comment: String!): Post!
		deleteComment(postId: ID!, comId: ID!): Post!
		createTag(tag: String!): Tag!
	}
`);

module.exports = schema;
