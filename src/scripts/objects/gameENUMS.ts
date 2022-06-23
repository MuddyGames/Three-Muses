export enum GSM {
    PLAY = 'play',
    LEVEL_COMPLETE = 'level_complete',
    GAME_COMPLETE = 'game_complete'
}

export enum RECORD{
    TIME = 1000000
}

// Used for local storage keys
//export enum LEVEL_DATA_KEY{
//    CURRENT = 'level_current',
//    NEXT = 'level_next',
//    CURRENT_ARTIFACT = 'artifact_current',
 //   NEXT_ARTIFACT = 'artifact_next'
//}

export enum LEVELS{
    LEVEL_01 = 'LEVEL_01',
    LEVEL_02 = 'LEVEL_02',
    LEVEL_03 = 'LEVEL_03',
    LEVEL_04 = 'LEVEL_04',
    CREDITS = 'Credits'
}

export enum ARTIFACTS{
    ArtiFactOneScene = 'ArtiFactOneScene',
    ArtiFactTwoScene = 'ArtiFactTwoScene',
    ArtiFactThreeScene = 'ArtiFactThreeScene',
    ArtiFactFourScene = 'ArtiFactFourScene',
    CREDITS = 'Credits'
}

export enum POINTS{
    CANNON_BALL_COLLISION = -150,
    DIVER_COLLISION = -150,
    FRUIT_0 = 250,
    FRUIT_1 = 300,
    FRUIT_2 = 350,
    REACHED_GOAL = 1500
}

export enum ANIMATION_DELAY{
    FRUIT = 480,
    RECORD = 200
}

export enum NEXT_LEVEL{
    DELAY = 3000 //Delay until next level
}

export enum GOAL {
    TILE = 551 // Tile ID on level json
};

export enum RIVER {
    TILE = 214 // Tile ID on level json
};

export enum FRUITS {
    ORANGE = 0,
    ORANGE_TILE = 555, // Tile ID on level json
    LEMON = 1,
    LEMON_TILE = 503, // Tile ID on level json
    GRAPE = 2,
    GRAPE_TILE = 607 // Tile ID on level json
};

export enum DIVER {
    START = 500,
    END = 552,
    SPEED = 0.5,
    SCALE = 0.2,
    PUSH_SPEED = 1
}

export enum DIVER_ANIM {
    WALK_DOWN = 'walk_front',
    WALK_UP = 'walk_back',
    PUSH = 'attack'
}

export enum BRIDGE {
    scaleX = 1,
    scaleY = 1,
    OFFSETX = -96,
    OFFSETY = 0,
    PLACE = 553,
    WALKWAY = 396
}

export enum BRIDGE_ANIMS {
    TRANSITIONING = 'opening',
    OPEN = 'open'
}

export enum TILE{
    SIZE = 32
}

export enum DPAD{
    X_TILES = 35.5,
    Y_TILES = 18,
    SCALE = 1.45
}

export enum DPAD_ANIMS {
    IDLE = "idle",
    UP = "up",
    UP_LEFT = "up_left",
    UP_RIGHT = "up_right",
    DOWN = "down",
    DOWN_LEFT = "down_left",
    DOWN_RIGHT = "down_right",
    LEFT = "left",
    RIGHT = "right"
}