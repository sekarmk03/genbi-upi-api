'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Awardee, {foreignKey: 'user_id', as: 'awardee'});
      User.hasMany(models.UserRole, {foreignKey: 'user_id', as: 'roles'});
      User.hasMany(models.Post, {foreignKey: 'author_id', as: 'posts'});
      User.hasMany(models.Comment, {foreignKey: 'user_id', as: 'comments'});
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      unique: true
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
    modelName: 'User',
    tableName: 'user',
    underscored: true,
    timestamps: true
  });
  return User;
};