const Label = require("../models/label");

exports.getLabels = async (req, res) => {
  try {
    const labels = await Label.find();
    res.status(200).json(labels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching labels" });
  }
};

exports.addOrUpdateLabel = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: "Error updating label" });
  }
};
