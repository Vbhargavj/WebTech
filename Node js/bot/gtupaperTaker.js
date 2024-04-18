const axios = require("axios");
const fs = require("fs");
const subjectCode = 3161612;
const years = [
  "W2023",
  "W2022",
  "W2021",
  "W2020",
  "S2023",
  "S2022",
  "S2021",
  "S2020",
];
const directoryName = `./${subjectCode}`;
if (!fs.existsSync(directoryName)) {
  fs.mkdirSync(directoryName);
}

years.forEach(async (year) => {
  const url = `http://www.gtu.ac.in/uploads/${year}/BE/${subjectCode}.pdf`;

  await axios({
    method: "get",
    url,
    responseType: "stream",
  })
    .then(function (response) {
      response.data.pipe(
        fs.createWriteStream(
          `${directoryName}/${
            year.charAt(0) + year.charAt(3) + year.charAt(4)
          }_${subjectCode}.pdf`
        )
      );
    })
    .catch(function (err) {
      console.log(err);
    });
});
