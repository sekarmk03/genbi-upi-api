'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('program', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      implementation_desc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_start: {
        type: Sequelize.DATEONLY
      },
      date_end: {
        type: Sequelize.DATEONLY
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      management_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('program');
  }
};