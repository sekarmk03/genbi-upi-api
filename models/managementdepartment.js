'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ManagementDepartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ManagementDepartment.belongsTo(models.Photo, { foreignKey: 'cover_id', as: 'cover' });
      ManagementDepartment.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' });
    }
  }
  ManagementDepartment.init({
    management_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER,
    cover_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ManagementDepartment',
    tableName: 'management_department',
    underscored: true,
    timestamps: true
  });
  return ManagementDepartment;
};