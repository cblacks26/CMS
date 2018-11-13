var mongoose = require("mongoose");

var pageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Cannot be empty'
    },
    url:{
        type: String,
        required: 'Needs a URL'
    },
    sections:{
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Section', default: [] }],
    }
});
var Page = mongoose.model('Page', pageSchema);
module.exports = Page;