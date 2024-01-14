'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Faculty.hasMany(models.StudyProgram, {foreignKey: 'faculty_id', as: 'study_program'});
    }
  }
  Faculty.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abbr: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Faculty',
    tableName: 'faculty',
    underscored: true,
    timestamps: true
  });
  return Faculty;
};