const {
  Model,
} = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static verifyToken(token, secret) {
      try {
        return jwt.verify(token, secret);
      } catch (error) {
        return false;
      }
    }

    static generateJwt(payload, secret, options) {
      // eslint-disable-next-line no-param-reassign
      delete payload.iat;
      return jwt.sign(payload, secret, options);
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.Note, { constraints: true, foreignKey: 'user_id' });
    }
  }
  Token.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
