class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 1520;

    constructor(enemies, clouds, backgroundObjects, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottle = bottle;
    }
}