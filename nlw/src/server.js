const Database = require('./database/db')

// reestruturação dos dados
const {subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format')

// ---- iniciando o servidor

//Servidor
//require('express')() // mesma coisa q as duas linhas de baixo
// coloca a requisição do express em uma variavel, mas não roda a função
const express = require('express')
// roda a função express e coloca em uma variavel
const server = express()

// importa o nunjucks, um template engine
const nunjucks = require('nunjucks')

const createProffy = require('./database/createProffy')

//configurar nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

// inicio e configuração do servidor
// configuração do servidor para a pasta public ser a pasta raiz na visao do servidor
// como o  css, imagens e js no front-end não mudam e são recorrentes eles são estaticos
server.use(express.static("public"))

// receber os dados do req.body
.use(express.urlencoded({ extends: "true" }))

// setta o caminho da pagina como  localhost:5500/ == index.html
.get("/", (req, res) => {
    // __dirname é a pasta atual
    return res.render("index.html")
})

// localhost:5500/study == study.html
.get("/study", async (req,res) => {
    const filters = req.query

    // if (!filters.subject && !filters.weekday && !filters.time){
        
    //     const query = 'SELECT * FROM PROFFYS'
    //     return res.render("study.html", {})
        
    // }

    if(!filters.subject || !filters.weekday || !filters.time){
        // enviando a pagina junto com objetos para serem usados no front end
        console.log("ate tem né")
        return res.render("study.html", { filters, subjects, weekdays}) // ou somente proffys, pq esse objeto ja foi declarado
        
    }

    // converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    // SÓ VAI MOSTRAR SE ACHAR ALGUMA COISA NA SUBBUSCA (WHERE EXISTS) 
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    // tratamento de erro

    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) =>{
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays})
    } catch (error) {
        console.log(error)
    }
})

.get("/give-classes", (req,res) => {
    
    // se nao, mostrar a pagina normalmente
    return res.render("give-classes.html", {subjects, weekdays})
})

.post("/save-classes", async (req,res) =>{
    const createProffy = require('./database/createProffy')
    
     const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) =>{

        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
    

    // // transforma as chaves({}) do objeto em colchetes [], transformando em um array, e recebe o tamanho dele
    // const isNotEmpty = Object.keys(data).length > 0
    // // se tiver dados adicionar
    // if(isNotEmpty){
    //     // altera o numero pela materia
    //     data.subject = getSubject(data.subject)
    //     // adiciona no array proffys
    //     proffys.push(data)
    //     return res.redirect("/study")
    // }

})

// abre a porta 5500
.listen(5500)

