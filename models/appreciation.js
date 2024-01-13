'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appreciation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appreciation.belongsTo(models.Photo, {foreignKey: 'cover_id', as: 'cover'});
      Appreciation.belongsTo(models.Post, {foreignKey: 'post_id', as: 'post'})
    }
  }
  Appreciation.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cover_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    given_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    instagram_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_id: DataTypes.INTEGER,
    caption: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Appreciation',
    tableName: 'appreciation',
    underscored: true,
    timestamps: true
  });
  return Appreciation;
};