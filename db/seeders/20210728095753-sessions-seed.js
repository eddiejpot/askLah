module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Make playerList
    const userIds = [1];
    const sessionsList = [];

    for (let i = 0; i < userIds.length; i += 1) {
      sessionsList.push(
        {
          user_id: userIds[i],
          title: 'How to snooze with Doctor Brown',
          speaker: 'Dr Brown',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis tellus ut est venenatis sodales. Morbi gravida interdum blandit. Pellentesque.',
          date: new Date(),
          session_id: 'USHIW123',
          created_at: new Date(),
          updated_at: new Date(),
        },
      );
    }

    // add userList into users table
    await queryInterface.bulkInsert('sessions', sessionsList);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sessions', null, {});
  },
};
