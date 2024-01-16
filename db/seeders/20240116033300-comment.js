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
    { // 1
      post_id: 1,
      comment_id: null,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 0,
      content: "Great article! Very informative.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 1,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Thank you! I'm glad you found it helpful.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 1,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Appreciate your feedback! Is there anything specific you enjoyed?",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 2
      post_id: 1,
      comment_id: null,
      user_id: null,
      level: 0,
      content: "This is fascinating. I didn't know about these facts.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 2,
      user_id: null,
      level: 1,
      content: "I'm glad you found it interesting! Knowledge is always evolving.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 2,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "There's always more to learn. If you have any questions, feel free to ask.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 3
      post_id: 1,
      comment_id: null,
      user_id: null,
      level: 0,
      content: "I disagree with the author's perspective on this issue.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 3,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "It's okay to have different opinions. What points do you disagree with?",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 1,
      comment_id: 3,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Diverse perspectives enrich the conversation. Let's discuss your views further.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 4
      post_id: 2,
      comment_id: null,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 0,
      content: "I appreciate the balanced approach taken in discussing pros and cons.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 4,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Maintaining a balanced perspective is crucial. Thank you for recognizing that.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 4,
      user_id: null,
      level: 1,
      content: "It's important to present a fair view. If you have any suggestions for improvement, feel free to share.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 5
      post_id: 2,
      comment_id: null,
      user_id: null,
      level: 0,
      content: "Could you provide more examples to illustrate your points?",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 5,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Certainly! I'll work on adding more examples in the next update.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 5,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Your input is valuable. I'll make sure to include more examples for clarity.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 6
      post_id: 2,
      comment_id: null,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 0,
      content: "I love the visuals in this post. Well-designed!",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 6,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Thank you! Visuals can enhance the understanding of complex topics.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 2,
      comment_id: 6,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Our design team puts a lot of effort into creating engaging visuals. Appreciate your feedback!",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 7
      post_id: 3,
      comment_id: null,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 0,
      content: "I found a typo in paragraph three. Please fix it.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 3,
      comment_id: 7,
      user_id: null,
      level: 1,
      content: "Thanks for catching that! I'll correct it right away.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 3,
      comment_id: 7,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Your attention to detail is appreciated. We'll make sure to proofread more thoroughly.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 8
      post_id: 3,
      comment_id: null,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 0,
      content: "The author did a great job addressing common misconceptions.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 3,
      comment_id: 8,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Absolutely! Clarifying misconceptions is crucial for accurate information.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 3,
      comment_id: 8,
      user_id: null,
      level: 1,
      content: "Glad you noticed that! Misconceptions can hinder understanding, so it's essential to address them.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 9
      post_id: 4,
      comment_id: null,
      user_id: null,
      level: 0,
      content: "I wish there were more references to support the claims.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 4,
      comment_id: 9,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Your concern is valid. We'll work on providing additional references in future articles.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 4,
      comment_id: 9,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
      content: "Thank you for your feedback. Adding more references to substantiate claims is a priority.",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 10
      post_id: 4,
      comment_id: null,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 0,
      content: "This post inspired me to delve deeper into the topic. Any recommended resources?",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 4,
      comment_id: 10,
      user_id: null,
      level: 1,
      content: "That's wonderful to hear! Check out these books and research papers on the subject.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      post_id: 4,
      comment_id: 10,
      user_id: Math.floor(Math.random() * 12) + 1,
      level: 1,
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
