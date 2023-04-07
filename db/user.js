const db = require("./db");

exports.insertUser =(user) =>{
  db.run(
    `INSERT INTO users (name, surname, mobile, password, capacity) VALUES (?, ?, ?, ?, ?)`,
    [user.name, user.surname, user.mobile, user.password, user.capacity],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}

exports.findUsers =()=> {
  db.each(`SELECT * FROM users`, (error, row) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log(row);
  });
}

exports.updateUser =(id,name) => {
  db.run(
    `UPDATE users SET name = ? WHERE id = ?`,
    [name, id],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`User ${id} has been updated`);
    }
  );
}

exports.deleteUser = async(id) => {
  db.run(`DELETE FROM users WHERE id = ?`, [id], function (error) {
    if (error) {
      return console.error(error.message);
    }
    console.log(`User with the ID ${id} has been deleted`);
  });
}

