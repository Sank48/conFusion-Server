const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Dishes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dishes'
        }
    ]
},{
    timestamps: true
})

var Favorites = mongoose.model('Favorites', favouriteSchema);

module.exports = Favorites ;
