// забираем все элементы с классом text-for-circle-in-js в одну коллекцию
const collection = document.getElementsByClassName("text-for-circle");

// создаём объект, где лежат коррекции для каждого символа
const correctionForSymbols = {
    А: 0.5,
    а: 0.5,
    Б: 0,
    б: 0,
    В: 0,
    в: 0,
    Г: 0.5,
    г: 0.5,
    Д: 0,
    д: 0,
    Е: 0,
    е: 0,
    Ё: 0,
    ё: 0,
    Ж: -1.8,
    ж: -1.8,
    З: 0,
    з: 0,
    И: -0.5,
    и: -0.5,
    Й: 0,
    й: 0,
    К: 0,
    к: 0,
    Л: 0,
    л: 0,
    М: 0,
    м: 0,
    Н: -0.5,
    н: -0.5,
    О: -0,
    о: -0,
    П: 1,
    п: 1,
    Р: 1,
    р: 1,
    С: 0,
    с: 0,
    Т: 0,
    т: 0,
    У: 0,
    у: 0,
    Ф: 0,
    ф: 0,
    Х: 0,
    х: 0,
    Ц: 0,
    ц: 0,
    Ч: 0,
    ч: 0,
    Ш: 0,
    ш: 0,
    Щ: 0,
    щ: 0,
    Ъ: 0,
    ъ: 0,
    Ы: -1,
    ы: -1,
    Ь: 1,
    ь: 1,
    Э: 0,
    э: 0,
    Ю: 0,
    ю: 0,
    Я: -1,
    я: -1,
    A: -0.5,
    a: -0.5,
    B: 0,
    b: 0,
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
    H: 0,
    h: 0,
    I: 1,
    i: 1,
    J: 1.5,
    j: 1.5,
    K: 0,
    k: 0,
    L: 0,
    l: 0,
    M: 0,
    m: 0,
    N: 0,
    n: 0,
    O: 0,
    o: 0,
    P: 0,
    p: 0,
    Q: 0,
    q: 0,
    R: -1,
    r: -1,
    S: 0,
    s: 0,
    T: -1,
    t: -1,
    U: 1,
    u: 1,
    V: 0,
    v: 0,
    W: 0,
    w: 0,
    X: -1,
    x: -1,
    Y: 0,
    y: 0,
    Z: 0,
    z: 0
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