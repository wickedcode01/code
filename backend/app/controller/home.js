'use strict';

const Controller = require('egg-cloud').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;

    ctx.body = "hello world"
  }

  async addNotice() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    const notice = await ctx.service.common.addNotice(content);
    ctx.body = notice;
  }

  async getNotice() {
    const { ctx } = this;
    const notice = await ctx.service.common.getNotice();
    ctx.body = notice;
  }

}

module.exports = HomeController;
