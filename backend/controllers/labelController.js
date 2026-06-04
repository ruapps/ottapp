const Label = require("../models/label");
const asyncHandler = require("../utils/asyncHandler");

exports.getLabels = asyncHandler(async (req, res) => {

    const labels = await Label.find();
    res.status(200).json(labels);

})

exports.addOrUpdateLabel = asyncHandler(
  async (req, res) => {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Label text required" });
    }

    let label = await Label.findOne({ text });

    if (label) {
      label.count += 1;
      await label.save();
    } else {
      label = await Label.create({ text });
    }

    res.status(200).json(label);

})
