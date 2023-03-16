class Level {
    enemies;
    clouds;
    backgriundObjects;
    level_end_x = 700;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;

    }
}