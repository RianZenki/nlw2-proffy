
// duplica o formulario de horarios disponiveis quando clicar no botao
document.querySelector('#add-time')
.addEventListener('click', () => {
    // copia todo o elemento com os elementos filhos dele
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //node se refere aos elementos html da pagina, ver o DOM
    
    //pegar os campos input
    const fields = newFieldContainer.querySelectorAll('input')

    // para cada field executa uma vez a função, laço de repetição
    fields.forEach( (field) => {
        // field é uma variavel de incremento, tipo o i, field == fields[i]
        // pega o field do momento e limpa ele
        field.value = ""
    })

    document.querySelector('#schedule-items').appendChild(newFieldContainer) // cria um novo elemento filho
})
