import pgp from 'pg-promise';

const connection = pgp()('postgres://postgres:231123@localhost:5432/branas');

export function databaseConnection() {
  return {
    getConnection() {
      return connection;
    },

    async finishConnection() {
      await connection.$pool.end();
    },
  };
}
