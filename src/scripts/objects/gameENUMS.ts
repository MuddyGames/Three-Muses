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
    TILE = 618 // Tile ID on level json
};

export enum FRUITS {
    ORANGE = 0,
    ORANGE_TILE = 707, // Tile ID on level json
    LEMON = 1,
    LEMON_TILE = 655, // Tile ID on level json
    GRAPE = 2,
    GRAPE_TILE = 603 // Tile ID on level json
};

export enum DIVER {
    START = 600,
    END = 652,
    SPEED = 0.5,
    SCALE = 0.2
}

export enum DIVER_ANIM {
    WALK_DOWN = 'walk_front',
    WALK_UP = 'walk_back'
}