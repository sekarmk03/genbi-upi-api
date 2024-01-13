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
      Photo.hasMany(models.Department, {foreignKey: 'cover_id', as: 'departments'});
      Photo.hasMany(models.Event, {foreignKey: 'thubmnail_id', as: 'event_thumbnails'});
      Photo.hasMany(models.Event, {foreignKey: 'poster_id', as: 'event_posters'});
      Photo.hasMany(models.Event, {foreignKey: 'banner_id', as: 'event_banners'});
    }
  }
  Photo.init({
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    caption: DataTypes.TEXT,
    category:{
      type: DataTypes.ENUM('department_cover', 'user_photo', 'appreciation_cover', 'event_thumbnail', 'event_poster', 'event_banner', 'post_cover_image', 'post_other_image'),
      allowNull: false
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
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