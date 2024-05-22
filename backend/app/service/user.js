// app/service/user.js

const Service = require('egg').Service;

class UserService extends Service {
  // 查找用户
  async find(username) {
    const { ctx } = this;
    return await ctx.model.User.findOne({ username });
  }

  // 创建用户
  async create(userData) {
    const { ctx } = this;
    const user = new ctx.model.User(userData);
    return await user.save();
  }
}

module.exports = UserService;
