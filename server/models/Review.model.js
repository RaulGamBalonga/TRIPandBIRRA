const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        comment: {
            type: String,
            // minlength: 5,
            // maxlength: 75,

        },

        image: {
            type: String,
        },

        drink: {
            type: String,
            enum: ['CERVEZA', 'VINO', 'REFRESCO', 'OTRO'],
            //required: true,
        },

        tapa: {
            type: String,
            enum: ['FRUTOS SECOS (PIPAS, KIKOS, PATATAS...', 'OLIVAS', 'FRITOS (NUGUETS, CROQUETAS...)', 'PINCHOS', 'OTROS'],
            //required: true,

        },

        price: {
            type: String,
            enum: ['CARO', 'CORRECTO', 'BARATO'],
            //required: true,

        },

        quality: {
            type: String,
            enum: ['MALA', 'BUENA'],
            //required: true,

        },

        creator: { type: Schema.Types.ObjectId, ref: 'User' },

        bar: { type: Schema.Types.ObjectId, ref: 'Bar' },
    },

    {
        timestamps: true,
    }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
