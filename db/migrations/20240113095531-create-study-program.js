'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('study_program', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      faculty_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jenjang: {
        type: Sequelize.ENUM('D1', 'D2', 'D3', 'S1', 'S2', 'S3', 'Profesi', 'Doktoral', 'SPS'),
        allowNull: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('study_program');
  }
};