const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

module.exports = (app) => {
  const obeterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
    });
  };
  const save = (req, res) => {
    obeterHash(req.body.password, (hash) => {
      const password = hash;

      app
        .db('users')
        .insert({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(400).json(err));
    });
  };

  return { save };
};
