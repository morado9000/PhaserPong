winScore = 5;
var mainState = {
	preload: function(){
		game.load.image('player','/assets/images/paddle.png');
		game.load.image('ball','/assets/images/ball.png');
	},

	create: function(){
		game.stage.backgroundColor = '#000000';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.p1 = game.add.sprite(50, game.world.centerY-75,'player');
		this.p2 = game.add.sprite(game.world.width-50, game.world.centerY-75,'player');
		this.ball = game.add.sprite(game.world.centerX, game.world.centerY,'ball');
		this.p1Score = 0;
		this.p2Score = 0;
		game.physics.arcade.enable(this.p1);
		game.physics.arcade.enable(this.p2);
		game.physics.arcade.enable(this.ball);
		this.ball.body.collideWorldBounds = true;
		this.ball.body.bounce.set(1,1);
		this.ball.body.velocity.setTo(200,200)
		this.p1.body.immovable = true;
		this.p2.body.immovable = true;
		this.labelP1Score = game.add.text(200, 20, "0", {font: "30px Arial", fill: '#ffffff'});
		this.labelP2Score = game.add.text(600, 20, "0", {font: "30px Arial", fill: '#ffffff'});
		this.winLabel = game.add.text(game.world.centerX, game.world.centerY, "Player X Wins", {font: '30px Arial', fill: '#ffffff'});
		this.winLabel.anchor.setTo(0.5, 0.5);
		this.winLabel.visible = false;
	},

	update: function(){
	    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
	    {
	        this.p1.y -= 5;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
	    {
	        this.p1.y += 5;
	    }
	    game.physics.arcade.collide(this.p1, this.ball);
	    game.physics.arcade.collide(this.p2, this.ball);
	    if(this.ball.body.velocity.x > 0)
	    	this.ball.body.velocity.setTo(this.ball.body.velocity.x+1, this.ball.body.velocity.y+1);
	    else
	    	this.ball.body.velocity.setTo(this.ball.body.velocity.x-1, this.ball.body.velocity.y-1);
	    this.enemyAI();
	    this.checkGameScore();
	},
	checkGameScore: function(){
		if(this.ball.x <= 0){
			this.p2Score += 1;
			if(this.p2Score >= winScore){
				this.ball.kill();
				this.winLabel.text = "Player 2 Wins";
				this.winLabel.visible = true;
				game.input.onTap.addOnce(function(){
					game.state.start('title');
				})
			}
			this.labelP2Score.text = this.p2Score;
			this.ball.x = game.world.centerX;
			this.ball.y = game.world.centerY;
			this.ball.body.velocity.setTo(200,200);
		}
		else if(this.ball.x+this.ball.width >= game.world.width){
			this.p1Score += 1;
			if(this.p1Score >= winScore){
				this.ball.kill();
				this.winLabel.text = "Player 1 Wins";
				this.winLabel.visible = true;
				game.input.onTap.addOnce(function(){
					game.state.start('title');
				})
			}
			this.labelP1Score.text = this.p1Score;
			this.ball.x = game.world.centerX;
			this.ball.y = game.world.centerY;
			this.ball.body.velocity.setTo(200,200)
		}
	},

	enemyAI: function(){
		if(this.ball.y< this.p2.y){
			this.p2.y -= 5;
		}
		else if(this.ball.y > this.p2.y+this.p2.height-10){
			this.p2.y += 5;
		}
	},
}

var multiState = {
	preload: function(){
		game.load.image('player','/assets/images/paddle.png');
		game.load.image('ball','/assets/images/ball.png');
	},

	create: function(){
		game.stage.backgroundColor = '#000000';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.p1 = game.add.sprite(50, game.world.centerY-75,'player');
		this.p2 = game.add.sprite(game.world.width-50, game.world.centerY-75,'player');
		this.ball = game.add.sprite(game.world.centerX, game.world.centerY,'ball');
		this.p1Score = 0;
		this.p2Score = 0;
		game.physics.arcade.enable(this.p1);
		game.physics.arcade.enable(this.p2);
		game.physics.arcade.enable(this.ball);
		this.ball.body.collideWorldBounds = true;
		this.ball.body.bounce.set(1);
		this.ball.body.velocity.setTo(200,200)
		this.p1.body.immovable = true;
		this.p2.body.immovable = true;
		this.labelP1Score = game.add.text(200, 20, "0", {font: "30px Arial", fill: '#ffffff'});
		this.labelP2Score = game.add.text(600, 20, "0", {font: "30px Arial", fill: '#ffffff'});
		this.winLabel = game.add.text(game.world.centerX, game.world.centerY, "Player X Wins", {font: '30px Arial', fill: '#ffffff'});
		this.winLabel.anchor.setTo(0.5, 0.5);
		this.winLabel.visible = false;
	},

	update: function(){
	    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
	    {
	        this.p1.y -= 5;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
	    {
	        this.p1.y += 5;
	    }
	    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
	    {
	        this.p2.y -= 5;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
	    {
	        this.p2.y += 5;
	    }
	    game.physics.arcade.collide(this.p1, this.ball);
	    game.physics.arcade.collide(this.p2, this.ball);
	    if(this.ball.body.velocity.x > 0)
	    	this.ball.body.velocity.setTo(this.ball.body.velocity.x+1, this.ball.body.velocity.y+1);
	    else
	    	this.ball.body.velocity.setTo(this.ball.body.velocity.x-1, this.ball.body.velocity.y-1);
	    this.checkGameScore();
	},
	checkGameScore: function(){
		if(this.ball.x <= 0){
			this.p2Score += 1;
			if(this.p2Score >= winScore){
				this.ball.kill();
				this.winLabel.text = "Player 2 Wins";
				this.winLabel.visible = true;
				game.input.onTap.addOnce(function(){
					game.state.start('title');
				})
			}
			this.labelP2Score.text = this.p2Score;
			this.ball.x = game.world.centerX;
			this.ball.y = game.world.centerY;
			this.ball.body.velocity.setTo(200,200);
		}
		else if(this.ball.x+this.ball.width >= game.world.width){
			this.p1Score += 1;
			if(this.p1Score >= winScore){
				this.ball.kill();
				this.winLabel.text = "Player 1 Wins";
				this.winLabel.visible = true;
				game.input.onTap.addOnce(function(){
					game.state.start('title');
				})
			}
			this.labelP1Score.text = this.p1Score;
			this.ball.x = game.world.centerX;
			this.ball.y = game.world.centerY;
			this.ball.body.velocity.setTo(200,200)
		}
	},
}

var titleState = {
	preload: function(){
		game.stage.backgroundColor = '#000000';
	},

	create: function(){
		this.labelTitle = game.add.text(game.world.centerX, game.world.centerY, "Pong", {font: '30px Arial', fill: '#ffffff'});
		this.labelTitle.anchor.setTo(0.5, 0.5);
		this.labelTitle = game.add.text(game.world.centerX, game.world.centerY+50, "Play", {font: '30px Arial', fill: '#ffffff'});
		this.labelTitle.anchor.setTo(0.5, 0.5);
		this.labelTitle.inputEnabled = true;
		this.labelTitle.events.onInputDown.add(function(){
			game.state.start('choice');
		}, this);
		this.labelTitle = game.add.text(game.world.centerX, game.world.centerY+100, "Options", {font: '30px Arial', fill: '#ffffff'});
		this.labelTitle.anchor.setTo(0.5, 0.5);
		this.labelTitle.inputEnabled = true;
		this.labelTitle.events.onInputDown.add(function(){
			game.state.start('options');
		}, this);
		var spaceKey = game.input.keyboard.addKey(
			Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(function(){
			game.state.start('main');
		}, this);
	},

	update: function(){

	},
}

var optionState = {
	preload: function(){
		game.load.image('up', '/assets/images/up.png');
		game.load.image('down', '/assets/images/down.png');
	},
	create: function(){
		this.labelTitle = game.add.text(game.world.centerX, game.world.centerY, "Score to Win: " + winScore, {font: '30px Arial', fill: '#ffffff'});
		this.labelTitle.anchor.setTo(0.5,0.5);
		this.upButton = game.add.sprite(game.world.centerX+80, game.world.centerY-55, 'up');
		this.upButton.inputEnabled = true;
		this.downButton = game.add.sprite(game.world.centerX+80, game.world.centerY+20, 'down');
		this.downButton.inputEnabled = true;
		this.upButton.events.onInputDown.add(function(){
			winScore += 1;
			this.labelTitle.text = "Score to Win: " + winScore;
		}, this);
		this.downButton.events.onInputDown.add(function(){
			winScore -= 1;
			this.labelTitle.text = "Score to Win: " + winScore;
		}, this);
		this.labelReturn = game.add.text(game.world.centerX, game.world.centerY+75, "Return", {font: '30px Arial', fill: '#ffffff'});
		this.labelReturn.anchor.setTo(0.5,0.5);
		this.labelReturn.inputEnabled = true;
		this.labelReturn.events.onInputDown.add(function(){
			game.state.start('title');
		},this);
	},

	update: function(){

	},
}

var choiceState = {
	preload: function(){

	},

	create: function(){
		this.labelSingle = game.add.text(game.world.centerX, game.world.centerY-30, "Single Player", {font:'30px Arial', fill: '#ffffff'});
		this.labelSingle.anchor.setTo(0.5,0.5);
		this.labelSingle.inputEnabled = true;
		this.labelMulti = game.add.text(game.world.centerX, game.world.centerY+30, "MultiPlayer", {font:'30px Arial', fill: '#ffffff'});
		this.labelMulti.anchor.setTo(0.5,0.5);
		this.labelMulti.inputEnabled = true;

		this.labelSingle.events.onInputDown.add(function(){
			game.state.start('main');
		},this);
		this.labelMulti.events.onInputDown.add(function(){
			game.state.start('multi')
		},this);
	},

	update: function(){

	},
}

game = new Phaser.Game(800, 600);
game.state.add('main', mainState);
game.state.add('multi', multiState);
game.state.add('title', titleState);
game.state.add('choice', choiceState);
game.state.add('options',optionState);
game.state.start('title');