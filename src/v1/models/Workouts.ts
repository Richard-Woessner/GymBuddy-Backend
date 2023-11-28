export interface GetWorkoutsResponse {
    User: string;
    Workouts: Workout[];
}

interface Workout {
    Name: string;
    Exercises: Exercise[];
}

interface Exercise {
    Exercise: string;
    Sets: Set[];
    Type: string;
}

interface Set {
    Weight: number;
    Reps: number;
    SetNumber: number;
}
