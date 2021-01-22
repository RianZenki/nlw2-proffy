// para o await funcionar é preciso colocaro async antes da função
module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {

    // ----------------- inserir dados na tabela proffys ----------------------------//

    //await faz o js esperar a finalização da linha, para ir para a proxima. 
    // Por padrao o js roda linha a linha, mesmo a linha n ter terminada, ele vai pra proxima.
    // da pra usar o função().then('') tbm, espera terminar a linha, mesma coisa q o await
    const insertedProffy = await db.run(`
        insert into proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) values (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    // pega o id dos dados q foram inseridos
    const proffy_id = insertedProffy.lastID


    // ---------------------- inserir dados na tabela classes ----------------------------//

    const insetedClass = await db.run(`
        insert into classes (
            subject,
            cost,
            proffy_id
        ) values (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insetedClass.lastID


    // ------------------- inserir dados na tabela class_schedule ----------------------------// 
    // como pode ser mais de um registro para ser cadastrado, entao é feito diferente

    // map é tipo um forEach, ele verifica todas as posições do array um por um.
    // recebendo como parametro o objeto classScheduleValues  da função principal la de cima.

    // o map retorna um array com com diversas db.run(`insert into class_schedule () ... Um para cada registro
    // [db.run(''),db.run(''),db.run('')], cada um recebe um valor de cada classScheduleValue

    const insetedAllClassScheduleValue = classScheduleValues.map((classScheduleValue) =>{
        return db.run(`
            insert into class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) values (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
                
            );
        `)
    })

    // aqui vou executar todos os db.runs() das class_schedule
    // executa todos os [db.run(''),db.run(''),db.run('')]
    await Promise.all(insetedAllClassScheduleValue)
}