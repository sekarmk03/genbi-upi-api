'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      visitors: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      tag1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tag2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tag3: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tag4: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tag5: {
        allowNull: true,
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
    await queryInterface.dropTable('post');
  }
};