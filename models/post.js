'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Department, {foreignKey: 'department_id', as: 'department'});
      Post.belongsTo(models.User, {foreignKey: 'author_id', as: 'author'});
      Post.belongsTo(models.Event, {foreignKey: 'event_id', as: 'event'});
      Post.hasMany(models.Photo, {foreignKey: 'post_id', as: 'images'});
      Post.hasMany(models.Document, {foreignKey: 'post_id', as: 'attachments'});
      Post.hasOne(models.Appreciation, {foreignKey: 'post_id', as: 'appreciation'});
      Post.hasMany(models.Comment, {foreignKey: 'post_id', as: 'comments'});
    }
  }
  Post.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visitors: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tag1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tag2: DataTypes.STRING,
    tag3: DataTypes.STRING,
    tag4: DataTypes.STRING,
    tag5: DataTypes.STRING,
    search: DataTypes.TSVECTOR
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'post',
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });
  return Post;
};