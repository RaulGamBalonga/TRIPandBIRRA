const { Schema, model } = require("mongoose");

const barSchema = new Schema(
    {
        name: {
            type: String,
            required: true,

        },

        location: {
            type: {
                type: String,
            },
            coordinates: [Number]
        },


        image: {
            type: String,
        },
    }
);

const Bar = model("Bar", barSchema);

module.exports = Bar;

