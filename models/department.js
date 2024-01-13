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
      Department.hasMany(models.Division, {foreignKey: 'department_id', as: 'divisions'});
    }
  }
  Department.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cover_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'department',
    underscored: true,
    timestamps: true
  });
  return Department;
};