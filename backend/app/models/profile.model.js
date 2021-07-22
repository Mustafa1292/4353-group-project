module.exports = mongoose => {
    const schema  = mongoose.Schema(
      {
        username: {
          type: String,
          index: true,
          unique: true
        },
        fullName: { type: String,},
        address1: { type: String,},
        address2: { type: String,},
        city: { type: String,},
        us_state: { type: String,},
        zip: { type: Number,},
      },
      { timestamps: true }
    );

    const UserProfile = mongoose.model(
      "profile",
      schema
    );
  
    return UserProfile;
  };