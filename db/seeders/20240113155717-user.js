'use strict';
const bcrypt = require('bcrypt');
const uuids = require('../../uuid');

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
      uuid: uuids[0],
      email: null,
      username: '@ilhamfachryr',
      password: await bcrypt.hash('11/21/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[1],
      email: null,
      username: '@zulfahaura',
      password: await bcrypt.hash('4/7/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[2],
      email: null,
      username: '@wildariva',
      password: await bcrypt.hash('1/25/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[3],
      email: null,
      username: "@ekatiaranurf",
      password: await bcrypt.hash("11/28/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[4],
      email: null,
      username: "@shafasb__",
      password: await bcrypt.hash("8/19/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[5],
      email: null,
      username: "@azar_nuzy",
      password: await bcrypt.hash("11/6/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[6],
      email: null,
      username: "@sekarmk03",
      password: await bcrypt.hash("7/3/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[7],
      email: null,
      username: "@azakialbany",
      password: await bcrypt.hash("8/3/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[8],
      email: null,
      username: "@neysaardhina",
      password: await bcrypt.hash("2/21/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[9],
      email: null,
      username: "@denismaulanaa_",
      password: await bcrypt.hash("10/1/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[10],
      email: null,
      username: "@nadiraarevia",
      password: await bcrypt.hash("10/27/2002", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[11],
      email: null,
      username: "@dipoalm",
      password: await bcrypt.hash("9/27/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[12],
      email: null,
      username: "@davu.elazar",
      password: await bcrypt.hash("5/10/2003", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[13],
      email: null,
      username: "@dwin0_0viaa",
      password: await bcrypt.hash("12/14/2000", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[14],
      email: null,
      username: "@tsalsabillanf",
      password: await bcrypt.hash("12/12/2001", 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 16
      uuid: uuids[15],
      email: null,
      username: '@qoyyum19',
      password: await bcrypt.hash('1/19/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[16],
      email: null,
      username: '@afinaafz',
      password: await bcrypt.hash('9/29/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[17],
      email: null,
      username: '@najwa.rhmdn4',
      password: await bcrypt.hash('11/4/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[18],
      email: null,
      username: '@ftiina_',
      password: await bcrypt.hash('12/25/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[19],
      email: null,
      username: '@arfdaffi',
      password: await bcrypt.hash('6/23/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[20],
      email: null,
      username: '@rid.aanr',
      password: await bcrypt.hash('11/15/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[21],
      email: null,
      username: '@harryerha_',
      password: await bcrypt.hash('11/29/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[22],
      email: null,
      username: '@karinasalsasabilaa',
      password: await bcrypt.hash('3/2/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[23],
      email: null,
      username: '10/10/2002',
      password: await bcrypt.hash('10/10/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[24],
      email: null,
      username: '@sofawwmwadtan',
      password: await bcrypt.hash('7/1/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[25],
      email: null,
      username: '@lulubnrkhlz',
      password: await bcrypt.hash('7/16/2004', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[26],
      email: null,
      username: '@rifqiiputraa',
      password: await bcrypt.hash('8/25/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[27],
      email: null,
      username: '@rehanseekap',
      password: await bcrypt.hash('11/28/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[28],
      email: null,
      username: '@sajidaitikafah_03',
      password: await bcrypt.hash('8/19/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[29],
      email: null,
      username: '@nasyaretna',
      password: await bcrypt.hash('5/26/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[30],
      email: null,
      username: '@geeessssssssss',
      password: await bcrypt.hash('2/12/2004', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[31],
      email: null,
      username: '@grizzlymayy',
      password: await bcrypt.hash('5/5/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[32],
      email: null,
      username: '@selyaarifa',
      password: await bcrypt.hash('11/26/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[33],
      email: null,
      username: '@ssyifaas',
      password: await bcrypt.hash('7/11/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[34],
      email: null,
      username: '@lianna_na66',
      password: await bcrypt.hash('6/6/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[35],
      email: null,
      username: '@nadzira_23',
      password: await bcrypt.hash('7/23/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[36],
      email: null,
      username: '@pitlefit',
      password: await bcrypt.hash('12/14/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[37],
      email: null,
      username: '@aqlnalf',
      password: await bcrypt.hash('9/3/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[38],
      email: null,
      username: '@uni_fathima',
      password: await bcrypt.hash('9/26/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[39],
      email: null,
      username: '@ysmnazzhr',
      password: await bcrypt.hash('1/2/2004', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[40],
      email: null,
      username: '@abdullahhabsyi_',
      password: await bcrypt.hash('4/16/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[41],
      email: null,
      username: '@dzubyaan_',
      password: await bcrypt.hash('6/17/2004', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[42],
      email: null,
      username: '@laudynoval',
      password: await bcrypt.hash('1/19/2004', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[43],
      email: null,
      username: '2/11/2003',
      password: await bcrypt.hash('2/11/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[44],
      email: null,
      username: '@ratnaaawlndr',
      password: await bcrypt.hash('6/25/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[45],
      email: null,
      username: '@aqsanovaldii',
      password: await bcrypt.hash('11/25/2000', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[46],
      email: null,
      username: '@musabikfikri',
      password: await bcrypt.hash('11/24/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[47],
      email: null,
      username: '@khail.aa',
      password: await bcrypt.hash('11/26/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[48],
      email: null,
      username: '@hararhy_',
      password: await bcrypt.hash('8/12/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[49],
      email: null,
      username: '@akmaludang',
      password: await bcrypt.hash('10/13/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[50],
      email: null,
      username: '@faniahafidza',
      password: await bcrypt.hash('7/17/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[51],
      email: null,
      username: '@ayundafy',
      password: await bcrypt.hash('7/22/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[52],
      email: null,
      username: '@raparsalan',
      password: await bcrypt.hash('9/24/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[53],
      email: null,
      username: '@a.hlmh',
      password: await bcrypt.hash('2/11/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[54],
      email: null,
      username: '@rndia_',
      password: await bcrypt.hash('2/4/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[55],
      email: null,
      username: '@arauraap',
      password: await bcrypt.hash('8/12/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[56],
      email: null,
      username: '@dewiangrni_',
      password: await bcrypt.hash('8/25/2005', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[57],
      email: null,
      username: '@anis_5.b',
      password: await bcrypt.hash('10/3/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[58],
      email: null,
      username: '@syifakhairunnisa24',
      password: await bcrypt.hash('4/24/2004', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[59],
      email: null,
      username: '@ibrahimdanial_',
      password: await bcrypt.hash('8/25/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[60],
      email: null,
      username: '@gitania910',
      password: await bcrypt.hash('10/9/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[61],
      email: null,
      username: '@elsa_nrd09',
      password: await bcrypt.hash('11/16/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[62],
      email: null,
      username: '@santika.sun23',
      password: await bcrypt.hash('1/6/2000', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[63],
      email: null,
      username: '@ridwnmaul_',
      password: await bcrypt.hash('8/29/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[64],
      email: null,
      username: '@tiyosaputraa',
      password: await bcrypt.hash('1/27/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[65],
      email: null,
      username: '@fadjrindirajaa',
      password: await bcrypt.hash('9/14/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[66],
      email: null,
      username: '@dzulfikrinf',
      password: await bcrypt.hash('9/25/2004', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[67],
      email: null,
      username: '@hasnaranias',
      password: await bcrypt.hash('12/25/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[68],
      email: null,
      username: '@aidaaptr',
      password: await bcrypt.hash('7/12/2002', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[69],
      email: null,
      username: '@dinikulsum06',
      password: await bcrypt.hash('3/6/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[70],
      email: null,
      username: '@bayupramesta_',
      password: await bcrypt.hash('2/3/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[71],
      email: null,
      username: '@chikaagisti',
      password: await bcrypt.hash('8/15/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[72],
      email: null,
      username: '@debiliaa',
      password: await bcrypt.hash('3/31/2003', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[73],
      email: null,
      username: '@nonisardp',
      password: await bcrypt.hash('1/1/2001', 10),
      token: null,
      expire_at: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuids[74],
      email: null,
      username: '@lindaromanhabeahan',
      password: await bcrypt.hash('12/8/2002', 10),
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
