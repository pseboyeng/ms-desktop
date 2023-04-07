const db = require('./db');

exports.newChristianLife = (schedule) => {
    db.run(
    `INSERT INTO christians (name, surname, mobile, password, capacity) VALUES (?, ?, ?, ?, ?)`,
    [schedule.date, schedule.chairman, schedule.time, schedule.opening_song, schedule.treassures],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted schedule with the ID: ${this.lastID}`);
    }
  );
}

exports.findChristianLifes = () => {
   db.each(`SELECT * FROM christians`, (error, row) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log(row);
  }); 
}

exports.updateChristianLife = (id,data) => {
    db.run(
    `UPDATE christians SET ${data} = ? WHERE id = ?`,
    [id,data],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`User ${id} has been updated`);
    }
  );
}

exports.deleteChristianLife = (id) => {
    db.run(`DELETE FROM christians WHERE id = ?`, [id], function (error) {
    if (error) {
      return console.error(error.message);
    }
    console.log(`Schedule with the ID ${id} has been deleted`);
  });
}

