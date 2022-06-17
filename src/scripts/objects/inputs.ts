export enum INPUT_TYPES {
    IDLE = 'idle',
        WALK_RIGHT = 'run_right',
        WALK_LEFT = 'run_left',
        WALK_UP = 'run_up',
        WALK_DOWN = 'run_down',
        UNDER_ATTACK = 'four_transition', // TODO: Need Animation under_attack
        EATING_RIGHT = 'four_transition', // TODO: Need Animation four_transition_eating_right
        EATING_LEFT = 'four_transition', // TODO: Need Animation four_transition_eating_left
        EATING_UP = 'four_transition', // TODO: Need Animation four_transition_eating_up
        EATING_DOWN = 'four_transition', // TODO: Need Animation four_transition_eating_up
        MUNCHING_LEFT = 'walk_four_left', // TODO: Need Animation munching_left
        MUNCHING_RIGHT = 'walk_four_left', // TODO: Need Animation munching_right
        MUNCHING_UP = 'walk_four_left', // TODO: Need Animation munching_up
        MUNCHING_DOWN = 'walk_four_left', // TODO: Need Animation munching_down
        EXPIRED = 'walk_four_left', // TODO: Need Animation expired 
        REVIVE = 'revive', // TODO: make a copy of idle of make a new one
        REVIVED = 'revived', // TODO: make a copy of idle of make a new one
        SPLASH = 'revived' // TODO: make a copy of idle of make a new one
}