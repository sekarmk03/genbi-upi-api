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
   await queryInterface.bulkInsert('position', [
    {
      name: "Chief Executive Officer",
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Administration Officer",
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Finance Officer",
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Manager",
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Leader",
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Staff",
      description: null,
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
    await queryInterface.bulkDelete('position', null, {});
  }
};
