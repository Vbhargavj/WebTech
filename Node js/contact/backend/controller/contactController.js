const Contact = require("../model/contactModel");

exports.getContactList = async (req, res) => {
  const contacts = await Contact.find({});
  if (!contacts) {
    res.json({
      status: "failed",
      message: "some thing went wrong",
    });
  }
  res.json({
    status: "ok",
    result: contacts.length,
    contacts,
  });
};

exports.createContact = async (req, res) => {
  const name = req.body.name;
  const moNumber = req.body.number;
  console.log(name, moNumber);
  const response = await Contact.create({
    name,
    number: moNumber,
  });
  if (!response) {
    res.send("fuck you");
    return;
  }
  res.json({
    status: "ok",
    message: "contact was add successfully",
  });
};
exports.deleteContact = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const response = await Contact.findByIdAndDelete({ _id: id });
  // console.log(response);
  if (!response) {
    res.send("fuck you");
    return;
  }

  res.json({
    status: "ok",
    message: "contact was delete successfully",
  });
};
exports.updateContact = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const number = req.body.number;
  const response = await Contact.findByIdAndUpdate(
    id,
    { name, number },
    { new: true }
  );

  if (!response) {
    res.send("fuck you");
    return;
  }
  res.json({
    status: "ok",
    message: "contact was update successfully",
  });
};
