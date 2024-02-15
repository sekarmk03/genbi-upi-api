'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardeeManagement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AwardeeManagement.belongsTo(models.Awardee, {foreignKey: 'awardee_id', as: 'awardee'});
      AwardeeManagement.belongsTo(models.Management, {foreignKey: 'management_id', as: 'management'});
      AwardeeManagement.belongsTo(models.Department, {foreignKey: 'department_id', as: 'department'});
      AwardeeManagement.belongsTo(models.Division, {foreignKey: 'division_id', as: 'division'});
      AwardeeManagement.belongsTo(models.Position, {foreignKey: 'position_id', as: 'position'});
    }
  }
  AwardeeManagement.init({
    awardee_id: DataTypes.INTEGER,
    management_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER,
    division_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AwardeeManagement',
    tableName: 'awardee_management',
    underscored: true,
    timestamps: true
  });
  return AwardeeManagement;
};