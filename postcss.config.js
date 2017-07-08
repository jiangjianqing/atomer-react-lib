module.exports = (ctx) => ({
    map : ctx.options.map,
    parser : ctx.file.extname === '.sss' ? 'sugarss' :  false,
    plugins : {
        //特别注意：这里的顺序可能存在要求，比如去掉import处理后，整个处理就会失败：TypeError: Cannot set property 'parent' of undefined
        'postcss-import' : { root : ctx.file.dirname },
        'postcss-cssnext' : ctx.options.cssnext ? ctx.options.cssnext : true, //autoprefix已被cssnext包括，不再需要单独设置
        'precss' : ctx.options.precss ? ctx.options.precss : true,
        'cssnano' : ctx.env === 'production' ? ctx.options.cssnano : false //css压缩
    }
})