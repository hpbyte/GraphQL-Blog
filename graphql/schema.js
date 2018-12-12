const { buildSchema } = require('graphql');

const schema = buildSchema(`
	type Query {
		posts: [Post!]!
		post(id: ID!): Post!
		tags: [Tag!]!
		tag(id: ID!): Tag!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		comments: [Comment!]!
		tags: [Tag!]!
		owner: ID!
	}

	type Comment {
		id: ID!
		body: String!
		owner: ID!
	}

	type Tag {
		id: ID!
		tag: String!
	}

	type User {
		id: ID!
		name: String
		email: String
	}
`);

module.exports = schema;
