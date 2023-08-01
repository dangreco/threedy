const config = require('@kombu/prettier-config');

module.exports = {
  ...config,
  importOrder: ["^@shared/(.*)$", "^@types$", "^[./]"],
};
