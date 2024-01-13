'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: DataTypes.UUID,
    name: DataTypes.STRING,
    photo_id: DataTypes.INTEGER,
    birth_date: DataTypes.DATEONLY,
    linkedin_username: DataTypes.STRING,
    instagram_username: DataTypes.STRING,
    telp: DataTypes.STRING,
    member_since: DataTypes.DATEONLY,
    department_id: DataTypes.INTEGER,
    division_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER,
    scholarship: DataTypes.INTEGER,
    nim: DataTypes.STRING,
    study_id: DataTypes.INTEGER,
    faculty_id: DataTypes.INTEGER,
    year: DataTypes.STRING,
    smt1_grade: DataTypes.DECIMAL(4, 2),
    smt2_grade: DataTypes.DECIMAL(4, 2),
    smt3_grade: DataTypes.DECIMAL(4, 2),
    smt4_grade: DataTypes.DECIMAL(4, 2),
    smt5_grade: DataTypes.DECIMAL(4, 2),
    smt6_grade: DataTypes.DECIMAL(4, 2),
    smt7_grade: DataTypes.DECIMAL(4, 2),
    smt8_grade: DataTypes.DECIMAL(4, 2),
    transcript_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    underscored: true,
    timestamps: true
  });
  return User;
};