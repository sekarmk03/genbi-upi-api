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
   await queryInterface.bulkInsert('file', [
    {
      file_name: "avatar1.jpg",
      imagekit_id: "65a3c26988c257da33ca9458",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/avatar1.jpg",
      imagekit_path: "/genbi_upi/avatar1.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "avatar3.jpg",
      imagekit_id: "65a3c26988c257da33ca952c",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/avatar3.jpg",
      imagekit_path: "/genbi_upi/avatar3.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "avatar2.jpg",
      imagekit_id: "65a3c26988c257da33ca945d",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/avatar2.jpg",
      imagekit_path: "/genbi_upi/avatar2.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "avatar4.jpg",
      imagekit_id: "65a3c26988c257da33ca94f5",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/avatar4.jpg",
      imagekit_path: "/genbi_upi/avatar4.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 5
      file_name: "sample1.pdf",
      imagekit_id: "65a3c2a588c257da33cb95e0",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/sample1.pdf",
      imagekit_path: "/genbi_upi/sample1.pdf",
      mimetype: "application/pdf",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 6
      file_name: "sample2.pdf",
      imagekit_id: "65a3c32088c257da33cc996e",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/sample2.pdf",
      imagekit_path: "/genbi_upi/sample2.pdf",
      mimetype: "application/pdf",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "hero-1.webp",
      imagekit_id: "65a51b0a88c257da33329fab",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/hero-1.webp",
      imagekit_path: "/genbi_upi/hero-1.webp",
      mimetype: "image/webp",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "article-4.jpeg",
      imagekit_id: "65a51b0488c257da33329334",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/article-4.jpeg",
      imagekit_path: "/genbi_upi/article-4.jpeg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "article-1.jpeg",
      imagekit_id: "65a51af488c257da3332742a",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/article-1.jpeg",
      imagekit_path: "/genbi_upi/article-1.jpeg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "isola.jpg",
      imagekit_id: "65a51af488c257da3332738f",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/isola.jpg",
      imagekit_path: "/genbi_upi/isola.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "article-2.jpeg",
      imagekit_id: "65a51af188c257da33326fa9",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/article-2.jpeg",
      imagekit_path: "/genbi_upi/article-2.jpeg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "article-3.jpeg",
      imagekit_id: "65a51af188c257da33326e54",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/article-3.jpeg",
      imagekit_path: "/genbi_upi/article-3.jpeg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "Barbados_Blue_Bond_Hawksbill_Shane_Gross.jpg",
      imagekit_id: "65a51d2088c257da333816eb",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/Barbados_Blue_Bond_Hawksbill_Shane_Gross.jpg",
      imagekit_path: "/genbi_upi/Barbados_Blue_Bond_Hawksbill_Shane_Gross.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "depositphotos_632596596-stock-photo-drone-view-winter-landscape-pine.jpg",
      imagekit_id: "65a51d1d88c257da33380594",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/depositphotos_632596596-stock-photo-drone-view-winter-landscape-pine.jpg",
      imagekit_path: "/genbi_upi/depositphotos_632596596-stock-photo-drone-view-winter-landscape-pine.jpg",
      mimetype: "image/webp",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 15
      file_name: "hub_bluezones_article.webp",
      imagekit_id: "65a51d1d88c257da33380510",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/hub_bluezones_article.webp",
      imagekit_path: "/genbi_upi/hub_bluezones_article.webp",
      mimetype: "image/webp",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "Melanesians-Black-Blonde-Hair-Twitter-wesrono.jpg",
      imagekit_id: "65a54bd288c257da3312081f",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/Melanesians-Black-Blonde-Hair-Twitter-wesrono.jpg",
      imagekit_path: "/genbi_upi/Melanesians-Black-Blonde-Hair-Twitter-wesrono.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "pexels-james-wheeler-417074.jpg",
      imagekit_id: "65a54bd588c257da33121b2b",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/pexels-james-wheeler-417074.jpg",
      imagekit_path: "/genbi_upi/pexels-james-wheeler-417074.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "blue-People-in-nature-azure-cartoon-sky-happy-1994921-wallhere.com.jpg",
      imagekit_id: "65a54bd588c257da331219ad",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/blue-People-in-nature-azure-cartoon-sky-happy-1994921-wallhere.com.jpg",
      imagekit_path: "/genbi_upi/blue-People-in-nature-azure-cartoon-sky-happy-1994921-wallhere.com.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 19
      file_name: "HD-wallpaper-a-happy-moment-pretty-grass-beautiful-father-bed-sweet-emotional-people-love-other-blue-male-man-sky-happy-cute-boy-men-nature-son.jpg",
      imagekit_id: "65a54bd188c257da3312067e",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/HD-wallpaper-a-happy-moment-pretty-grass-beautiful-father-bed-sweet-emotional-people-love-other-blue-male-man-sky-happy-cute-boy-men-nature-son.jpg",
      imagekit_path: "/genbi_upi/HD-wallpaper-a-happy-moment-pretty-grass-beautiful-father-bed-sweet-emotional-people-love-other-blue-male-man-sky-happy-cute-boy-men-nature-son.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 20
      file_name: "post-detail-40b96a929887f1778e91aff93e52f2f0.jpeg",
      imagekit_id: "65a54f2688c257da33255b5a",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/post-detail-40b96a929887f1778e91aff93e52f2f0.jpeg",
      imagekit_path: "/genbi_upi/post-detail-40b96a929887f1778e91aff93e52f2f0.jpeg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "post-detail-e9c13d9539d82c1cea630a2353cf9b14.jpeg",
      imagekit_id: "65a54f2888c257da332563da",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/post-detail-e9c13d9539d82c1cea630a2353cf9b14.jpeg",
      imagekit_path: "/genbi_upi/post-detail-e9c13d9539d82c1cea630a2353cf9b14.jpeg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "post-detail-de78554e5bd01fb2dc712fac4dff1be7.jpeg",
      imagekit_id: "65a54f2888c257da332563c0",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/post-detail-de78554e5bd01fb2dc712fac4dff1be7.jpeg",
      imagekit_path: "/genbi_upi/post-detail-de78554e5bd01fb2dc712fac4dff1be7.jpeg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 23
      file_name: "post-detail-2f924d1c390baf5402b51b8596f246c8.jpeg",
      imagekit_id: "65a54f2588c257da332556e7",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/post-detail-2f924d1c390baf5402b51b8596f246c8.jpeg",
      imagekit_path: "/genbi_upi/post-detail-2f924d1c390baf5402b51b8596f246c8.jpeg",
      mimetype: "image/jpeg",
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
    await queryInterface.bulkDelete('file', null, {});
  }
};
