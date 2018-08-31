const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var NewsSchema = new Schema({
    headline: {
        main: {
            type:String,
            required: true
        },
        kicker: {type:String},
        content_kicker: {type:String},
        print_headline: {type:String},
        name: {type:String},
        seo: {type:String},
        sub: {type:String}
    },
    snippet:{
        type: String,
        required: true
    },
    web_url:{
        type: String,
        required: true,
    },
    pub_date:{
        type: Date
    },
    score:{
        type: Number
    }
})

var Article = mongoose.model("Article", NewsSchema);

module.exports= Article;