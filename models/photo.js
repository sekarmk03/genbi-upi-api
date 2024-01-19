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
      Photo.belongsTo(models.Post, {foreignKey: 'post_id', as: 'post'});
      Photo.hasMany(models.Awardee, {foreignKey: 'photo_id', as: 'awardee_photo'});
      Photo.hasMany(models.Department, {foreignKey: 'cover_id', as: 'departments'});
      Photo.hasMany(models.Event, {foreignKey: 'thubmnail_id', as: 'event_thumbnails'});
      Photo.hasMany(models.Event, {foreignKey: 'poster_id', as: 'event_posters'});
      Photo.hasMany(models.Event, {foreignKey: 'banner_id', as: 'event_banners'});
      Photo.hasMany(models.Appreciation, {foreignKey: 'cover_id', as: 'appreciations'});
      Photo.hasMany(models.ManagementDepartment, {foreignKey: 'cover_id', as: 'management_departments_cover'});
      Photo.hasMany(models.Management, {foreignKey: 'cover_id', as: 'management_cover'});
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
      type: DataTypes.STRING,
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