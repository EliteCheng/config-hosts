const path = require('path')
const paths = require('react-scripts/config/paths')
const {
    OUTPUT_PATH,
    PUBLIC_PATH,
} = require('./config-path')

const isDev = process.env.dev === 'true'
if (!isDev) {
    paths.appBuild = path.join(OUTPUT_PATH, PUBLIC_PATH)
}