export interface TournamentInfo {
    id: string
    name: string
}

export interface Tournament {
    name: string
    values: TournamentValue[]
}

export interface TournamentValue {
    id: string
    name: string
    type: "input" | "calculated"
    isResult: boolean
    formula?: string
}
