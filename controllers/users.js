const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.getUser = async (req, res) => {
  try {
    const userObj = await user.findById(req.params.userId).orFail(new Error('ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН'));
    return res.json({ userObj });
  } catch (err) {
    return res.status(404).send({ message: 'Пользователь не найден' });
  }
};
