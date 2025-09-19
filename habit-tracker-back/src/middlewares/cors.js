const cors = require('cors')

const corsOpt = cors({
    origin : '*',
    credentials : true
})

module.exports = corsOpt