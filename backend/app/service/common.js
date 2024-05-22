const { Service } = require('egg');
class CommonService extends Service {
    async getNotice() {
        const { ctx } = this;
        const notice = await ctx.model.Notice.findOne({ isShow: true }).sort({ date: -1 });
        return notice;
    }

    async addNotice(content){
        const {ctx} = this;
        const notice = await ctx.model.Notice.create({content,isShow:true,date:new Date().valueOf()});
        return notice;
    }
}
module.exports = CommonService;
