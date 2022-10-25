window.onload = function () {
    stage = document.querySelector('#stage')
    context = stage.getContext('2d')

    showSize = document.querySelector('#show-size')
    showBestSize = document.querySelector('#show-best-size')

    document.addEventListener("keydown", keyPush)

    setInterval(game, 90)

    const speed = 1;
    let speedX = 0, speedY = 0, pointX = 10, pointY = 10
    let blockSize = 20, blocksAmount = 20
    let appleX = 16, appleY = 7

    let trail = []
    let snakeBody = 5

    function game() {
        pointX += speedX
        pointY += speedY

        // Se acabar o Mapa, a cobrinha aparece do outro lado
        if (pointX < 0) {
            pointX = blocksAmount - 1
        }
        if (pointX > blocksAmount - 1) {
            pointX = 0
        }
        if (pointY < 0) {
            pointY = blocksAmount - 1
        }
        if (pointY > blocksAmount - 1) {
            pointY = 0
        }

        // Pinta o mapa
        context.fillStyle = "#0A952B"
        context.fillRect(0, 0, stage.width, stage.height)

        context.fillStyle = "#ff0000"
        context.fillRect(appleX * blockSize, appleY * blockSize, blockSize, blockSize)

        // Faz a cobrinha
        context.fillStyle = "#e68436"
        // Renderiza o array que é a cobrinha
        for (let i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * blockSize, trail[i].y * blockSize, blockSize - 1, blockSize - 1)
            // Verifica se bateu, para finalizar o jogo
            if (trail[i].x == pointX && trail[i].y == pointY) {
                speedX = speedY = 0;
                snakeBody = 5
                showSize.textContent = snakeBody
            }
        }


        trail.push({ x: pointX, y: pointY })
        // Tira a parte que a cobrinha acabou de passar, para ela não ficar aumentando infinitamente
        while (trail.length > snakeBody) {
            trail.shift()
        }

        // Se a maçã for comida, aparece outra num lugar aleatório e aumenta o tamanho da cobrinha
        if (appleX == pointX && appleY == pointY) {
            snakeBody++
            showSize.textContent = snakeBody
            appleX = Math.floor(Math.random() * blocksAmount)
            appleY = Math.floor(Math.random() * blocksAmount)
        }


        if (showBestSize.textContent < snakeBody) {
            showBestSize.textContent = snakeBody
        }
    }

    // Comandos do teclado, cada setinha faz ela se movimentar para um lado
    function keyPush(event) {
        switch (event.keyCode) {
            case 37: //left
                speedX = -speed
                speedY = 0
                break
            case 38: // up
                speedX = 0
                speedY = -speed
                break
            case 39: //right
                speedX = speed
                speedY = 0
                break
            case 40: // down
                speedX = 0
                speedY = speed
                break
            default:
                break
        }
    }

}