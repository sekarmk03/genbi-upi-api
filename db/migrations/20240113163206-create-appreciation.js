'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appreciation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cover_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      given_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      instagram_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      caption: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('appreciation');
  }
};