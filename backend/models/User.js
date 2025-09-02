const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    username: { type: String, unique: true },

    preferences: {
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      country: { type: String, default: "Unknown" },  
      currencyCode: { type: String, default: "USD" }, 
      currencySymbol: { type: String, default: "$" }, 
      language: { type: String, default: 'en' },
      notifications: { type: Boolean, default: true },
    },
    loginHistory: [
      {
        timestamp: { type: Date, default: Date.now },
        ip: {type: String},
        userAgent: {type: String}
      }
    ]
  },
  {
    timestamps: true,
  }
);

//Hash Password before Saving
UserSchema.pre("save", async function (next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Compare passwords with Hash
UserSchema.methods.comparePassword = async function (candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", UserSchema);
