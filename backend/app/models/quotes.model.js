module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const schema  = mongoose.Schema(
      {
        delivery : "",
        address : { type: Schema.Types.ObjectId,},
        gallons : { type: String,},
        total : { type: String,},

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

