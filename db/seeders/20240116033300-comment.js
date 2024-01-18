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
   await queryInterface.bulkInsert('comment', [
    { // p1 // r1 // c1
      post_id: 1,
      comment_id: null,
      level: 0,
      name: "Eka Tiara Nur Fitriana",
      content: "Great article! Very informative.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 1,
      level: 1,
      name: "Shafa Salsabila",
      content: "Thank you! I'm glad you found it helpful.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 1,
      level: 1,
      name: "Muhammad Azar Nuzy",
      content: "Appreciate your feedback! Is there anything specific you enjoyed?",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p1 // r2 // c4
      post_id: 1,
      comment_id: null,
      level: 0,
      name: "Sekar Madu Kusumawardani",
      content: "This is fascinating. I didn't know about these facts.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 4,
      level: 1,
      name: null,
      content: "I'm glad you found it interesting! Knowledge is always evolving.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 4,
      level: 1,
      name: "Azaki Shaleh Albany",
      content: "There's always more to learn. If you have any questions, feel free to ask.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p1 // r3 // c7
      post_id: 1,
      comment_id: null,
      level: 0,
      name: null,
      content: "I disagree with the author's perspective on this issue.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 7,
      level: 1,
      name: "Neysa Ardhina",
      content: "It's okay to have different opinions. What points do you disagree with?",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 7,
      level: 1,
      name: "Denis Erlangga Maulana",
      content: "Diverse perspectives enrich the conversation. Let's discuss your views further.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p2 // r4 // c10
      post_id: 2,
      comment_id: null,
      level: 0,
      name: "Nadira Arevia Hermawan",
      content: "I appreciate the balanced approach taken in discussing pros and cons.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 10,
      level: 1,
      name: "Mochammad Diponegoro",
      content: "Maintaining a balanced perspective is crucial. Thank you for recognizing that.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 10,
      level: 1,
      name: "Davu Raissa Elazar",
      content: "It's important to present a fair view. If you have any suggestions for improvement, feel free to share.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p2 // r5 // c13
      post_id: 2,
      comment_id: null,
      level: 0,
      name: null,
      content: "Could you provide more examples to illustrate your points?",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 13,
      level: 1,
      name: "Dwi Novia Al Husaeni",
      content: "Certainly! I'll work on adding more examples in the next update.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 13,
      level: 1,
      name: null,
      content: "Your input is valuable. I'll make sure to include more examples for clarity.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p2 // r6 // c16
      post_id: 2,
      comment_id: null,
      level: 0,
      name: "Tsalsabilla Nurfitriyatna Putri",
      content: "I love the visuals in this post. Well-designed!",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 16,
      level: 1,
      name: null,
      content: "Thank you! Visuals can enhance the understanding of complex topics.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 16,
      level: 1,
      name: null,
      content: "Our design team puts a lot of effort into creating engaging visuals. Appreciate your feedback!",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p3 // r7 // c19
      post_id: 3,
      comment_id: null,
      level: 0,
      name: null,
      content: "I found a typo in paragraph three. Please fix it.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 3,
      comment_id: 19,
      level: 1,
      name: "Eka Tiara Nur Fitriana",
      content: "Thanks for catching that! I'll correct it right away.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 3,
      comment_id: 19,
      level: 1,
      name: "Shafa Salsabila",
      content: "Your attention to detail is appreciated. We'll make sure to proofread more thoroughly.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p3 // r8 // c22
      post_id: 3,
      comment_id: null,
      level: 0,
      name: "Muhammad Azar Nuzy",
      content: "The author did a great job addressing common misconceptions.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 3,
      comment_id: 22,
      level: 1,
      name: null,
      content: "Absolutely! Clarifying misconceptions is crucial for accurate information.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 3,
      comment_id: 22,
      level: 1,
      name: "Sekar Madu Kusumawardani",
      content: "Glad you noticed that! Misconceptions can hinder understanding, so it's essential to address them.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p4 // r9 // c25
      post_id: 4,
      comment_id: null,
      level: 0,
      name: null,
      content: "I wish there were more references to support the claims.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 4,
      comment_id: 25,
      level: 1,
      name: null,
      content: "Your concern is valid. We'll work on providing additional references in future articles.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 4,
      comment_id: 25,
      level: 1,
      name: "Azaki Shaleh Albany",
      content: "Thank you for your feedback. Adding more references to substantiate claims is a priority.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // p4 // r10 // c28
      post_id: 4,
      comment_id: null,
      level: 0,
      name: "Mochammad Diponegoro",
      content: "This post inspired me to delve deeper into the topic. Any recommended resources?",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 4,
      comment_id: 28,
      level: 1,
      name: "Dwi Novia Al Husaeni",
      content: "That's wonderful to hear! Check out these books and research papers on the subject.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 4,
      comment_id: 28,
      level: 1,
      name: "Neysa Ardhina",
      content: "I'm glad the post sparked your interest! Here are some recommended resources for further exploration.",
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
    await queryInterface.bulkDelete('comment', null, {});
  }
};
