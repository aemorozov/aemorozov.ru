const text = document.getElementsByClassName("text-for-circle"); // забираем все элементы с классом text в коллекцию

makeCircleText(text); // всю коллекцию отдаём в функцию

console.log(text)

function makeCircleText(text) {
    let rotation = 0; // создаём переменную для местоположения каждого символа

    for (i = 0; i < text.length; i++) {
        rotation = 360 / (text[i].outerText.length + 1); // в каждом элементе коллекции забираем текст

        text[i].innerHTML = text[i].innerHTML // и меняем его на круговой
            .split("")
            .map(
                (symbol, index) =>
                    `<span class="circle-text" style="--rot:${index * rotation
                    }deg">${symbol}</span>`
            )
            .join("");
    }
}