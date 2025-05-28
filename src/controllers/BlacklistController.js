import Blacklist from "../models/Blacklist.js";

export default {
  async addWordToBlacklist(req, res) {
    const { word } = req.params;
    const result = await Blacklist.create({
      word,
    });

    res.status(201).json(result);
  },

  async deleteWordFromBlacklist(req, res) {
    const { word } = req.params;

    const deletedCount = await Blacklist.destroy({
      where: { word }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.status(200).json({ message: "Word deleted successfully" });
  },
};
