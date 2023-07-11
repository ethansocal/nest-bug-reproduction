export interface Player {
    id: string
    status?: "CheckedIn" | "Scratched" | "Absent"
    name: string
    club1: string
    clubNames: string
    div?: string
    country: string
    weaponRating: string
    weaponRatingSort: number
    rankSort: number
    search: string
}
