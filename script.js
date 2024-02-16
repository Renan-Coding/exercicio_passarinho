// Definição das configurações iniciais do jogo
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  // Definição das cenas do jogo
  scene: {
    preload: preload, // Função de pré-carregamento de recursos
    create: create, // Função de criação dos elementos do jogo
    update: update, // Função de atualização do jogo
  },
};

var game = new Phaser.Game(config); // Criação do objeto de jogo

var passarinho; // Declaração da variável passarinho
var vertical; // Declaração da variável vertical
var verticalDirection = -1;
var verticalSpeed = 3;
var passarinho_2;
var passarinho_3;

// Função de pré-carregamento de recursos
function preload() {
  this.load.image("sky", "assets/sky.png"); // Carregamento da imagem do céu

  // Carregamento do spritesheet do passarinho verde
  this.load.spritesheet("green", "assets/bird-green.png", {
    frameWidth: 75, //Largura
    frameHeight: 75, //Altura
  });

  // Carregamento do spritesheet do passarinho vermelho
  this.load.spritesheet("red", "assets/bird-red.png", {
    frameWidth: 75, //Largura
    frameHeight: 75, //Altura
  });

  // Carregamento do spritesheet do passarinho roxo
  this.load.spritesheet("purple", "assets/bird-purple.png", {
    frameWidth: 75, //Largura
    frameHeight: 75, //Altura
  });
}

// Função de criação dos elementos do jogo
function create() {
  this.add.image(450, 300, "sky").setScale(1.9); // Adição da imagem do céu

  passarinho_3 = this.add
    .sprite(300, 400, "purple")
    .setScale(1.6)
    .setFlip(true); // Criação do sprite do passarinho roxo
  passarinho_2 = this.add.sprite(600, 200, "red").setScale(0.8); // Criação do sprite do passarinho vermelho
  passarinho = this.add.sprite(100, 300, "green").setScale(1.3); // Criação do sprite do passarinho verde

  // Criação da animação de voo do passarinho verde
  this.anims.create({
    key: "fly", // Nome da animação
    frames: this.anims.generateFrameNumbers("green", { start: 0, end: 7 }), // Quadros da animação
    frameRate: 10, // Taxa de quadros
    repeat: -1, // Repetição infinita
  });

  passarinho.anims.play("fly", true); // Início da reprodução da animação de voo do passarinho verde

  // Criação da animação de voo do passarinho vermelho
  this.anims.create({
    key: "fly_2", // Nome da animação
    frames: this.anims.generateFrameNumbers("red", { start: 0, end: 7 }), // Quadros da animação
    frameRate: 10, // Taxa de quadros
    repeat: -1, // Repetição infinita
  });

  passarinho_2.anims.play("fly_2", true); // Início da reprodução da animação de voo do passarinho vermelho

  // Criação da animação de voo do passarinho roxo
  this.anims.create({
    key: "fly_3", // Nome da animação
    frames: this.anims.generateFrameNumbers("purple", { start: 0, end: 7 }), // Quadros da animação
    frameRate: 10, // Taxa de quadros
    repeat: -1, // Repetição infinita
  });

  passarinho_3.anims.play("fly_3", true); // Início da reprodução da animação de voo do passarinho roxo
}

// Função de atualização do jogo
function update() {
  // Atualiza a posição do passarinho de acordo com as condições estabelecidas.

  // Verifica se a posição x do passarinho é maior que 100
  if (passarinho.x === 100) {
    passarinho.setFlip(false, false); // Inverte a orientação do sprite horizontalmente
    passarinho.ida = true; // Define a variável "ida" como true
  }

  // Verifica se a posição x do passarinho é menor que 700 e se a variável "ida" é true
  if (passarinho.x < 700 && passarinho.ida === true) {
    console.log(
      "O passarinho está indo para a direita até a posição 700, onde irá mudar de direção."
    );
    passarinho.x += 5; // Aumenta a posição x do passarinho em 5 unidades
  }

  if (passarinho.x === 700) {
    passarinho.setFlip(true, false); // Inverte a orientação do sprite horizontalmente
    passarinho.ida = false; // Define a variável "ida" como false
  }

  if (passarinho.x > 100 && passarinho.ida === false) {
    console.log(
      "O passarinho está voltando para a esquerda até a posição 100, onde muda de direção."
    );
    passarinho.x -= 5; // Diminui a posição x do passarinho em 5 unidades
  }

  for (let i = 0; i < 200; i++) {
    passarinho.y += verticalDirection * verticalSpeed;

    if (passarinho.y <= 100 || passarinho.y >= 400) {
      // Se o passarinho atingir os limites superior ou inferior da tela, inverte a direção vertical
      console.log(
        "O passarinho atinge o limite superior ou inferior da tela e muda sua direção."
      );
      verticalDirection *= -1;
    }
  }
}
