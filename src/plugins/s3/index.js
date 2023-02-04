const fastifyPlugin = require('fastify-plugin')
const multer = require('fastify-multer')
const multerS3 = require('multer-s3-transform')
const AWS = require('aws-sdk')
const path = require('path')

module.exports = fastifyPlugin(async (fastify, opts) => {
  const uploadSwaggerConfig = {
    attachFieldsToBody: true

    // TODO: will see later why file upload options is not coming on swagger docs.
    // addToBody: true,
    // sharedSchemaId: "#uploadFile",
  }
  await fastify.register(multer.contentParser, uploadSwaggerConfig)

  const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_REGION, S3_BUCKET } =
    fastify.config
  const s3 = new AWS.S3({
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID,
    region: AWS_REGION
  })

  const upload = (opts = {}) => {
    const { supportedFiles, fileSize } = opts
    return multer({
      fileFilter: (req, file, cb) => {
        if (!supportedFiles) {
          cb(null, true)
        } else if (supportedFiles.includes(`.${file.mimetype.split('/')[1]}`)) {
          cb(null, true)
        } else {
          cb(new Error('Unsupported file!'), false)
        }
      },
      limits: {
        fileSize: fileSize || 1024 * 1024
      },
      storage: multerS3({
        s3,
        bucket: S3_BUCKET,
        cacheControl: 'max-age=31536000',
        contentType: undefined,

        key (req, file, cb) {
          const key = `${file.originalname.replace(
            '.',
            ''
          )}-${Date.now().toString()}${path.extname(file.originalname)}`
          cb(null, key)
        }
      })
    })
  }

  const attachFileWithBody = async (request) => {
    const { file, body } = request
    if (file) {
      body[file.fieldname] = file.location
    }
  }

  const getSignedUrl = (location) => {
    try {
      const fileUrl = location ? location.split('.com/') : ''
      if (fileUrl.length <= 1) {
        return location
      }

      const filePath = decodeURI(fileUrl[fileUrl.length - 1])
      const urlparts = filePath.split('?')
      const params = {
        Bucket: S3_BUCKET,
        Key: urlparts[0] || filePath,
        Expires: 1800
      }
      return s3.getSignedUrl('getObject', params)
    } catch (err) {
      fastify.log.error({ err }, 'Unable to fetch the S3 signed url')
      return location
    }
  }

  fastify.decorate('attachFileWithBody', attachFileWithBody)
  fastify.decorate('upload', upload)
  fastify.decorate('getSignedUrl', getSignedUrl)
})
