const Blog = require('../models/blogs');

const blog = (req,res) => {
    Blog
    .find()
    .sort({createdAt:-1})
    .then((result) => {
            res.render('index',{title:"Ana Sehife",blogs:result})
        })
    .catch((err) => {
            console.log(err)
        })
}

const blog_id = (req,res) => {
    const id =  req.params.id
    
    Blog.findById(id).then((result) => {
        res.render('blog',{blog:result,title:"Etrafli"})
    }).catch((err) => {
        
    res.status(404).render('404',{title:"Xeta"})
    })

}

module.exports = {
    blog,
    blog_id
}
