'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Program.belongsTo(models.Department, {foreignKey: 'department_id', as: 'department'});
      Program.belongsTo(models.Management, {foreignKey: 'management_id', as: 'management'});
      Program.hasMany(models.Event, {foreignKey: 'program_id', as: 'events'});
    }
  }
  Program.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    implementation_desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_start: DataTypes.DATEONLY,
    date_end: DataTypes.DATEONLY,
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    management_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Program',
    tableName: 'program',
    underscored: true,
    timestamps: true
  });
  return Program;
};