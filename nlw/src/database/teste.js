const Database = require('./db')
const createProffy = require('./createProffy')

Database.then( async (db) => {
    // ------------ inserir dados -------------- //
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "11 920075365",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {
        subject: "Química",
        cost: "20,00"
        // o proffy_id vira pelo bando de dados
    }

    classScheduleValues = [

        {
        weekday: 0,
        time_from: 720,
        time_to: 1220
            },

        {
            weekday: 1,
            time_from: 520,
            time_to: 1220
            }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

     // ---------- Consultar dados ---------------

    // trazer todos os proffys

    const selectedProffys = await db.all("select * from proffys")
    // console.log(selectedProffys)


    // consultar as classes de um determinado professor
    // e trazer os dados do professor
    // inner join
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 2;
    `)

    // console.log(selectClassesAndProffys)

    // o horario que a pessoa trabalho por exemplo, é das 8h - 18h
    // horario do time_from (8h), precisa ser menor ou igual ao horario solicitado
    // o time_to precisa ser acima ao horario

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "720"
        AND class_schedule.time_to > "720"
    `)

    // console.log(selectClassesSchedules)
})