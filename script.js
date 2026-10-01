const canvas =
            document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;

        // ===== INITIAL STATE =====
        let snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        let direction = { x: 0, y: 0 };
        let food = { x: 15, y: 15 };
        let score = 0;

        // ===== DRAWING =====
        const drawGame = () => {
            ctx.clearRect(0, 0,
                canvas.width, canvas.height);

            ctx.fillStyle = "red";
            ctx.fillRect(
                food.x * gridSize,
                food.y * gridSize,
                gridSize, gridSize
            );

            ctx.fillStyle = "black";
            for (const segment of snake) {
                ctx.fillRect(
                    segment.x * gridSize,
                    segment.y * gridSize,
                    gridSize, gridSize
                );
            }
        };

        drawGame();

        // ===================================
        // BUILD THE GAME FROM HERE
        // ===================================
        //
        // Use your custom agent in VS Code Chat 
        // to guide your work through each step. 
        // Commit regularly.
        //
        // Step 1: Movement (game loop)
        // Step 2: Keyboard controls
        // Step 3: Eating and growing
        // Step 4: Game over
        // Step 5: Improvements
        //
        // ==================================
        function movesnake() {
            const head = { 
                x: snake[0].x + direction.x,
                y: snake[0].y + direction.y 
            };
            if(head.x < 0 || 
                head.x >= tileCount || 
                head.y < 0 || 
                head.y >= tileCount
            ){
                clearInterval(gameTimer);
                alert("Game Over! Score: " + score);
                return;
            }
            snake.unshift(head);

            if(head.x === food.x && head.y === food.y) {
                score++;
                food = {
                    x: Math.floor(Math.random() * tileCount), 
                    y: Math.floor(Math.random() * tileCount) 
                };
            } else{
                snake.pop();
            }
            drawGame();
         }



        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowUp" && direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            if(event.key === "ArrowDown" && direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            if(event.key === "ArrowLeft" && direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            if(event.key === "ArrowRight" && direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
        });

        const gameTimer = setInterval(movesnake, 200);

