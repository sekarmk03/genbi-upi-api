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
   await queryInterface.bulkInsert('awardee_management', [
    {
      awardee_id: 1,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 2,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 3,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 4,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 5,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 6,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 7,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 8,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 9,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 10,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 11,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      awardee_id: 12,
      management_id: 1,
      created_at: new Date(),
      updated_at: new Date()
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
    await queryInterface.bulkDelete('awardee_management', null, {});
  }
};
