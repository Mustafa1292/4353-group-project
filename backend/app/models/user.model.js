module.exports = mongoose => {
    const schema  = mongoose.Schema(
      {
        username: {
          type: String,
          index: true,
          unique: true
        },
        password: String
      },
      { timestamps: true }
    );

    const User = mongoose.model(
      "user",
      schema
    );
  
    return User;
  };