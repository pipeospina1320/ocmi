export class getUserDto {
  token: string;
}

export interface GetUserResponse {
  user: {
    email: string;
    name: string;
  };
}
