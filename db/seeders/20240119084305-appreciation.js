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
   await queryInterface.bulkInsert('appreciation', [
    {
      title: 'GenBI Awarding January 2023',
      cover_id: 34,
      given_date: '2023-02-03',
      instagram_url: 'https://www.instagram.com/p/CoMfOQRBuRP',
      post_id: null,
      caption: `<p>Mari kita beri apresiasi kepada peraih Best Staff, Best Manager, dan Best Departement GenBI UPI 22.23 January edition 😍</p>
      <p>💫Best Departement💫<br />
      ▪︎ Departement Economic</p>
      <p>💫Best Manager💫<br />
      ▪︎ Denis Erlangga Maulana</p>
      <p>💫Best Staff💫<br />
      ▪︎ Raden Wahyuni Qoyyumiah as Best Staff of Economic Departement<br />
      ▪︎ Sekar Madu Kusumawardani as Best Staff of Healthcare Departement<br />
      ▪︎ Hanifah Fitriani as Best Staff of HRD Departement<br />
      ▪︎ Mochamad Marcellodiansyah as Best Staff of Marketing Departement<br />
      ▪︎ Benaya Raifa Azzahra as Best Staff of PR Department<br />
      ▪︎ Linda Roman H. as Best Staff of Social &amp; Environment Departement<br />
      ▪︎ Rizal Padhilah as Best Staff of Education Departement</p>
      <p>Terima kasih telah berdedikasi sepenuh hati untuk GenBI 22.23 ini. Semoga semangat dan kerja keras yang telah dikerahkan dapat terus bermanfaat dan menginspirasi pengurus lainnya.<br />
      GenBI, Energi untuk Negeri!</p>`,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Apresiasi Prestasi Sobat GenBI Januari 2023',
      cover_id: 33,
      given_date: '2023-02-10',
      instagram_url: 'https://www.instagram.com/p/Coe2VVshxwR',
      post_id: null,
      caption: `<p>Halo, Sobat GenBI!</p>
      <p>GenBI UPI mengucapkan selamat dan sukses kepada Sobat GenBI atas prestasi yang telah diraih<br />
      Semoga dapat menjadi motivasi dan inspirasi untuk seluruh Sobat GenBI UPI agar senantiasa berkarya, berprestasi, serta mengharumkan nama GenBI UPI dan Universitas Pendidikan Indonesia.</p>`,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'GenBI Awarding February 2023',
      cover_id: 35,
      given_date: '2023-03-02',
      instagram_url: 'https://www.instagram.com/p/CpRkwJKhKhH',
      post_id: null,
      caption: `<p>Halo, sobat GenBI!<br />
      Mari kita beri apresiasi kepada peraih Best Staff, Best Manager, dan Best Departement GenBI UPI 22.23 February edition 😍</p>
      <p>💫Best Departement💫<br />
      ▪︎ Departement Public Relation<br />
      💫Best Manager💫<br />
      ▪︎ Salsabilla Wardah<br />
      💫Best Staff💫<br />
      ▪︎ Alfianda Kurniawan as Best Staff of Economic Departement<br />
      ▪︎ Santika Millenia as Best Staff of Education Departement<br />
      ▪︎ Azdina Nuraini as Best Staff of HRD Departement<br />
      ▪︎ Neysa Ardhina as Best Staff of Marketing Departement<br />
      ▪︎ Erina Nur Susilowati as Best Staff of Healthcare Department<br />
      ▪︎ Selya Arifa Nurfitri as Best Staff of PR Departemen<br />
      ▪︎ Novianti Utami as Best Staff of Social &amp; Environment Departement</p>
      <p>Terima kasih telah berdedikasi sepenuh hati untuk GenBI 22.23 ini. Semoga semangat dan kerja keras yang telah dikerahkan dapat terus bermanfaat dan menginspirasi pengurus lainnya.<br />
      GenBI, Energi untuk Negeri!</p>`,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Apresiasi Prestasi Sobat GenBI Februari 2023',
      cover_id: 33,
      given_date: '2023-03-10',
      instagram_url: 'https://www.instagram.com/p/CpmFlm9BOi2',
      post_id: null,
      caption: `<p>Halo, Sobat GenBI!</p>
      <p>GenBI UPI mengucapkan selamat dan sukses kepada Sobat GenBI atas prestasi yang telah diraih<br />
      Semoga dapat menjadi motivasi dan inspirasi untuk seluruh Sobat GenBI UPI agar senantiasa berkarya, berprestasi, serta mengharumkan nama GenBI UPI dan Universitas Pendidikan Indonesia.</p>`,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'GenBI Awarding Maret 2023',
      cover_id: 36,
      given_date: '2023-04-02',
      instagram_url: 'https://www.instagram.com/p/Cqm1yU1hIVP',
      post_id: null,
      caption: `<p>Halo, sobat GenBI!<br />
      Mari kita beri apresiasi kepada peraih Best Staff, Best Manager, dan Best Departement GenBI UPI 22.23 February edition 😍</p>
      <p>💫Best Departement💫<br />
      ▪︎Departement Social &amp; Environment<br />
      💫Best Manager💫<br />
      ▪︎ Devika Putri Az-zahra<br />
      💫Best Staff💫<br />
      ▪︎ Raden Wahyuni Qoyyumiah as Best Staff of Economic Departement<br />
      ▪︎ Fadjrin Diraja M as Best Staff of Education Departement<br />
      ▪︎ Rahmi Fauziah as Best Staff of HRD Departement<br />
      ▪︎ M. Fajar Yusuf Firdaus as Best Staff of Marketing Departement<br />
      ▪︎ Savana Maulahela as Best Staff of Healthcare Department<br />
      ▪︎ M. Aqsa Novaldi as Best Staff of PR Departemen<br />
      ▪︎ Aida R. Putri as Best Staff of Social &amp; Environment Departement</p>
      <p>Terima kasih telah berdedikasi sepenuh hati untuk GenBI 22.23 ini. Semoga semangat dan kerja keras yang telah dikerahkan dapat terus bermanfaat dan menginspirasi pengurus lainnya.<br />
      GenBI, Energi untuk Negeri!</p>`,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Apresiasi Prestasi Sobat GenBI Maret 2023',
      cover_id: 33,
      given_date: '2023-04-10',
      instagram_url: 'https://www.instagram.com/p/Cq2IM1dBSYM',
      post_id: null,
      caption: `<p>Halo, Sobat GenBI!</p>
      <p>GenBI UPI mengucapkan selamat dan sukses kepada Sobat GenBI atas prestasi yang telah diraih<br />
      Semoga dapat menjadi motivasi dan inspirasi untuk seluruh Sobat GenBI UPI agar senantiasa berkarya, berprestasi, serta mengharumkan nama GenBI UPI dan Universitas Pendidikan Indonesia.</p>`,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'GenBI Awarding April 2023',
      cover_id: 37,
      given_date: '2023-05-02',
      instagram_url: 'https://www.instagram.com/p/CsJE4aOBpyF',
      post_id: null,
      caption: `<p>Halo, sobat GenBI!<br />
      Mari kita beri apresiasi kepada peraih Best Staff, Best Manager, dan Best Departement GenBI UPI 22.23 February edition 😍</p>
      <p>💫Best Departement💫<br />
      ▪︎ Departement Marketing<br />
      💫Best Manager💫<br />
      ▪︎ Chika Almalia Agisti<br />
      💫Best Staff💫<br />
      ▪︎ Rima Yuliawati as Best Staff of Economic Departement<br />
      ▪︎ Shofiatun Nisa as Best Staff of Education Departement<br />
      ▪︎ Dini Kulsum as Best Staff of HRD Departement<br />
      ▪︎ M. Fajar Yusuf Firdaus as Best Staff of Marketing Departement<br />
      ▪︎ Novariza Nur Fadillah as Best Staff of Healthcare Department<br />
      ▪︎ M. Fikri Yunus as Best Staff of PR Departemen<br />
      ▪︎ Tiara Setra Linuhung Best Staff of Social &amp; Environment Departement</p>
      <p>Terima kasih telah berdedikasi sepenuh hati untuk GenBI 22.23 ini. Semoga semangat dan kerja keras yang telah dikerahkan dapat terus bermanfaat dan menginspirasi pengurus lainnya.<br />
      GenBI, Energi untuk Negeri!</p>`,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'GenBI Awarding Mei 2023',
      cover_id: 38,
      given_date: '2023-06-02',
      instagram_url: 'https://www.instagram.com/p/CtgwNlBBuwd',
      post_id: null,
      caption: `<p>Halo, sobat GenBI!<br />
      Mari kita beri apresiasi kepada peraih Best Staff, Best Manager, dan Best Departement GenBI UPI 22.23 February edition 😍</p>
      <p>💫Best Departement💫<br />
      ▪︎ Departement Ekonomi<br />
      💫Best Manager💫<br />
      ▪︎ Devika Putri A<br />
      💫Best Staff💫<br />
      ▪︎ Intan Permata Sari as Best Staff of Economic Departement<br />
      ▪︎ Aura Putri Fadillah as Best Staff of Education Departement<br />
      ▪︎ Ghania Wardani L as Best Staff of HRD Departement<br />
      ▪︎ Rizki Dwi P as Best Staff of Marketing Departement<br />
      ▪︎ Sekar Madu K as Best Staff of Healthcare Department<br />
      ▪︎ Lola Rahayu as Best Staff of PR Departemen<br />
      ▪︎ Novianti Utami P Best Staff of Social &amp; Environment Departement</p>
      <p>Terima kasih telah berdedikasi sepenuh hati untuk GenBI 22.23 ini. Semoga semangat dan kerja keras yang telah dikerahkan dapat terus bermanfaat dan menginspirasi pengurus lainnya.<br />
      GenBI, Energi untuk Negeri!</p>`,
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
    await queryInterface.bulkDelete('appreciation', null, {});
  }
};
