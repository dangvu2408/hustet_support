module.exports = {
  webpack: (config, env) => {
    // Tuỳ chỉnh webpack ở đây nếu cần
    return config;
  },
  devServer: (config, env) => {
    config.allowedHosts = 'all';
    delete config.onAfterSetupMiddleware;
    return config;
  }
};
