'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post, {foreignKey: 'post_id', as: 'post'});
      Comment.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
      Comment.hasMany(models.Comment, {foreignKey: 'comment_id', as: 'replies'});
    }
  }
  Comment.init({
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comment',
    underscored: true,
    timestamps: true
  });
  return Comment;
};