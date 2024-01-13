'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Department.belongsTo(models.Photo, {foreignKey: 'cover_id', as: 'cover'});
    }
  }
  Department.init({
    name: DataTypes.STRING,
    cover_id: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'department',
    underscored: true,
    timestamps: true
  });
  return Department;
};