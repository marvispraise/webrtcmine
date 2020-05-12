<html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>video Chat App</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    </head>

    <body>
        <div class="container-fluid">
            <div class="row h-100 w-100">
                <div class="col-12 col-sm-6 d-flex justify-content-center">
                    <div class="embed-responsive embed-responsive-16by9">
                        <video class="embed-responsive-item" muted></video>
                    </div>
                </div>
                <div class="col-12 col-sm-6 d-flex justify-content-center">
                    <div id="peerDiv" class="embed-responsive embed-responsive-16by9">
                    
                    </div>
                </div>
            </div>
        </div>



        <script src="/socket.io/socket.io.js"></script>
        <script src="bundle.js"></script>
    </body>
    
</html>