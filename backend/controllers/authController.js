const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {check, validationResult } = require("express-validator");


exports.getMe = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({         
        isLoggedIn: false,
        errors: ["User not logged in"],
        status: "Rejected",
        oldInput: { },
        user: {}, 
      });
  }

  res.status(200).json({         
        isLoggedIn: req.session.isLoggedIn,
        errors: [],
        status: "Success",
        oldInput: { },    
        user: req.session.user, 
      });
};

exports.signup = [
   check("fullName")
  .trim()
  .isLength({min: 2})
  .withMessage("First Name should be atleast 2 characters long")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("First Name should contain only alphabets"),

  check("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail(),

  check("password")
  .isLength({min: 8})
  .withMessage("Password should be atleast 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password should contain atleast one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password should contain atleast one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password should contain atleast one number")
  .matches(/[!@&]/)
  .withMessage("Password should contain atleast one special character")
  .trim(),

  check("confirmPass")
  .trim()
  .custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error("Pin do not match");
    }
    return true;
  }),

  check("userType")
  .notEmpty()
  .withMessage("Please select a user type")
  .isIn(['adult', 'kid'])
  .withMessage("Invalid user type"),

 async (req, res) => {
    const { fullName, email, password, userType } = req.body;
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("inside errors:", req.body)
      return res.status(422).json({
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        status: "Rejected",
        oldInput: { fullName, email, password, userType },
      });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("inside existing user:", req.body)
        return res.status(422).json({
          isLoggedIn: false,
          errors: ["User already exist"],
          status: "Rejected",
          oldInput: { fullName, email, password, userType },
        });
      }

      const hashedPass = await bcrypt.hash(password, 12);

      const user = new User({
        fullName,
        email,
        password: hashedPass,
        userType,
      });

      await user.save();

      return res.status(201).json({
        isLoggedIn: false,
        errors: [],
        status: "Success",
        oldInput: { },
      });
    } catch (err) {
      return res.status(500).json({
        isLoggedIn: false,
        errors: [err.message],
        status: "Rejected",
        oldInput: { email: "" },
      });
    }
  },
]

exports.login = async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({         
        isLoggedIn: false,
        errors: ["User does not exist"],
        status: "Rejected",
        oldInput: { email },
        user: {}, 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({         
        isLoggedIn: false,
        errors: ["Invalid password"],
        status: "Rejected",
        oldInput: { email },
        user: {}, 
      });
    }

    req.session.isLoggedIn = true;
    req.session.user = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      userType: user.userType,
    };

    console.log("Session before save:", req.session);

    await req.session.save();
    res.status(200).json({         
        isLoggedIn: req.session.isLoggedIn,
        errors: [],
        status: "Success",
        oldInput: { },    
        user: req.session.user, 
      });
  } catch (err) {
    res.status(500).json({         
        isLoggedIn: false,
        errors: [err.message],
        status: "Rejected",
        oldInput: { email },
        user: {}, 
      });
  }
};

exports.logout = (req, res) => {  
  req.session.destroy(() => {
    res.status(200).json({         
        isLoggedIn: false,
        errors: [],
        status: "Logout success",
        oldInput: { },
        user: {}, 
      });
  });
};


