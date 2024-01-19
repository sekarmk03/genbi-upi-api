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
      Department.hasMany(models.Division, {foreignKey: 'department_id', as: 'divisions'});
      Department.hasMany(models.Awardee, {foreignKey: 'department_id', as: 'awardees'});
      Department.hasMany(models.Post, {foreignKey: 'department_id', as: 'posts'});
      Department.belongsToMany(models.Management, {through: 'ManagementDepartment', foreignKey: 'department_id', as: 'management'});
      Department.hasMany(models.ManagementDepartment, {foreignKey: 'department_id', as: 'management_department'});
    }
  }
  Department.init({
    name: {
      type: DataTypes.STRING,
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