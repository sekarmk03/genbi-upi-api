'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.File, {foreignKey: 'file_id', as: 'file'});
      Photo.belongsTo(models.Post, {foreignKey: 'post_id', as: 'post', allowNull: true});
      Photo.hasMany(models.User, {foreignKey: 'photo_id', as: 'users'});
    }
  }
  Photo.init({
    file_id: DataTypes.INTEGER,
    alt: DataTypes.STRING,
    caption: DataTypes.TEXT,
    category: DataTypes.ENUM('department_cover', 'user_photo', 'appreciation_cover', 'event_thumbnail', 'event_poster', 'event_banner'),
    featured: DataTypes.BOOLEAN,
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Photo',
    tableName: 'photo',
    underscored: true,
    timestamps: true
  });
  return Photo;
};