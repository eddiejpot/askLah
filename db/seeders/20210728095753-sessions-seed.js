module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Make playerList
    const userIds = [1];
    const sessionsList = [];

    for (let i = 0; i < userIds.length; i += 1) {
      sessionsList.push(
        {
          user_id: userIds[i],
          title: 'How to never snooze your alarm ever',
          speaker: 'Dr Brown',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at leo sagittis, eleifend urna quis, lobortis turpis. Nunc mauris sapien, condimentum vitae aliquam et, lacinia eu lectus. <br> Etiam malesuada justo non elementum tempus. Fusce vel dui scelerisque dui convallis auctor.',
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
