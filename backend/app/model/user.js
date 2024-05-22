// app/model/user.js

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true }
        // 可以根据需要添加更多字段
    });

    return mongoose.model('User', UserSchema);
};
