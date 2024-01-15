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
   await queryInterface.bulkInsert('photo', [
    {
      file_id: 1,
      alt: 'avatar-default1.jpg',
      caption: null,
      category: 'awardee_photo',
      featured: false,
      post_id: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 2,
      alt: 'avatar-default2.jpg',
      caption: null,
      category: 'awardee_photo',
      featured: false,
      post_id: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 3,
      alt: 'avatar-default3.jpg',
      caption: null,
      category: 'awardee_photo',
      featured: false,
      post_id: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 4,
      alt: 'avatar-default4.jpg',
      caption: null,
      category: 'awardee_photo',
      featured: false,
      post_id: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 7,
      alt: 'hero-1.webp',
      caption: "[caption] What We're Reading: Goodbye 2023, hello 2024",
      category: 'post_cover_image',
      featured: false,
      post_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 8,
      alt: 'article-4.jpeg',
      caption: "[caption] Winter Scene Wins South Downs Photo Competition",
      category: 'post_cover_image',
      featured: false,
      post_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 9,
      alt: 'article-1.jpeg',
      caption: "[caption] Corporate Announcement: Strategic Partnership for Space Exploration",
      category: 'post_cover_image',
      featured: false,
      post_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 10,
      alt: 'isola.jpg',
      caption: "[caption] Exploring the Wonders of Underwater Life",
      category: 'post_cover_image',
      featured: false,
      post_id: 4,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 11,
      alt: 'article-2.jpeg',
      caption: "[caption] Medical Breakthrough: Advancements in Cancer Treatment",
      category: 'post_cover_image',
      featured: false,
      post_id: 5,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 12,
      alt: 'article-3.jpeg',
      caption: "[caption] Revolutionizing the Future: Artificial Intelligence Trends in 2024",
      category: 'post_cover_image',
      featured: false,
      post_id: 6,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 13,
      alt: 'Barbados_Blue_Bond_Hawksbill_Shane_Gross.jpg',
      caption: "[caption] The Green Revolution: Sustainable Living in 2024",
      category: 'post_cover_image',
      featured: false,
      post_id: 7,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 14,
      alt: 'depositphotos_632596596-stock-photo-drone-view-winter-landscape-pine.jpg',
      caption: "[caption] Unveiling the Mysteries of the Cosmos: Astronomy in 2024",
      category: 'post_cover_image',
      featured: false,
      post_id: 8,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 15,
      alt: 'hub_bluezones_article.webp',
      caption: "[caption] Financial News: Record-Breaking Quarter for Tech Giants",
      category: 'post_cover_image',
      featured: false,
      post_id: 9,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 16,
      alt: 'Melanesians-Black-Blonde-Hair-Twitter-wesrono.jpg',
      caption: "[caption] Culinary Adventures: Exploring Global Flavors in 2024",
      category: 'post_cover_image',
      featured: false,
      post_id: 10,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 17,
      alt: 'pexels-james-wheeler-417074.jpg',
      caption: "[caption] Looking Back: A Lasting Glimpse of 2023",
      category: 'post_cover_image',
      featured: false,
      post_id: 11,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 18,
      alt: 'blue-People-in-nature-azure-cartoon-sky-happy-1994921-wallhere.com.jpg',
      caption: "[caption] Environmental Initiative: Companies Unite for Carbon Neutrality",
      category: 'post_cover_image',
      featured: false,
      post_id: 12,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 19,
      alt: 'HD-wallpaper-a-happy-moment-pretty-grass-beautiful-father-bed-sweet-emotional-people-love-other-blue-male-man-sky-happy-cute-boy-men-nature-son.jpg',
      caption: "[caption] Breaking News: Major Breakthrough in Renewable Energy Technology",
      category: 'post_cover_image',
      featured: false,
      post_id: 13,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 20,
      alt: 'post-detail-40b96a929887f1778e91aff93e52f2f0.jpeg',
      caption: "[caption] What We're Reading: Goodbye 2023, hello 2024",
      category: 'post_other_image',
      featured: false,
      post_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 21,
      alt: 'post-detail-e9c13d9539d82c1cea630a2353cf9b14.jpeg',
      caption: "[caption] What We're Reading: Goodbye 2023, hello 2024",
      category: 'post_other_image',
      featured: false,
      post_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 22,
      alt: 'post-detail-de78554e5bd01fb2dc712fac4dff1be7.jpeg',
      caption: "[caption] What We're Reading: Goodbye 2023, hello 2024",
      category: 'post_other_image',
      featured: false,
      post_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 23,
      alt: 'post-detail-2f924d1c390baf5402b51b8596f246c8.jpeg',
      caption: "[caption] What We're Reading: Goodbye 2023, hello 2024",
      category: 'post_other_image',
      featured: false,
      post_id: 1,
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
    await queryInterface.bulkDelete('photo', null, {});
  }
};
