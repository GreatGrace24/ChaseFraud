module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // Adding support for importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|jsx|ts|tsx)$/] },
      use: ["@svgr/webpack"], // Load SVGs as React components
    });

    return config;
  },
};
