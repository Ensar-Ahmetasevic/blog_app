// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// module.exports = (phase) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER) {
//     return {
//       env: {
//         mongodb_username: "Ensar_MongoDB",
//         mongodb_password: "Love1986+",
//         mongodb_clustername: "cluster0",
//         mongodb_database: "my-site-dev",
//       },
//     };
//   }

//   return {
//     env: {
//       mongodb_username: "Ensar_MongoDB",
//       mongodb_password: "Love1986+",
//       mongodb_clustername: "cluster0",
//       mongodb_database: "my-site",
//     },
//   };
// };

module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};
