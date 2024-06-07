const sql = require('mssql');

const config = {
  user: 'sa',
  password: '123',
  server: 'localhost',
  database: 'GymNTP',
  options: {
    encrypt: false, // Nếu không sử dụng Azure SQL Database, có thể đặt là false
    enableArithAbort: true
  },
  // pool: {
  //   max: 10,
  //   min: 0,
  //   idleTimeoutMillis: 30000
  // },
  // // Tăng thời gian chờ kết nối
  // connectionTimeout: 30000, // Thời gian chờ kết nối (ms)
  // requestTimeout: 30000 // Thời gian chờ yêu cầu (ms)
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.log('Database Connection Failed! Bad Config: ', err);
  });

module.exports = {
  sql, poolPromise
};
