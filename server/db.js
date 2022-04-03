const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('realworld', 'user', {
  host: 'localhost',
  dialect: 'postgress',
  port: 54320,
});

async function clear() {
  const t = await sequelize.transaction();

  try {
    await sequelize.query('DELETE FROM articles_favorites;')
    await sequelize.query('DELETE FROM article_comments;')
    await sequelize.query('DELETE FROM articles;')
    await sequelize.query('DELETE FROM sessions;')
    await sequelize.query('DELETE FROM users;')

    await t.commit();

    console.log('DB was cleared');
  } catch (error) {
    await t.rollback();

    console.log(`Can't clear DB`);
  }
}

module.exports = { clear };
