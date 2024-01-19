'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('management_department', [
    {
      management_id: 1,
      department_id: 1,
      cover_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      management_id: 1,
      department_id: 2,
      cover_id: 27,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      management_id: 1,
      department_id: 3,
      cover_id: 28,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      management_id: 1,
      department_id: 4,
      cover_id: 29,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      management_id: 1,
      department_id: 5,
      cover_id: 30,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      management_id: 1,
      department_id: 6,
      cover_id: 31,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      management_id: 1,
      department_id: 7,
      cover_id: 32,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      management_id: 1,
      department_id: 8,
      cover_id: 33,
      created_at: new Date(),
      updated_at: new Date(),
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
