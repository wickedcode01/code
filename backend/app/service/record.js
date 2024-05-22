const Service = require('egg').Service;
class RecordService extends Service {
    async find(name) {
        const {ctx} = this;
        if(name){
            return await ctx.model.Record.find({name});
        }else{
            return await ctx.model.Record.find({isOver:false}).limit(10);
        }
       

    }

    async count(date){
        const {ctx} = this;
        let query = {isOver: false};
        if (date) {
            date = Number(date);
            const startOfDay = new Date(date);
            startOfDay.setHours(0,0,0,0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23,59,59,999);
            query = {
                time: {
                    $gte: startOfDay,
                    $lt: endOfDay
                },
                isOver: false
            };
        }
        return await ctx.model.Record.count(query);
    }

    async countByTimeframe(date, timeframe) {
        const {ctx} = this;
        let matchStage = {};
        let groupStage = {};
        if (date) {
            date = Number(date);
            const startOfDay = new Date(date);
            startOfDay.setHours(0,0,0,0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23,59,59,999);
            matchStage = {
                time: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            };
        }
        switch (timeframe) {
            case 'h':
                groupStage = {
                    _id: { $hour: "$time" },
                    count: { $sum: 1 }
                };
                break;
            case 'd':
                groupStage = {
                    _id: { $dayOfMonth: "$time" },
                    count: { $sum: 1 }
                };
                break;
            default:
                throw new Error('Unsupported timeframe');
        }
        return await ctx.model.Record.aggregate([
            { $match: matchStage },
            { $group: groupStage },
            { $sort: { _id: 1 } }
        ]);
    }


    async create(record) {
        const {ctx} = this;
        return await ctx.model.Record.create(record);
    }

    async update(record){
        const {ctx} = this;
        return await ctx.model.Record.updateOne({_id:record._id},record);
    }

    async delete(record){
        const {ctx} = this;
        return await ctx.model.Record.deleteOne({_id:record._id});
    }
}

module.exports = RecordService;