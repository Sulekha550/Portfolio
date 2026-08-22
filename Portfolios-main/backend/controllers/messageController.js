import Message from "../models/Message.js";

export async function createMessage(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    const savedMessage = await Message.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: savedMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
