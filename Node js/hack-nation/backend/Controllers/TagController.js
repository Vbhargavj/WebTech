const Tag=require('../Model/TagModel');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync')
exports.getAllTag =CatchAsync(async (req, res, next) => {
    const tags=await Tag.find();
    if(!tags){
        return next(new AppError('no tags available',404))
    }
    res.status(200).json(tags)
});

exports.addTag =CatchAsync( async (req, res, next) => {
    
    const newTag = await Tag.create({
      name:req.body.name,
      color:req.body.color
    });
    if (!newTag) {
      res.json({ status: "fail", msg: "fail" });
      return;
    }
    res.json({ status: "success", msg: "created" });
  });