'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('awardee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
      smt1_ip: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt2_ip: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt3_ip: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt4_ip: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt5_ip: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt6_ip: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt7_ip: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt8_ip: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt1_ipk: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt2_ipk: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt3_ipk: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt4_ipk: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt5_ipk: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt6_ipk: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt7_ipk: {
        type: Sequelize.DECIMAL(4, 2)
      },
      smt8_ipk: {
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
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('awardee');
  }
};