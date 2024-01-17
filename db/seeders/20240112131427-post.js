'use strict';
const generateSlug = require('../../utils/generate-slug');

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
   await queryInterface.bulkInsert('post', [
    {
      type: "Article",
      title: "What We're Reading: Goodbye 2023, hello 2024",
      slug: generateSlug("What We're Reading: Goodbye 2023, hello 2024"),
      content: `<p>Here we are, the magical first week of a new year. I have to confess, I&nbsp;<em>love</em>&nbsp;this week. It&rsquo;s a time of resetting and starting new things, when the conventions of the calendar give us all permission to build a new.</p>
      <p>If you&rsquo;re still looking back, there are plenty of year-end stories on Medium to savor, from this dizzyingly comprehensive roundup of&nbsp;<a href="https://medium.com/u/69b5834e76d3?source=post_page-----8bff31327795--------------------------------" rel="noopener" target="_blank">Hanif Abdurraqib</a>&rsquo;s&nbsp;<a href="https://nifmuhammad.medium.com/108-favorite-albums-of-2023-6923c93f0e9d" rel="noopener">108 (!) favorite albums of the year</a>&nbsp;to the eighth annual installment of poet and essayist&nbsp;<a href="https://medium.com/u/283d4846ea39?source=post_page-----8bff31327795--------------------------------" rel="noopener" target="_blank">Elisa Gabbert</a>&rsquo;s &ldquo;<a href="https://elisagabbert.medium.com/every-book-i-read-in-2023-with-commentary-ed80a56ab59a" rel="noopener">Every book I read in 2023, with commentary</a>.&rdquo;&nbsp;<a href="https://medium.com/u/9e422a605dc5?source=post_page-----8bff31327795--------------------------------" rel="noopener" target="_blank">Barack Obama</a>&nbsp;shared&nbsp;<a href="https://barackobama.medium.com/here-are-my-favorite-books-movies-and-music-of-2023-3bc178471aed" rel="noopener">his favorite books, movies, and music of 2023</a>, and photographer&nbsp;<a href="https://medium.com/u/af183b3e65e9?source=post_page-----8bff31327795--------------------------------" rel="noopener" target="_blank">Adam Scotti</a>&nbsp;pulled together his favorite photos of &ldquo;<a href="https://cdnadamscotti.medium.com/2023-with-prime-minister-trudeau-b338e8ee1e57" rel="noopener">2023 with Prime Minister Trudeau</a>.&rdquo;</p>`,
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: null,
      tag1: "What Were Reading",
      tag2: "Goals",
      tag3: "Resolutions",
      tag4: "Year End",
      tag5: "2024",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Press Release",
      title: "Winter Scene Wins South Downs Photo Competition",
      slug: generateSlug("Winter Scene Wins South Downs Photo Competition"),
      content: `<p>An image of autumn leaves over a winter woodland scene in West Sussex has won top prize in the annual South Downs National Park photography competition. Matt Goddard said he was &quot;truly honoured&quot; to have been given the award for his shot, titled <strong><em>&quot;Snow on Wolstonbury&quot;</em></strong>. Mr Goddard, from Hurstpierpoint, added his love of exploring the South Downs &quot;started during childhood&quot; and &quot;hasn&#39;t stopped since&quot;.</p>
      <p>The theme for 2023 was <u><em><strong>&quot;a new perspective&quot;</strong></em></u>. Carlotta Luke, photographer and one of the judges, said:</p>
      <blockquote>
      <p>&quot;The shape of the path is drawing me into the photo and I just want to be there in that snowy South Downs landscape. The orange leaves are just beautiful on the white snow.&quot;</p>
      </blockquote>
      <h2><strong>&#39;Timeless Feel&#39;</strong></h2>
      <p>Mr Goddard, who won <strong>&pound;250</strong> in the competition, said there was a &quot;timeless feel&quot; to Wolstonbury. &quot;A snowy landscape is always magical and the last of autumn&#39;s golden leaves came as a pleasant surprise.&quot; He added: &ldquo;Sussex is blessed to have the national park&rsquo;s rich history, varied landscape and stunning views. &quot;Capturing and sharing its beauty has played a big part in my career and enjoyment of landscape photography.&quot;</p>`,
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: Math.floor(Math.random() * 16),
      tag1: "Photography",
      tag2: "Nature",
      tag3: "Photo Competition",
      tag4: "Winter",
      tag5: "South Downs",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Press Release",
      title: "Corporate Announcement: Strategic Partnership for Space Exploration",
      slug: generateSlug("Corporate Announcement: Strategic Partnership for Space Exploration"),
      content: "<p>We are excited to announce a strategic partnership that will shape the future of space exploration. Two leading organizations have joined forces to advance space research, technology, and collaborative missions that will push the boundaries of human exploration beyond our planet.</p><p>Join us for a press briefing to learn more about this unprecedented collaboration and the exciting space endeavors it will unlock.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: Math.floor(Math.random() * 16),
      tag1: "Space Exploration",
      tag2: "Strategic Partnership",
      tag3: "Collaboration",
      tag4: "Press Briefing",
      tag5: "Space Missions",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Article",
      title: "Exploring the Wonders of Underwater Life",
      slug: generateSlug("Exploring the Wonders of Underwater Life"),
      content: `<p>Dive deep into the mesmerizing world beneath the waves. <b>Witness the vibrant colors of coral reefs</b>, the graceful movements of marine life, and the delicate balance of underwater ecosystems. Discover the beauty that lies beneath the surface and join us on a journey to explore the wonders of underwater life.</p><p>Whether you're a seasoned diver or a curious onlooker, the ocean has <i>secrets waiting to be unveiled</i>. Strap on your gear, take a deep breath, and embark on an adventure into the heart of the ocean's mysteries.</p>`,
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: null,
      tag1: "Underwater Exploration",
      tag2: "Marine Life",
      tag3: "Coral Reefs",
      tag4: "Diving Adventures",
      tag5: "Ocean Mysteries",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Press Release",
      title: "Medical Breakthrough: Advancements in Cancer Treatment",
      slug: generateSlug("Medical Breakthrough: Advancements in Cancer Treatment"),
      content: "<p>In a significant stride towards medical innovation, researchers have achieved groundbreaking advancements in cancer treatment. The latest discoveries hold promise for more effective therapies, improved patient outcomes, and a potential shift in the fight against cancer.</p><p>Join us for a Press Release event where experts will share insights into these medical breakthroughs and their potential impact on the field of oncology.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: Math.floor(Math.random() * 16),
      tag1: "Medical Breakthrough",
      tag2: "Cancer Treatment",
      tag3: "Innovation",
      tag4: "Press Event",
      tag5: "Oncology",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Article",
      title: "Revolutionizing the Future: Artificial Intelligence Trends in 2024",
      slug: generateSlug("Revolutionizing the Future: Artificial Intelligence Trends in 2024"),
      content: `<p>As we step into the new year, the landscape of artificial intelligence continues to evolve at a rapid pace. From breakthroughs in machine learning to advancements in natural language processing, 2024 promises to be a pivotal year for AI enthusiasts and professionals alike.</p><p>Explore the latest trends shaping the AI industry, from the rise of ethical AI practices to the integration of AI in various sectors. Stay ahead of the curve as we delve into the future of artificial intelligence and its transformative impact on technology and society.</p>`,
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: null,
      tag1: "Artificial Intelligence",
      tag2: "Technology Trends",
      tag3: "Machine Learning",
      tag4: "Ethical AI",
      tag5: "Innovation",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Article",
      title: "The Green Revolution: Sustainable Living in 2024",
      slug: generateSlug("The Green Revolution: Sustainable Living in 2024"),
      content: "<p>Embrace a lifestyle that cares for the planet. In 2024, the green revolution is in full swing, with individuals and communities adopting sustainable practices to minimize their environmental footprint. From eco-friendly innovations to simple everyday changes, discover how you can contribute to a greener, healthier Earth.</p><p>Join the movement towards sustainable living, explore eco-conscious initiatives, and be inspired by the positive impact individuals can make. Together, let's make 2024 a year of sustainable choices and a brighter future for our planet.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: null,
      tag1: "Sustainable Living",
      tag2: "Green Revolution",
      tag3: "Environmental Consciousness",
      tag4: "Eco-Friendly Innovations",
      tag5: "Climate Action",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Article",
      title: "Unveiling the Mysteries of the Cosmos: Astronomy in 2024",
      slug: generateSlug("Unveiling the Mysteries of the Cosmos: Astronomy in 2024"),
      content: "<p>Peer into the vastness of the cosmos as we embark on a celestial journey through the wonders of astronomy. In 2024, astronomical discoveries continue to captivate our imagination, from distant galaxies to exoplanets with the potential for life.</p><p>Stay updated on the latest celestial phenomena, astronomical events, and space exploration missions. Join us in unraveling the mysteries of the universe and expanding our understanding of the cosmos in this exciting year for astronomy.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: null,
      tag1: "Astronomy",
      tag2: "Cosmic Discoveries",
      tag3: "Space Exploration",
      tag4: "Celestial Phenomena",
      tag5: "Stargazing",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Press Release",
      title: "Financial News: Record-Breaking Quarter for Tech Giants",
      slug: generateSlug("Financial News: Record-Breaking Quarter for Tech Giants"),
      content: "<p>In a major financial announcement, leading tech giants have reported a record-breaking quarter with unprecedented growth in revenue and market performance. Industry analysts are calling this a significant milestone, reflecting the robust health of the technology sector.</p><p>Stay informed with detailed insights and analysis in our upcoming Press Release briefing on the financial success of these tech industry leaders.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: Math.floor(Math.random() * 16),
      tag1: "Financial News",
      tag2: "Tech Giants",
      tag3: "Market Performance",
      tag4: "Press Release Briefing",
      tag5: "Economic Trends",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Article",
      title: "Culinary Adventures: Exploring Global Flavors in 2024",
      slug: generateSlug("Culinary Adventures: Exploring Global Flavors in 2024"),
      content: "<p>Savor the rich tapestry of global cuisines as we embark on a culinary journey around the world. In 2024, food enthusiasts are in for a treat with a diverse array of flavors, fusions, and gastronomic delights.</p><p>Discover the latest trends in international cuisine, explore unique recipes, and indulge in the pleasures of diverse food cultures. From street food to fine dining, join us in celebrating the culinary adventures that await in 2024.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: null,
      tag1: "Culinary Exploration",
      tag2: "Global Flavors",
      tag3: "Food Trends",
      tag4: "International Cuisine",
      tag5: "Gastronomy",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Article",
      title: "Looking Back: A Lasting Glimpse of 2023",
      slug: generateSlug("Looking Back: A Lasting Glimpse of 2023"),
      content: "<p>Take a last, lingering look at the year that was as we bid farewell to 2023. Engage in rituals of reflection, from deleting every meeting on your calendar to drawing inspiration from the best of 2023 lists. Join the journey of savoring the memories and wisdom of the past year.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: null,
      tag1: "Reflection",
      tag2: "Year-End",
      tag3: "Memories",
      tag4: "2023",
      tag5: "Farewell",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Press Release",
      title: "Environmental Initiative: Companies Unite for Carbon Neutrality",
      slug: generateSlug("Environmental Initiative: Companies Unite for Carbon Neutrality"),
      content: "<p>In a collective effort towards environmental sustainability, a coalition of companies has united to achieve carbon neutrality goals. This collaborative initiative aims to reduce carbon footprints, promote green practices, and contribute to a more eco-friendly business landscape.</p><p>Join us for a Press Release event where company leaders will outline the details of this environmental initiative and its potential impact on corporate responsibility.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: Math.floor(Math.random() * 16),
      tag1: "Environmental Initiative",
      tag2: "Carbon Neutrality",
      tag3: "Sustainability",
      tag4: "Press Release Event",
      tag5: "Corporate Responsibility",
      search: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      type: "Press Release",
      title: "Breaking News: Major Breakthrough in Renewable Energy Technology",
      slug: generateSlug("Breaking News: Major Breakthrough in Renewable Energy Technology"),
      content: "<p>In a groundbreaking development, scientists have achieved a significant breakthrough in renewable energy technology. This milestone promises to revolutionize the way we harness and utilize clean energy sources, paving the way for a sustainable and eco-friendly future.</p><p>Stay tuned for a detailed press conference where experts will share insights into this game-changing innovation and its potential impact on the global energy landscape.</p>",
      department_id: Math.floor(Math.random() * 11) + 2,
      author_id: Math.floor(Math.random() * 12) + 1,
      featured: (Math.random() < 0.5),
      visitors: 0,
      event_id: Math.floor(Math.random() * 16),
      tag1: "Renewable Energy",
      tag2: "Innovation",
      tag3: "Clean Technology",
      tag4: "Press Conference",
      tag5: "Sustainability",
      search: null,
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
    await queryInterface.bulkDelete('post', null, {});
  }
};
