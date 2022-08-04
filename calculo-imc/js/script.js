function start() {
  const buttonCalculaIMC = document.querySelector("#calculaIMC");
  const inputWeight = document.querySelector("#inputWeight");
  const inputHeight = document.querySelector("#inputHeight");

  inputWeight.addEventListener("input", handleButton);
  inputHeight.addEventListener("input", handleButton);
  buttonCalculaIMC.addEventListener("click", handleButton);
}

function calculaIMC(weight, height) {
  return weight / (height * height);
}

function resultadoIMC(IMC) {
  if (IMC < 17) {
    return "muito abaixo do peso";
  } else if (IMC < 18.49) {
    return "abaixo do peso";
  } else if (IMC < 24.99) {
    return "com peso normal";
  } else if (IMC < 29.99) {
    return "acima do peso";
  } else if (IMC < 34.99) {
    return "com Obesidade I";
  } else if (IMC < 39.99) {
    return "com Obesidade II (severa)";
  } else {
    return "com Obesidade III (mórbida)";
  }
}

function handleButton() {
  const inputWeight = document.querySelector("#inputWeight");
  const inputHeight = document.querySelector("#inputHeight");
  let weight = inputWeight.value;
  let height = inputHeight.value;

  const valorIMC = document.querySelector("#resultadoIMC");
  const IMC = calculaIMC(weight, height);
  const analiseIMC = resultadoIMC(IMC);
  //const analiseFeedback = document.querySelector("#analiseIMC");
  //analiseFeedback.innerHTML = "Você está com " + analiseIMC + ".";
  //console.log(analiseIMC);

  valorIMC.innerHTML = `${IMC.toFixed(2).replace(".", ",")}.<br><span id = 'analiseIMC'>Você está com ${analiseIMC}</span>`;
  //valorIMC.textContent = `${IMC}<br>Você está com ${analiseIMC}`;
}

start();
