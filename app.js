const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('./authenticate');

const User = require('./models/user');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');
const config = require('./config/keys');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post('/signup', (req, res) => {
	User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
		if (err) {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({ err: err });
		}
		else {
			passport.authenticate('local')(req, res, () => {
				const token = authenticate.generateToken({ _id: user._id });

				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json({ token: token, status: 'Sucessfully Registered!' });
			});
		}
	});
});

app.post('/login', passport.authenticate('local'), (req, res) => {
	const token = authenticate.generateToken({ _id: req.user._id });

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({ token: token, status: 'Sucessfully Logged In!' });
});

app.use('/graphql', authenticate.verifyUser, graphqlHTTP({
	schema,
	rootValue: resolver
}));

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }, (err) => {
	if (err)
    	console.log(err.message)
  	else
    	console.log('MongoDB Successfully Connected ...');
});

app.listen(process.env.PORT || 4000, () => {
	console.log(`Server started on http://localhost:4000`);
});
