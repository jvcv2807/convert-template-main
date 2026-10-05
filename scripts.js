//Cotação de moedas do dia.
const USD = 5.2
const EUR = 5.5
const GBP = 6.08

//Obtendo elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

//Captando o evento submit do formulário.
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

//Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    //Calcula o total.
    let total = amount * price

    // Se o total não for um número, exibe um alerta para o usuário.
    if (isNaN(total)) {
      return alert("Digite um valor válido para conversão.")
    }
    // Exibe o resultado total da conversão no footer.
    result.textContent = `${formatCurrencyBRL(total)}`

    //Aplica a classe que exibe o footer com o resultado da conversão.
    footer.classList.add("show-result")
  } catch (error) {
    //Remove a classe que exibe o footer com o resultado da conversão.
    footer.classList.remove("show-result")
  
    console.log(error)
    alert("Não foi possível converter a moeda. Tente novamente mais tarde.")
  }
}

// Formata o valor para o padrão monetário brasileiro.
function formatCurrencyBRL(value) {
  // Converte o valor para o formato monetário brasileiro (BRL) usando a função toLocaleString.
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  } )
}
