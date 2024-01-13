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
      Program.belongsTo(models.Division, {foreignKey: 'division_id', as: 'division'});
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
      type: DataTypes.ENUM('Conditional', 'Daily', 'Weekly', 'Monthly', 'Annually'),
      allowNull: false
    },
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    division_id: {
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