const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const config = require('./config/keys');

// local strategy
exports.local = passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// JWT strategy
exports.generateToken = (user) => {
	return jwt.sign(user, config.SECRET_KEY, { expiresIn: 604800 });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.SECRET_KEY;

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	User.findOne({ _id: jwt_payload._id }, (err, user) => {
		if (err) {
			return done(err, false);
		}
		else if (user) {
			return done(null, user);
		}
		else {
			return done(null, false);
		}
	});
}));

exports.verifyUser = passport.authenticate('jwt', { session: false });
