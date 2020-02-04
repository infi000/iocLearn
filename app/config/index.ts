import { extend } from "lodash";
import { join } from "path";
let config = {
  dataPark:{
    url: 'http://10.188.40.120:9946',
  },
  db: {
    url: "mongodb://10.188.40.184:27017/",
    name: "longan"
  },
  viewDir: join(__dirname, "../app", "views"),
  staticDir: join(__dirname, "../app", "webroot"),
  port: 80
};


console.log("process.env.NODE_ENV=======>", process.env.NODE_ENV)

const mergeConfig = () => {
  //开发环境下
  if (process.env.NODE_ENV == "development") {
    const localConfig = {
      port: 7000,
      mongodb:{
        dbUrl: "mongodb://10.188.40.184:27017/",
        dbName: "longan"
      },
      dataPark: {
        url: 'http://10.188.40.120:9946',
        // url: 'http://gz-cvm-ebuild-ningzhang-dev001.gz.sftcwl.com:7300/mock/5ddbc923cf2aa0138ad5bc16/longan',
      },
    };
    config = extend(config, localConfig);
  }
  //上线环境下
  if (process.env.NODE_ENV == "production") {
    const proConfig = {

    };
    config = extend(config, proConfig);
  }
  return config;
};
export default mergeConfig();
