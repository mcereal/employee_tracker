const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees_db",
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "list",
      message: "Select a search option",
      choices: [
        "Search all songs by artist",
        "Return artists with multiple top 5000 hits",
        "Search for data in range",
        "Search for info a songs info",
        "EXIT",
      ],
    })
    .then((answer) => {
      if (answer.postOrBid === "Search all songs by artist") {
        getSongsByArtist();
      } else if (
        answer.postOrBid === "Return artists with multiple top 5000 hits"
      ) {
        getMultipleHits();
      } else if (answer.postOrBid === "Search for data in range") {
        getDataInRange();
      } else if (answer.postOrBid === "Search for info a songs info") {
        getSongInfo();
      } else {
        connection.end();
      }
    });
};

const getSongsByArtist = () => {
  inquirer
    .prompt([
      {
        name: "artistName",
        type: "input",
        message: "What is the artist you would like to search for?",
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        `SELECT * FROM top5000 WHERE artistName = ${answer}`,
        (err) => {
          if (err) throw err;
          console.log("pelase work!");
          start();
        }
      );
    });
};
