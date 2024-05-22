// app/middleware/jwt.js

module.exports = ({ app }) => {
    return async function jwt(ctx, next) {
      const token = ctx.request.header.authorization;
      let decode;
      if (token) {
        try {
          // 尝试解析 Token
          decode = ctx.app.jwt.verify(token, app.config.jwt.secret);
          await next();
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            message: error.message,
          };
          return;
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          message: '没有提供 Token',
        };
        return;
      }
    };
  };
  