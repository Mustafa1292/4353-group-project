module.exports = mongoose => {
    const schema  = mongoose.Schema(
      {
        fullname: {
          type: String,
          index: true,
          unique: true
        },
        abbreviation: {
            type: String
        }
        
      },
      { timestamps: true }
    );

    const us_states = mongoose.model(
      "US_State",
      schema
    );
  
    return us_states;
  };