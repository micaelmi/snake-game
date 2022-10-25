window.onload = function () {
    stage = document.querySelector('#stage')
    context = stage.getContext('2d')

    showSize = document.querySelector('#show-size')
    showBestSize = document.querySelector('#show-best-size')

    gameOverMessage = document.querySelector('#snackbar')

    document.addEventListener("keydown", keyPush)

    setInterval(game, 90)

    const speed = 1;
    let speedX = 0, speedY = 0, pointX = 10, pointY = 10
    let blockSize = 20, blocksAmount = 20
    let appleX = 16, appleY = 7
    let rockX = Math.floor(Math.random() * blocksAmount)
    let rockY = Math.floor(Math.random() * blocksAmount)

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

        // Pinta a Maçã
        context.fillStyle = "#ff0000"
        context.fillRect(appleX * blockSize, appleY * blockSize, blockSize, blockSize)

        context.fillStyle = "#667"
        context.fillRect(rockX * blockSize, rockY * blockSize, blockSize, blockSize)

        // Faz a cobrinha
        context.fillStyle = "#e68436"
        // Renderiza o array que é a cobrinha
        for (let i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * blockSize, trail[i].y * blockSize, blockSize - 1, blockSize - 1)
            // Verifica se bateu, para finalizar o jogo
            if (trail[i].x == pointX && trail[i].y == pointY
                && (speedX > 0 || speedY > 0)) {
                speedX = speedY = 0;
                snakeBody = 5
                showSize.textContent = snakeBody
                showGameOverMessage()
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

        // Se bater na rocha, perde o jogo e reinicia
        if (rockX == pointX && rockY == pointY) {
            speedX = speedY = 0;
            snakeBody = 5
            showSize.textContent = snakeBody
            rockX = Math.floor(Math.random() * blocksAmount)
            rockY = Math.floor(Math.random() * blocksAmount)
            showGameOverMessage()
        }

        // Define um novo recorde caso o salvo seja menor que a pontuação atual
        if (showBestSize.textContent < snakeBody) {
            showBestSize.textContent = snakeBody
        }

        // Mostra a mensagem de fim de jogo
        function showGameOverMessage() {
            gameOverMessage.className = "show" // Adiciona a classe show

            setTimeout(function () { gameOverMessage.className = gameOverMessage.className.replace("show", ""); }, 3000); // remove a classe show
        }
    }

    // Comandos do teclado, cada setinha faz ela se movimentar para um lado
    function keyPush(event) {
        if (event.keyCode == 37 && speedX == 0) { // esquerda
            speedX = -speed
            speedY = 0
            return
        }
        if (event.keyCode == 38 && speedY == 0) { // cima
            speedX = 0
            speedY = -speed
            return
        }
        if (event.keyCode == 39 && speedX == 0) { // direita
            speedX = speed
            speedY = 0
            return
        }
        if (event.keyCode == 40 && speedY == 0) { // baixo
            speedX = 0
            speedY = speed
            return
        }
    }

}