'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Division.belongsTo(models.Department, {foreignKey: 'department_id', as: 'department'});
    }
  }
  Division.init({
    name: DataTypes.STRING,
    department_id: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Division',
    tableName: 'division',
    underscored: true,
    timestamps: true
  });
  return Division;
};