'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ManagementAwardee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ManagementAwardee.belongsTo(models.Awardee, { foreignKey: 'awardee_id', as: 'awardee_management' });
      // ManagementAwardee.belongsTo(models.Management, { foreignKey: 'management_id', as: 'awardee_management' });
    }
  }
  ManagementAwardee.init({
    management_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    awardee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ManagementAwardee',
    tableName: 'management_awardee',
    underscored: true,
    timestamps: true
  });
  return ManagementAwardee;
};