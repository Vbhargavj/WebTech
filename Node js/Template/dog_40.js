const http = require("http");
const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject("i could not find the file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("I Can't find it");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog_data.txt`);
    console.log(data);

    const res = await superagent.get("https://dog.ceo/api/breeds/image/random");
    console.log(res.body.message);

    await writeFilePro("dog_url.txt", res.body.message);
    console.log("Dog image URL file saved");
  } catch (err) {
    console.log(err);
  }
  return "ready";
};

(async()=>{
    try{
        console.log("1: Will get dog pics!");
        const x=await getDogPic();
        console.log("2:"+x);
        console.log("3: Done getting dog pics !");
    }
    catch(err){
        console.log('BOOM !! @Error ');
    }
})();

// console.log("Starting the getting details");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("I have finished");
//   })
//   .catch((err) => {
//     console.log("ERROR ", err);
//   });