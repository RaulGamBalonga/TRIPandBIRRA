const { Schema, model } = require("mongoose");

const barSchema = new Schema(
    {
        name: {
            type: String,
            required: true,

        },

        location: [{
            type: {
                type: String,
            },
            coordinates: [Number]
        }],


        image: {
            type: String,
        },

        //objectId: el bar puede tener varias reviews (one to many), revisar ejemplo libros y autores
    },

    {
        timestamps: true,
    }
);

const User = model("Bar", barSchema);

module.exports = Bar;
