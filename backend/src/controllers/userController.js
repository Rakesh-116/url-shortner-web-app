import { User } from "../models/user/user.model.js";

const getUserProfileController = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User profile fetched successfully:", user);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getAllUserURLsController = async (req, res) => {};

export { getUserProfileController, getAllUserURLsController };
