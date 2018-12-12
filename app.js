const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

const app = express();

const dbUrl = 'mongodb://blogger:blogger123@ds125472.mlab.com:25472/graphql-blog';

app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: resolver,
	graphiql: true
}));

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
	if (err)
    	console.log(err.message)
  	else
    	console.log('MongoDB Successfully Connected ...');
});

app.listen(process.env.PORT || 4000, () => {
	console.log(`Server started on http://localhost:4000`);
});
