var express = require("express");
var router = express.Router();
var db = require("./Models");

function checkAndRouteXHR(req,res){
    if(!req.xhr){
        res.redirect('/');
    }
}

function getAllSections(page){
    db.Section.find({'_id': { $in: page.sections}})
    .then(function(sections){
        return sections;    
    })
    .catch(err=>{
        console.log(err);
        return null;
    })
}

router.get('/page', function(req,res){
    db.Page.find()
    .then(function(pages){
        pages.forEach(page=>{
            page.sections = getAllSections(page)
            console.log(page.sections)
        })
        res.json(pages);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.post('/page', function(req,res){
    db.Page.create(req.body)
    .then(function(page){
        res.json(page);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.put('/page/:pageId', function(req,res){
    db.Page.findOneAndUpdate({_id:req.params.pageId}, req.body, {new:true})
    .then(function(page){
        console.log(page)
        res.json(page);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.get('/page/:pageId',function(req, res) {
    db.Page.findById({_id:req.params.pageID})
    .then(function(page){
        page.sections = getAllSections(page);
        console.log(page)
        res.json(page);
    })
    .catch(function(err){
        res.send(err);
    })
})

router.get('/section', function(req,res){
    /*checkAndRouteXHR(req,res);*/
    db.Section.find()
    .then(function(sections){
        res.json(sections);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.post('/section', function(req,res){
    /*checkAndRouteXHR(req,res);*/
    db.Section.create(req.body)
    .then(function(section){
        res.json(section);
    })
    .catch(function(err){
        console.log(err);
        res.send(err);
    });
});

router.put('/section', function(req, res) {
    db.Section.find({
        '_id': { $in: req.body.sections}
    })
    .then(function(sections){
        res.json(sections);
    })
    .catch(function(err){
        res.send(err);
    });
})

router.put('/section/:sectionId', function(req,res){
    /*checkAndRouteXHR(req,res);*/
    db.Section.findOneAndUpdate({_id:req.params.sectionId}, req.body, {new:true})
    .then(function(section){
        res.json(section);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.delete('/section/:sectionId', function(req,res){
    db.Section.remove({_id:req.params.sectionId})
    .then(function(){
        res.json({'message':'success'});
    })
    .catch(function(err){
        res.send(err);
    });
})

router.get('/home', function(req,res){
    let p = null;
    db.Page.findOne({url: '/'})
    .then(function(page){
        db.Section.find({
            '_id': { $in: page.sections}
        })
        .then(function(sections){
            res.json(sections);
        })
        .catch(function(err){
            res.send(err);
        });
    })
    .catch(function(err){
        res.send(err);
    });
    
});
module.exports = router;