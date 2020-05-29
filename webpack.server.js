const path = require('path');
const nodeExternals = require("webpack-node-externals")
module.exports={
    mode:"development",
    target:'node',
    entry:"./src/server/index.ts",
    watch:true,
    devtool:"source-map",
    resolve:{
        alias:{
            "@":path.resolve(__dirname,"src")
        },
        extensions:['.ts','.js']
    },
    externals: [nodeExternals()],
    module:{
        rules:[
            {
                test:/\.ts$/,
                exclude: /node_modules/, 
                use:'ts-loader'
            }
        ]
    }

}