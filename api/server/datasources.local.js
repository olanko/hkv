module.exports = {
  db: {
    name: 'db',
    connector: 'memory'
  },

  pg: {
    connector: 'postgresql',
    url: process.env.DATABASE_URL || 'localhost'
  }
};
