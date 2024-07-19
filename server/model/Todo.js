// model/todoModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', todoSchema);
