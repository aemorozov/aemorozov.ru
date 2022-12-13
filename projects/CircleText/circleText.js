// забираем все элементы с классом text-for-circle-in-js в одну коллекцию
const collection = document.getElementsByClassName("text-for-circle");

// создаём объект, где лежат коррекции для каждого символа
const correctionForSymbols = {
    А: 0.5,
    а: 0.5,
    Ж: -1.8,
    ж: -1.8,
    И: -0.5,
    и: -0.5,
    Н: -0.5,
    н: -0.5,
    П: 1,
    п: 1,
    Р: 1,
    р: 0.5,
    Ы: -1,
    ы: -1,
    Ь: 1,
    ь: 1,
    Я: -1,
    я: -1,
    A: -0.5,
    a: -0.5,
    C: -1,
    c: -1,
    D: 1,
    d: 1,
    E: -0.5,
    e: -0.5,
    F: -1,
    f: -1,
    G: 1,
    g: 1,
    I: -1,
    i: -1,
    J: 1.5,
    j: 1.5,
    R: -1,
    r: -1,
    T: -1,
    t: -1,
    U: 1,
    u: 1,
    X: -1,
    x: -1
};

// передаём всю коллекцию в функцию для поочерёдной обработки
makeCircleText(collection);

function makeCircleText(collection) {
    // берём по очереди каждый DOM элемент коллекции text
    for (let i = 0; i < collection.length; i++) {
        // забираем весь текст из DOM элемента коллекции
        const collectionElementText = collection[i].outerText
        // делим полную окружность на количество элементов в строке + 1 пробел
        const rotation = 360 / (collectionElementText.length + 1);

        // пересобираем текст и добавляем каждому символу координату вдоль окружности плюс коррекцию
        collection[i].innerHTML = collectionElementText
            .split("")
            .map(
                (symbol, index) =>
                    `<span class="circle-text" style="--rot:${index * rotation + (correctionForSymbols[symbol] || 0)
                    }deg">${symbol}</span>`
            )
            .join("");
    }
}