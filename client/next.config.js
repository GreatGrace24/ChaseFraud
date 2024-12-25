module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|jsx|ts|tsx)$/] },
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
