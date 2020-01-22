const ErrorHandler = {
    error(app,logger){
        app.use( async (ctx,next) => {
            try{
                await next();
            }catch (error){ 
                //服务器内部错误
                ctx.status = 500;
                logger.error(error);
                ctx.body = "服务器内部错误"
            }
        });
        app.use(async (ctx, next) => {
            await next();
            if(404 != ctx.status){
                return 
            }
            ctx.status = 404;
            ctx.body = 404;
        })
    }
};

export  default  ErrorHandler