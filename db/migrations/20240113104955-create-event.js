'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event', {
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
      program_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM('Online', 'Offline', 'Hybrid'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Coming Soon', 'Open Registration', 'Closed Registration', 'Ongoing', 'Finished'),
        allowNull: false
      },
      thumbnail_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      poster_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      banner_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location_url: {
        type: Sequelize.STRING
      },
      registration_link: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      tag1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tag2: {
        type: Sequelize.STRING
      },
      tag3: {
        type: Sequelize.STRING
      },
      tag4: {
        type: Sequelize.STRING
      },
      tag5: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('event');
  }
};