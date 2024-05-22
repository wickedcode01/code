exports.mongo = {
    client: {
      host: 'mongodb',
      port: '27017',
      name: 'test',
    },
  };
  
  exports.mongoose = {
    client: {
      url: 'mongodb://root:example@mongodb:27017/test?authSource=admin',
      options: {},
    },
  };
  