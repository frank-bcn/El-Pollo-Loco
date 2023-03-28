class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 1520;

    constructor(enemies, clouds, backgroundObjects, bottle , coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottle = bottle;
        this.coin = coin;
    }
}