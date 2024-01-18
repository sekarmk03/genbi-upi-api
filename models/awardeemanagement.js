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
      // AwardeeManagement.belongsTo(models.Awardee, { foreignKey: 'awardee_id', as: 'awardee_management' });
      // AwardeeManagement.belongsTo(models.Management, { foreignKey: 'management_id', as: 'awardee_management' });
    }
  }
  AwardeeManagement.init({
    awardee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    management_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AwardeeManagement',
    tableName: 'awardee_management',
    underscored: true,
    timestamps: true
  });
  return AwardeeManagement;
};