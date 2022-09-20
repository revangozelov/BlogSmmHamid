const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const Blog = require('./models/blogs');
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const {requireAuth,checkUser} = require('./middilewares/authMiddileware')

const app = express()

const dbUrl = 'mongodb+srv://hemid:zHOiiNX6EuczmyC0@smmhamid.fdh1xuu.mongodb.net/smm_hamid?retryWrites=true&w=majority'

mongoose.connect(dbUrl)
    .then((result) => console.log("BAGLANDI...") )
    .catch((err) => console.log(err))


app.set('view engine','ejs')

app.listen(5000)

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cookieParser())


app.get('*',checkUser)
app.get('/add',(req,res) => {
    const blog = new Blog({
        title:"Yeni Yazi 2",
        short:"Qisa Aciqlama 2",
        long:"Uzun Aciqlama 2"
    })
    blog.save()
    .then((result) => {
        res.send(result)
    })

    .catch((err) => {
        console.log(err);
    })
})

app.get('/all',(req,res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single',(req,res) => {
    Blog.findById('62f2c6af141131facc5e2039')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})


app.get('/',(req,res) => {
    res.redirect('/blog')
})


app.use('/',authRoutes)
app.use('/blog',blogRoutes)
app.use('/admin',requireAuth,adminRoutes)

app.get('/about',(req,res) => {
    res.render('about',{title:"Haqqinda"})
})

app.get('/about-us',(req,res) => {
    res.redirect('/about')
})

app.use((req,res) => {
    res.status(404).render('404',{title:"Xeta"})
})