//dados

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geográfia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// recebe o valor numerico da materia e retorna o nome da materia baseado na posição do array
function getSubject(subjectNumber){
    // parametro menos -1, pois no front-end o indice das materias começa em 1 
    const arrayPosition = +subjectNumber - 1 // o + serve para mostrar q é um valor numerico
    return subjects[arrayPosition]
}

function convertHoursToMinutes(time){
    // pega a hora e separa ela em minutos e horas e coloca em um array
   const [hour,minutes] = time.split(':')
   
   return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}