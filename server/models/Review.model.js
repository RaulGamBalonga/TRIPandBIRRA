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
            enum: ['Cerveza', 'Vino', 'Refresco', 'Otros'],
            //required: true,
        },

        tapa: {
            type: String,
            enum: ['Frutos Secos (pipas, panchitos, patatas...', 'Olivas', 'Fritos (nuggets, croquetas...)', 'Pinchos', 'Otros'],
            //required: true,

        },

        price: {
            type: String,
            enum: ['Caro', 'Correcto', 'Barato'],
            //required: true,

        },

        quality: {
            type: String,
            enum: ['Mala', 'Buena'],
            //required: true,

        },

        rating: {
            type: Number,
            min: 1,
            max: 3,
        },

        creator: {type: Schema.Types.ObjectId, ref: 'User'},

        bar: { type: Schema.Types.ObjectId, ref: 'Bar' },
    },

    


    {
        timestamps: true,
    }
);

const Review = model("Review", reviewSchema);

module.exports = Review;

//to do: objet id user bar

// rating: { //to do a review
//     type: Number,
//     // enum: ['*', '**', '***', '****', '*****',]

// },
