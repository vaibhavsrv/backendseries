import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true, // helps in search
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    fullname: {
      type: String,
      required: true,
      index: true,
    },

    avatar: {
      type: String,
      required: true, // store profile photo url
    },

    coverImage: {
      type: String,
      required: true, // store cover photo url
    },

    password: {
      type: String,
      required: true, // store hashed password
    },

    refreshToken: {
      type: String,
      default: null, // token is not required initially
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video", // reference to video model
      },
    ],
  },
  {
    timestamps: true, 
  }
);

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next(); // only hash if password is modified or new
    this.password = bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPassword = async function (password){
    return  await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken =function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expriresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expriresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


// Export user model
export const User = mongoose.model("User", userSchema);