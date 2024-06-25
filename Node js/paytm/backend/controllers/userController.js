const User = require("../Models/userModel");
exports.transist = async (req, res, next) => {
  const { to, paisa } = req.body;
  const currentId = req.user._id;

  const result = await User.findAndUpdate({ to }, { balance: balance + paisa });
  if (result) {
    const result2 = await User.findAndUpdate(
      { currentId },
      { balance: balance - paisa }
    );
    if (!result2) {
      res.json({ status: "fail", msg: "some thing errors" });
      await User.findAndUpdate({ to }, { balance: balance - paisa });
      return;
    }
  } else {
    res.json({ status: "fail", msg: "some thing errors" });
    return;
  }
  res.json({
    status: "success",
    msg: "transfer successfully",
  });
};
