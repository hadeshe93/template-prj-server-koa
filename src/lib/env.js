class Env {
  constructor() {
    this.env = '';
    this.isDev = false;
    this.isTest = false;
    this.isProd = false;

    this.init();
  }

  init() {
    this.env = this.getVariable('NODE_ENV');

    switch (this.env) {
      case "test":
        this.isDev = false;
        this.isTest = true;
        this.isProd = false;
        break;
      case "production":
        this.isDev = false;
        this.isTest = false;
        this.isProd = true;
        break;
      default:
        this.isDev = true;
        this.isTest = false;
        this.isProd = false;
        break;
    }
  }

  // 获取环境变量
  getVariable(key) {
    const env = process.env;
    return env[key];
  }
}

module.exports = new Env();
