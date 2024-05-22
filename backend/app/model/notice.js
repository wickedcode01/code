// 公告
module.exports= app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const noticeSchema = new Schema({
        content:{type:String},
        isShow:{type:Boolean,default:true},
        date:{type:Date,required:true}
    })
    return mongoose.model('Notice',noticeSchema)
}

