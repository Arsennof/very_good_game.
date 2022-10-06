class Game {
    constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("reset");
      this.blastKey = false;
      this.leftKeyActive = false;
    }
    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }

      start() {
        player = new Player();
        playerCount = player.getCount();
    
        form = new Form();
        form.display();
    
        player1 = createSprite(width / 2 - 50, height - 100);
        player1.addImage("player1", player1_img);
        player1.scale = 0.07;
    
        

        player2 = createSprite(width / 2 + 100, height - 100);
        player2.addImage("player2", player2_img);
        player2.scale = 0.07;

        
    
        players = [player1, player2];

        obstacles = new Group();

           obstaclesPositions = [
            { x:500  , y:500 , image: stoneImg },
            { x:200  , y:200 , image: treeImg },
            { x:200  , y:500 , image: stoneImg },
            { x:123  , y:540 , image: bushImg },
            { x:432  , y:678 , image: treeImg },
            { x:543  , y:876 , image: bushImg },
            { x:194  , y:402 , image: stoneImg },
            { x:295  , y:396 , image: bushImg },
            { x:362  , y:63 , image: treeImg },

            { x:900  , y:500 , image: stoneImg },
            { x:786  , y:200 , image: treeImg },
            { x:954  , y:500 , image: stoneImg },
            { x:756  , y:540 , image: bushImg },
            { x:645  , y:678 , image: treeImg },
            { x:912  , y:876 , image: bushImg },
            { x:534  , y:402 , image: stoneImg },
            { x:867  , y:396 , image: bushImg },
            { x:234  , y:63 , image: treeImg },
          ];
         //stoneImg  bushImg treeImg
         this.addSprites(
          obstacles,
          obstaclesPositions.length,
          treeImg,
          0.3,
          obstaclesPositions
        );
  
      }
      
      play() {
        this.handleResetButton();
        form.hide()
        image(back_Ground,0,0,1000,1000)
        Player.getPlayersInfo();
        this.resetButton.show()
    
        if (allPlayers !== undefined) {
          
    
          this.showLife();
          //this.handleObstacleCollision(index)
          this.handlePlayerCollision(index)
         

          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
            var life = allPlayers[plr].life;
            if (life<=0) {
              players[index-1].changeImage("blast.png")
              players[index-1].scale = 1.1;
              
            }
            players[index - 1].position.x = x;
            players[index - 1].position.y = y;
    
            if (index === player.index) {
              if (player.life<=0) {
                this.blastKey = true;
              }
              
              
              /*this.handleObstacleCollision(index);
              this.handlePlayerCollision(index);*/
        
              // Changing camera position in y direction
              
              camera.position.x = players[index - 1].position.x;
              camera.position.y = players[index - 1].position.y;
            }
          }
    
          
          // handling keyboard events
          this.handlePlayerControls();
    
          
          
          drawSprites();

          
        }
      }
      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
          });
          window.location.reload();
        });
      }
      showLife() {
        push();
        image(lifeImage, player.positionX - 750, height - player.positionY + 300, 20, 20);
        fill("white");
        rect(player.positionX - 700, height - player.positionY + 300, 100, 20);
        fill("#f50057");
        rect(player.positionX - 700, height - player.positionY + 300, player.life, 20);
        noStroke();
        pop();
      }
      
      handlePlayerControls() {
        if (!this.blastKey) {
          
        
        if (keyIsDown(UP_ARROW)) {
          leftKeyActive = true
          player.positionY += 10;
          player.update();
          
        }
        if (keyIsDown(DOWN_ARROW)) {
          leftKeyActive = true
          player.positionY -= 10;
          player.update();
         
        }
        if (keyIsDown(LEFT_ARROW)) {
          leftKeyActive = true
          player.positionX -= 10;
          player.update();
        
        }
    
        if (keyIsDown(RIGHT_ARROW)) {
          leftKeyActive = true
          player.positionX += 10;
          player.update();
          
        }
        if (keyDown("space")) {
          this.handlePlayerShooting(index)
        }
      }
      
      }
      /*handleObstacleCollision(index) {
        if (players[index - 1].collide(obstacles)) {
          if (this.leftKeyActive) {
            player.positionX += 1;
          } else {
            player.positionX -= 1;
          }
    
          
    
          player.update();
        }
      }*/
      handlePlayerShooting(index){
      
          bullet=createSprite(player[index-1].x,player[index-1].y,2,4)
          bullet.velocityX = -5
          bullet.velocityY = 1


      }

      handlePlayerCollision(index){
        if (index===1) {
          if (players[index-1].collide(players[1])) {
           
           //this.blastKey=true
            console.log("things")
          }
          player.update()
        }
        if (index===2) {
          if (players[index-1].collide(players[0])) {
           //this.blastKey=true
           console.log("things")
          }
          player.update()
        }
        
      }

      gameOver() {
        swal({
          title: `Game Over`,
          text: "Oops you lost the race....!!!",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      }
      addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
        for (var i = 0; i < numberOfSprites; i++) {
          var x, y;
    
          //C41 //SA
          if (positions.length > 0) {
            x = positions[i].x;
            y = positions[i].y;
            spriteImage = positions[i].image;
          } else {
            x = random(width / 2 + 150, width / 2 - 150);
            y = random(-height * 4.5, height - 400);
          }
          var sprite = createSprite(x, y);
          sprite.addImage("sprite", spriteImage);
    
          sprite.scale = scale;
          spriteGroup.add(sprite);
        }
      }
    }
  

    
