import Chat from "../models/chatSchema.js";
import { errorMessage } from "../helper/statusMessage.js";
import userSchema from "../models/userSchema.js";
import { statusCode } from "../config/constant.js";

export const saveChat = async (senderId, receiverId, content) => {
  try {
    await Chat.create({
      senderId,
      receiverId,
      content,
      date: Date.now() + 330 * 60000,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const receiverUser = await userSchema.findOne({username : req.query.receiverUsername});
    if (!receiverUser)
      return errorMessage(res, statusCode.NOT_FOUND, "No such user found");
    const receiverId = receiverUser._id;
    const allChat = await Chat.find(
      {
        $or: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      },
      { senderId: 0 }
    ).populate({
      path: "receiverId",
      select: { username: 1, _id: 0 },
    });

    res.json({
      status: statusCode.CREATED,
      data: allChat,
      message: `Successfully fetch all notes`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};
