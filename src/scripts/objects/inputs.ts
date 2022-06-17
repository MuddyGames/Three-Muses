export enum INPUT_TYPES {
    IDLE = 'idle',
        WALK_RIGHT = 'walk_right',
        WALK_LEFT = 'walk_left',
        WALK_UP = 'walk_up',
        WALK_DOWN = 'walk_down',
        UNDER_ATTACK = 'under_attack', // TODO: Need Animation under_attack
        EATING_RIGHT = 'eating_right', // TODO: Need Animation four_transition_eating_right
        EATING_LEFT = 'four_transition', // TODO: Need Animation four_transition_eating_left
        EATING_UP = 'eating_up', // TODO: Need Animation four_transition_eating_up
        EATING_DOWN = 'four_transition', // TODO: Need Animation four_transition_eating_up
        MUNCHING_LEFT = 'walk_four_left', // TODO: Need Animation munching_left
        MUNCHING_RIGHT = 'munching_down', // TODO: Need Animation munching_right
        MUNCHING_UP = 'walk_four_left', // TODO: Need Animation munching_up
        MUNCHING_DOWN = 'munching_down', // TODO: Need Animation munching_down
        EXPIRED = 'expired', // TODO: Need Animation expired 
        REVIVE = 'revive', // TODO: make a copy of idle of make a new one
        REVIVED = 'revived', // TODO: make a copy of idle of make a new one
        SPLASH = 'revived' // TODO: make a copy of idle of make a new one
}