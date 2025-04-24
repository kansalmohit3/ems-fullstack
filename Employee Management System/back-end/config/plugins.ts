// config/plugins.ts
export default {
    'users-permissions': {
      config: {
        register: {
          enabled: true, // 💥 THIS is what allows the /auth/local/register endpoint
        },
      },
    },
  };

  module.exports = {
    'documentation': {
      enabled: true,
      config: {
        generateDefaultResponse: true,
      },
    },
  };