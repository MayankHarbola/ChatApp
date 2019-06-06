const connection = require('../connection');
const Schema = connection.Schema;  // bole toh mongoose.Schema-- >aur ab schema ekk function constructor ki trah act kar rha h jo                                       ki schema ka object kesa hoga define karega 

const chatSchema = new Schema({
   "userid":{type: String,default:'Anonmous'},
   "message":{type: String},
   "thumbnail":{type: String}
});

const ChatModel = connection.model('message',chatSchema);//create collection of name "message" with schema of userSchema type

module.exports = ChatModel;