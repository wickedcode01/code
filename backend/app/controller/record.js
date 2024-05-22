const Controller = require('egg').Controller;
const ObjectId = require('mongoose').Types.ObjectId;
class RecordController extends Controller{
    async find(){
        const { ctx, app } = this;
        const { name } = ctx.request.query;
        const records = await ctx.service.record.find(name);
        ctx.body = records;
    }

    async addRecord(){
        const { ctx, app } = this;
        const { name, time, remark, extInfo } = ctx.request.body;
        const record = await ctx.service.record.create({ name, time, remark,isOver:false,extInfo });
        ctx.body = record;
    }

    async count(){
        const { ctx, app } = this;
        const { date } =ctx.request.query;
        const count = await ctx.service.record.count(date);
        ctx.body = {'count':count};
    }

    async finishRecord(){
        const { ctx, app } = this;
        const { id } = ctx.request.body;
        const objectId = new ObjectId(id);
        const record = await ctx.service.record.update({_id: objectId,isOver:true});
        ctx.body = record;
    }
}

module.exports = RecordController;