interface TournamentInfo {
  id: string;
  name: string;
}

interface Tournament {
  name: string;
  values: TournamentValue[];
}

interface TournamentValue {
  id: string;
  name: string;
  type: "input" | "calculated";
  formula?: string;
}
