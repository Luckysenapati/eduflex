// const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;





import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};





// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const user = await User.findById(userId)
//       .select("-password")
//       .populate("enrolledCourses");

//     if (!user) {
//       return res.status(404).json({
//         message: "Profile not found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to load user",
//     });
//   }
// };





export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "enrolledCourses",
        populate: {
          path: "creator",
          model: "User",
          select: "name photoUrl", // only send name and photo
        },
      });

    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};







export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, email, role } = req.body;
    const profilePhoto = req.file;

    const updatedData = {};

    // ✅ Validate name: Only letters and spaces allowed
    if (name) {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(name)) {
        return res.status(400).json({
          success: false,
          message: "Name must contain only letters and spaces (no numbers or special characters).",
        });
      }
      updatedData.name = name;
    }

    // ✅ Validate email: Must be a valid Gmail address
    if (email) {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!gmailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Only valid Gmail addresses are allowed (e.g., name@gmail.com).",
        });
      }

      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== userId) {
        return res.status(400).json({
          success: false,
          message: "This Gmail is already taken by another user.",
        });
      }

      updatedData.email = email;
    }

    // ✅ Validate role (optional, if user is allowed to change it)
    if (role) {
      const validRoles = ["student", "instructor"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role provided. Allowed roles: student, instructor.",
        });
      }
      updatedData.role = role;
    }

    // ✅ Handle profile photo upload
    if (profilePhoto) {
      const user = await User.findById(userId);

      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      const cloudResponse = await uploadMedia(profilePhoto.path);
      updatedData.photoUrl = cloudResponse.secure_url;
    }

    // ✅ Update user
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

