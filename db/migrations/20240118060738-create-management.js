'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('management', {
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
      photo_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      vision: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      mission: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
      },
      period_year: {
        type: Sequelize.STRING
      },
      period_start_date: {
        type: Sequelize.DATE
      },
      period_end_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('management');
  }
};