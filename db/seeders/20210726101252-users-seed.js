module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Make playerList
    const userNames = ['James Porter'];
    const userList = [];

    for (let i = 0; i < userNames.length; i += 1) {
      userList.push(
        {
          display_name: userNames[i],
          email: 'jamesporteredward@gmail.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      );
    }

    // add userList into users table
    await queryInterface.bulkInsert('users', userList);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
