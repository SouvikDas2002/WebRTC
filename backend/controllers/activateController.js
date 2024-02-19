const jimp = require('jimp');
const path = require("path");
const userService = require("../services/userService");
const UseDto = require("../dtos/userdtos");

class ActivateController {
  async activate(req, res) {
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const imageData = avatar.replace(/^data:image\/\w+;base64,/, '');
      if (!imageData) {
        return res.status(400).json({ message: "No image data provided" });
      }
      // Decode base64 encoded image data into a buffer
      const buffer = Buffer.from(imageData, 'base64');

      // Create a custom image name
      const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

      // Process and resize the image using Jimp
      const jimpRes = await jimp.read(buffer);
      await jimpRes.resize(150, jimp.AUTO).writeAsync(path.resolve(__dirname, `../storage/${imagePath}`));

      // Update user activate status
      const user = await userService.findUser({ _id: req.user._id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      await user.save();

      return res.json({ user: new UseDto(user), auth: true });
    } catch (err) {
      console.error("Error processing image:", err);
      return res.status(400).json({ message: "Could not process the image" });
    }
  }
}

module.exports = new ActivateController();
