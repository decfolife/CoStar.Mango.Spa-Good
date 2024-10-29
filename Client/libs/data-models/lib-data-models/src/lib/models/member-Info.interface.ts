export interface MemberInfo {
  roles: Role[];
  levels: Level[];
}

interface Role {
  role: string;
}

interface Level {
  level: string;
  value: number;
}
