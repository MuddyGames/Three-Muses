export enum GSM {
    PLAY = 'play',
    LEVEL_COMPLETE = 'level_complete',
    GAME_COMPLETE = 'game_complete'
};

// Used for local storage keys
export enum LEVEL_DATA_KEY{
    CURRENT = 'level_current',
    NEXT = 'level_next',
    CURRENT_ARTIFACT = 'artifact_current',
    NEXT_ARTIFACT = 'artifact_next'
}

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

export enum GOAL {
    TILE = 551 // Tile ID on level json
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
    OFFSETY = 0
}

export enum BRIDGE_ANIMS {
    TRANSITIONING = 'opening',
    OPEN = 'open'
}