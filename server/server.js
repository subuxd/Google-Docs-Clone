const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})


io.on("connection", socket => {
    socket.on("get-document", documentId => {
        const data = ""
        socket.join(documentId)
        socket.emit("load-document", data)

        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

    })
})









//why chose quill? b/c instead of sending whole paragraph with every change
// quill only sends the single-single character which is changed in the code





//cors are used b/c our server and client are at different locations/ports