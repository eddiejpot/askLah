export default function initSessionModel(sequelize, DataTypes) {
  return sequelize.define(
    'session',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        // This links the userId column to the id column in the users table
        references: {
          model: 'users',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
      },
      speaker: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      sessionId: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
