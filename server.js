const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const fs = require('fs')

const app = express()

const PORT = process.env.PORT || 3000




const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'public')

app.use(express.json({limit: '1mb'}))
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res) => res.render('index', {title: 'Food'}))

app.get('/menu', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('db.json')).menu)
})

app.post('/modal', (req, res) => {
    const data = req.body
    fs.readFile('db.json', 'utf-8', (err, jsonString) => {
        if(err) {
            console.log(err)
        } else {
            const dataJsonString = JSON.parse(jsonString)
            dataJsonString.requests.push({
                name: data.name,
                phone: data.phone,
                id: dataJsonString.requests.length + 1
            })
            
            fs.writeFile('db.json', JSON.stringify(dataJsonString, null, 2), err => {
                if(err) console.log('Error...')
            })
        }
    })

    res.json({
        status: 200,
        name: data.name,
        phone: data.phone
    })
})




app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`)
})