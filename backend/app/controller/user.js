// app/controller/user.js

const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        // 检查用户名是否已存在
        const user = await ctx.service.user.find(username);
        if (user) {
            ctx.status = 400;
            ctx.body = { message: '用户名已存在' };
            return;
        }

        // 加密密码

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // 保存用户
        await ctx.service.user.create({ username, password: hash, role:'admin' });

        ctx.status = 201;
        ctx.body = { message: '用户注册成功' };
    }

    // 继续在 app/controller/user.js

    async login() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
        // 查找用户
        const user = await ctx.service.user.find(username);
        if (!user) {
            ctx.status = 401;
            ctx.body = { message: '用户不存在' };
            return;
        }

        // 检查密码
        const valid = bcrypt.compareSync(password, user.password);
        if (!valid) {
            ctx.status = 401;
            ctx.body = { message: '密码错误' };
            return;
        }

        // 生成 JWT
        const token = app.jwt.sign({ id: user.id }, app.config.jwt.secret, { expiresIn: '12h' });

        ctx.body = { message: '登录成功', token };
    }

}

module.exports = UserController;