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
    }
  }
  Post.init({
    type: DataTypes.ENUM('article', 'press release', 'report', 'news'),
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    department_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    featured: DataTypes.BOOLEAN,
    visitors: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    tag1: DataTypes.STRING,
    tag2: DataTypes.STRING,
    tag3: DataTypes.STRING,
    tag4: DataTypes.STRING,
    tag5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'post',
    underscored: true,
    timestamps: true
  });
  return Post;
};