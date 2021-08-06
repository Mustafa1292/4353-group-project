module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const schema  = mongoose.Schema(
      {
        username: {type: String },
        delivery : { type: Date },
        gallons : { type: Number,},
        address : {
        fullName: { type: String,},
          address1: { type: String,},
          address2: { type: String,},
          city: { type: String,},
          us_state: { type: String,},
          zip: { type: Number,},
        },
        suggestedPrice: { type: Number },
        total : { type: Number,},
      },
      { timestamps: true }
    );

    const Quotes = mongoose.model(
      "quotes",
      schema
    );
  
    return Quotes;
  };

