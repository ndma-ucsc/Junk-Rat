class Option extends Phaser.Scene {
    constructor() {
        super("optionScene");
    }

    create() {
        this.scene.bringToTop("optionScene");
        
        let optionTextConfig = {
            fontFamily: 'Bradley Hand',
            fontSize: '55px',
            color: '#0D7DB0',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        };

        this.optionText = this.add.text(game.config.width/2, 60, 'Options', {fontSize: "50px"}).setOrigin(0.5);

        this.volume = this.add.text(game.config.width/6, 1*game.config.height/5, 'VOLUME', {fontSize: "50px"}).setOrigin(0,0.5);
        this.volumeText = this.add.text(5*game.config.width/6, 1*game.config.height/5, volPt * maxVolume , optionTextConfig).setOrigin(1,0.5);

        this.sfx = this.add.text(game.config.width/6, 2*game.config.height/5, 'SFX', {fontSize: "50px"}).setOrigin(0,0.5);
        this.sfxText = this.add.text(5*game.config.width/6, 2*game.config.height/5, sfxPt * maxVolume , optionTextConfig).setOrigin(1,0.5);

        this.fullscreen = this.add.text(game.config.width/6, 3*game.config.height/5, 'FULLSCREEN', {fontSize: "50px"}).setOrigin(0,0.5);
        this.fullscreenText = this.add.text(5*game.config.width/6, 3*game.config.height/5, `${this.scale.isFullscreen ? ' ✔' : '  ❌'}`, optionTextConfig).setOrigin(1,0.5);

        this.return = this.add.text(game.config.width/2, 4*game.config.height/5, 'Back', {fontSize: "50px"}).setOrigin(0.5);

        cursors = this.input.keyboard.createCursorKeys();
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.selected = 1;
    }

    update(){
        if(this.input.keyboard.checkDown(cursors.up, 250)) {
            if(this.selected > 1) {
                this.selected--;
            }
            else {
                this.selected = 4;
            }
        }
        else if(this.input.keyboard.checkDown(cursors.down, 250)){
            if(this.selected < 4) {
                this.selected++;
            }
            else {
                this.selected = 1;
            }
        }

        if(this.selected == 1) {
            this.volume.setTint(0xABFFA6).setScale(1.3);
            this.sfx.setTint().setScale();
            this.fullscreen.setTint().setScale();
            this.return.setTint().setScale();
        }
        else if(this.selected == 2) {
            this.volume.setTint().setScale();
            this.sfx.setTint(0xABFFA6).setScale(1.3);
            this.fullscreen.setTint().setScale();
            this.return.setTint().setScale();
        }

        else if(this.selected == 3) {
            this.volume.setTint().setScale();
            this.sfx.setTint().setScale();
            this.fullscreen.setTint(0xABFFA6).setScale(1.3);
            this.return.setTint().setScale();
        }
        
        else if(this.selected == 4) {
            this.volume.setTint().setScale();
            this.sfx.setTint().setScale();
            this.fullscreen.setTint().setScale();
            this.return.setTint(0xABFFA6).setScale(1.3);
        }
        
        if(this.selected == 1){
            if(this.input.keyboard.checkDown(cursors.left, 100) && volPt > 0){
                bgMusic.volume = --volPt / maxVolume;
            }
            else if(this.input.keyboard.checkDown(cursors.right, 100) && volPt < maxVolume){
                bgMusic.volume = ++volPt / maxVolume;
            }
            
        }

        else if(this.selected == 2){
            if(this.input.keyboard.checkDown(cursors.left, 100) && sfxPt > 0){
                --sfxPt;
                if(sfxPt % 10 == 0)
                {
                    console.log(sfxPt);
                    this.sound.play(Phaser.Utils.Array.GetRandom(['jump', 'pauseOn', 'pauseOff', 'land', 'wall', 'death', 'ricochet', 'laser']), {volume: sfxPt / maxVolume});
                }
            }
            else if(this.input.keyboard.checkDown(cursors.right, 100) && sfxPt < maxVolume){
                ++sfxPt;
                if(sfxPt % 10 == 0)
                {
                    console.log(sfxPt);
                    this.sound.play(Phaser.Utils.Array.GetRandom(['jump', 'pauseOn', 'pauseOff', 'land', 'wall', 'death', 'ricochet', 'laser']), {volume: sfxPt / maxVolume});
                }
            }
        }

        else if(this.selected == 3){
            if(Phaser.Input.Keyboard.JustDown(keyENTER)){
                this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen();
            }
        }
        else if(this.selected == 4){
            if(Phaser.Input.Keyboard.JustDown(keyENTER)){
                this.add.tween({
                    targets: this.cameras.main,
                    alpha: 0,
                    ease: 'Linear',
                    duration: 500
                });
                this.time.delayedCall(500,() => {
                    this.scene.stop("playScene");
                    this.scene.start("menuScene");
                    this.scene.stop();
                });
            }
        }
        this.volumeText.text = `${volPt}`;
        this.sfxText.text = `${sfxPt}`;
        this.fullscreenText.text = `${this.scale.isFullscreen ? '✔' : '❌'}`;
    } // end of update
}