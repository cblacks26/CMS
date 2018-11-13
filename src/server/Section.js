var mongoose = require("mongoose");

var sectionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: 'Title cannot be Empty'
    },
    content:{
        type: String,
        default: ''
    }
});
var Section = mongoose.model('Section', sectionSchema);
module.exports = Section;