'use strict'

// Read the .env file.
require('dotenv').config()

// Require the framework
const Fastify = require('fastify')
const fs = require('fs')
const path = require('path')
const rawBody = require('raw-body');

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace')

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
  https: {
    // key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    // cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  }
})


// Register your application as a normal plugin.
const appService = require('./index.js')
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 },
  async function ({ signal, err, manual }) {
    if (err) {
      app.log.error(err)
    }
    await app.close()
  }
)

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall()
  done()
})

// Start listening.
app.listen(
  { host: process.env.HOST, port: process.env.PORT || 8081 },
  (err) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
)
