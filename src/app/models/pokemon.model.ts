export interface Pokemon {
    name: string;
    url: string;
    id: number;
    stats?: Stat[];
    sprites?: {
        front_default: string;
    }
}

interface Stat {
    base_stat: number;
    stat: {
        name: string;
        url: string;
    }
}
