const os = require('os')
const path = require('path')

// Keep Taro's per-user cache inside the project so Windows accounts with
// restricted home-directory permissions can still build the mini program.
os.homedir = () => path.join(process.cwd(), 'work', 'taro-home')
require('../node_modules/@tarojs/cli/bin/taro')
