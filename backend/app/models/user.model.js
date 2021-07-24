const bcrypt = require("bcryptjs");
// https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
const SALT_VALUE = 10;

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: {
        type: String,
        index: true,
        unique: true,
      },
      password: String,
    },
    { timestamps: true }
  );

  // presave middleware
  schema.pre("save", function (next) {
    const user = this;
    console.log(
      "will hash the password:",
      this.isModified("password") || this.isNew
    );
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(SALT_VALUE, function (saltError, salt) {
        if (saltError) {
          return next(saltError);
        } else {
          // creates a hash out of the password
          bcrypt.hash(user.password, salt, function (hashError, hash) {
            if (hashError) {
              return next(hashError);
            }
            // set password to the created hash
            console.log("will set password to:", hash);
            user.password = hash;
            next();
          });
        }
      });
    } else {
      return next();
    }
  });

  // instance method that can be used by instances
  // https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
  schema.methods.comparePasswords = function (otherPassword) {
    return new Promise((res, rej) => {
      bcrypt.compare(otherPassword, this.password, function (error, isMatch) {
        if (error) {
          // if error, rej the promise
          rej(error);
        } else if (!isMatch) {
          // if passwords =/, resolve false
          console.log("Password doesn't match!");
          res(false);
        } else {
          // if the passwords do pass, resolve true
          console.log("Password matches!");
          res(true);
        }
      });
    });
  };

  const User = mongoose.model("user", schema);

  return User;
};
