'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Management extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Management.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    vision: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mission: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    period_year: DataTypes.STRING,
    period_start_date: DataTypes.DATE,
    period_end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Management',
    tableName: 'management',
    underscored: true,
    timestamps: true
  });
  return Management;
};