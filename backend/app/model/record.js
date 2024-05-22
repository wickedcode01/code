module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    // 用户预约就诊记录
    const RecordSchema = new Schema({
        time: { type: Date, required: true },
        name: { type: String, required: true },
        remark: { type: String },
        isOver: { type: Boolean, default: false },
        extInfo: { type: Object,  }
    });

    return mongoose.model('Record', RecordSchema);
};
