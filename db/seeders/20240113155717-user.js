'use strict';
const bcrypt = require('bcrypt');

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
   await queryInterface.bulkInsert('user', [
    {
      id: "78ae90af-cfc9-4a7b-ba32-0fc7f593e40a",
      email: null,
      username: "@ekatiaranurf",
      password: await bcrypt.hash("11/28/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "51b972b0-609c-4a8a-a74b-2e662ef4efc8",
      email: null,
      username: "@shafasb__",
      password: await bcrypt.hash("8/19/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "e4c3358b-846c-42b0-b4b5-97a61f13cefb",
      email: null,
      username: "@azar_nuzy",
      password: await bcrypt.hash("11/6/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "d98a7247-8137-4a01-82f0-950e2bb4fe3e",
      email: null,
      username: "@sekarmk03",
      password: await bcrypt.hash("7/3/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "0f34e63f-c25b-4c4a-8a0d-89c704e340db",
      email: null,
      username: "@azakialbany",
      password: await bcrypt.hash("8/3/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "a7c69f5a-d19e-492a-8e5d-15e36d3ec39a",
      email: null,
      username: "@neysaardhina",
      password: await bcrypt.hash("2/21/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "31e523f8-891b-48d3-9f4e-7007eeb6c7eb",
      email: null,
      username: "@denismaulanaa_",
      password: await bcrypt.hash("10/1/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "f9cc33cd-9c0d-4cbf-af3a-6a53c3f0de7d",
      email: null,
      username: "@nadiraarevia",
      password: await bcrypt.hash("10/27/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "7bfcc72b-ff7d-4eaa-b79c-7a42d2a99c1d",
      email: null,
      username: "@dipoalm",
      password: await bcrypt.hash("9/27/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "c67d4a15-b1f5-4e94-9a5e-17739a509b8b",
      email: null,
      username: "@davu.elazar",
      password: await bcrypt.hash("5/10/2003", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "e10b1ea1-11f5-4959-9e1b-2c74c4a0d447",
      email: null,
      username: "@dwin0_0viaa",
      password: await bcrypt.hash("12/14/2000", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "24d71915-6313-430c-bc37-85db5c662a9b",
      email: null,
      username: "@tsalsabillanf",
      password: await bcrypt.hash("12/12/2001", 10),
      token: null,
      expire_at: null,
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
    await queryInterface.bulkDelete('user', null, {});
  }
};
