'use strict';

const {shops} = require('../../constants/seeders')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('shops', shops, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('shops', null, {});
     
  }
};
