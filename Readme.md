#Middleware functions can perform the following tasks:

    :Execute any code.
    :Make changes to the request and the response objects.
    :End the request-response cycle.
    :Call the next middleware function in the stack.
    :If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

#An Express application can use the following types of middleware:

    ::Application-level middleware

        :Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) 

        :To skip the rest of the middleware functions from a router middleware stack, call next('route') to pass control to the next route.

        :Middleware can also be declared in an array for reusability.

    ::Router-level middleware

        :Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().

        :Load router-level middleware by using the router.use() and router.METHOD() functions.
        
        :To skip the rest of the router’s middleware functions, call next('router') to pass control back out of the router instance.



    :: Error-handling middleware
    
        Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.


    ::Built-in middleware
        eg:express.json(), it contains predefined middleware
        
    ::Third-party middleware

#You can load application-level and router-level middleware with an optional mount path. You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.