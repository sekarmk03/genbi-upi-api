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
   await queryInterface.bulkInsert('division', [
    {
      name: "CEO",
      department_id: 1,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Administration",
      department_id: 2,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Finance",
      department_id: 3,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Creative",
      department_id: 4,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "ABC",
      department_id: 4,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Business",
      department_id: 5,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Event",
      department_id: 5,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Physical Health",
      department_id: 6,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Mental Health",
      department_id: 6,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Internal",
      department_id: 7,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "External",
      department_id: 7,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Research & Development",
      department_id: 8,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Event",
      department_id: 8,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "EduAction",
      department_id: 9,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "EduContent",
      department_id: 9,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Social",
      department_id: 10,
      description: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Environment",
      department_id: 10,
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
    await queryInterface.bulkDelete('division', null, {});
  }
};
