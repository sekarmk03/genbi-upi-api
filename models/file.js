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
      File.hasMany(models.Photo, {foreignKey: 'file_id', as: 'photos'});
    }
  }
  File.init({
    file_name: DataTypes.STRING,
    imagekit_id: DataTypes.STRING,
    imagekit_url: DataTypes.STRING,
    imagekit_path: DataTypes.STRING,
    mimetype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'File',
    tableName: 'file',
    underscored: true,
    timestamps: true
  });
  return File;
};