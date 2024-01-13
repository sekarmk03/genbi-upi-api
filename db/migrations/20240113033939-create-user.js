'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      photo_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      linkedin_username: {
        type: Sequelize.STRING
      },
      instagram_username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telp: {
        type: Sequelize.STRING
      },
      member_since: {
        type: Sequelize.DATEONLY
      },
      division_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      scholarship: {
        type: Sequelize.INTEGER
      },
      nim: {
        type: Sequelize.STRING
      },
      study_program_id: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
      },
      smt1_grade: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt2_grade: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt3_grade: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt4_grade: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt5_grade: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt6_grade: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt7_grade: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt8_grade: {
        type: Sequelize.DECIMAL(4, 2)
      },
      transcript_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};