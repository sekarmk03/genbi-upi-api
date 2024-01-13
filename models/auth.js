'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auth.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: DataTypes.STRING,
    expire_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Auth',
    tableName: 'auth',
    underscored: true,
    timestamps: true
  });
  return Auth;
};