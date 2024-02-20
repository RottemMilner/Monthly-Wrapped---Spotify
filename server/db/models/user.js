const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spotifyUserSchema = new mongoose.Schema({
  display_name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
});

const User = mongoose.model("User", spotifyUserSchema);

module.exports = User;

// const userSchema = new mongoose.Schema({
//   display_name: {
//     type: String,te
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//     requires: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Password cannot contain 'password'");
//       }
//     },
//   },
// });

// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("unable to login");
//   }

//   const isMatch = bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("unable to login");
//   }

//   return user;
// };

// userSchema.pre("save", async function (next) {
//   const user = this;

//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

// full schema
// const spotifyUserSchema = new mongoose.Schema({
//   display_name: { type: String, required: true },
//   external_urls: {
//     spotify: { type: String, required: true },
//   },
//   id: { type: String, required: true, unique: true },
//   href: { type: String, required: true },
//   images: [
//     {
//       url: { type: String, required: true },
//       height: Number,
//       width: Number,
//     },
//   ],
//   type: { type: String, required: true },
//   uri: { type: String, required: true },
//   followers: {
//     href: String,
//     total: { type: Number, required: true },
//   },
//   country: { type: String, required: true },
//   product: { type: String, required: true },
//   explicit_content: {
//     filter_enabled: { type: Boolean, required: true },
//     filter_locked: { type: Boolean, required: true },
//   },
//   email: { type: String, required: true },
// });
