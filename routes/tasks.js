app.route('/task/:id')
    .get(cors(), function (req, res) {
        var title = req.params.title;
        var description = req.params.description;
        res.send("get" + title + '?value=' + description);
    })
    .post(cors(), function (req, res) {
        var title = req.params.title;
        var description = req.params.description; 
        res.send("post" + title + '/' + description);
    })
    
