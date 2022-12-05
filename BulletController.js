import Bullet from "./Bullet.js";
export default class BulletController {
    bullets = [];
    gapTillNext = 0;

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("assets/sounds/shoot.wav");
        this.shootSound.volume = 0.5;
    }

    shoot(x, y, velocity, gapTillNext = 0){
        if(this.gapTillNext <= 0 && 
            this.bullets.length < this.maxBulletsAtATime) {
                const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
                this.bullets.push(bullet);
                if(this.soundEnabled){
                    this.shootSound.currentTime = 0;
                    this.shootSound.play();
                }
                this.gapTillNext = gapTillNext;
            }
    }

    draw(ctx){
        this.bullets = this.bullets.filter(bullet => bullet.y + bullet.width > 0 
            && bullet.y <= this.canvas.height)
        this.bullets.forEach(bullet=>bullet.draw(ctx));
        if(this.gapTillNext > 0){
            this.gapTillNext --;
        }
    }

    collideWith(sprite){
        const bulletHitSpriteIndex = this.bullets.findIndex((bullet) => bullet.collideWith(sprite));
        if(bulletHitSpriteIndex >= 0){
            this.bullets.splice(bulletHitSpriteIndex, 1);
            return true;
        }
        return false;
    }
}