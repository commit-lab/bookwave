declare namespace Express {
  export interface Request {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- Need to add Author type to request
    author?: import("../author/interfaces/author").Author;
    firebaseUid?: string;
  }
}
