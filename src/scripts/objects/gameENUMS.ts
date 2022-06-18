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
    LEVEL_01 = 'level_01',
    LEVEL_02 = 'level_02',
    LEVEL_03 = 'level_03',
    LEVEL_04 = 'level_04',
    CREDITS = 'credits'
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
    ORANGE_TILE = 674, // Tile ID on level json
    LEMON = 1,
    LEMON_TILE = 570, // Tile ID on level json
    GRAPE = 2,
    GRAPE_TILE = 622 // Tile ID on level json
};

export enum DIVER_TILES {
    START = 567,
    END = 619,
    SPEED = 0.5
}