'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      File.hasOne(models.Photo, {foreignKey: 'file_id', as: 'photos'});
      File.hasOne(models.Document, {foreignKey: 'file_id', as: 'documents'});
    }
  }
  File.init({
    file_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagekit_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagekit_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagekit_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'File',
    tableName: 'file',
    underscored: true,
    timestamps: true
  });
  return File;
};