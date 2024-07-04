import { Injectable, type NestMiddleware } from "@nestjs/common";
import { type Request, type Response, type NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";
import { logErrorAndMaybeThrowInternalServerError } from "@/common/exception";
import { AuthorService } from "../author/author.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authorService: AuthorService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const firebaseToken = this.extractTokenFromHeader(req);
    if (!firebaseToken) {
      throw new Error("No auth token on request.");
    }
    getAuth()
      .verifyIdToken(firebaseToken)
      .then((decodedTokenId) => decodedTokenId.uid)
      .then((uid) => {
        req.firebaseUid = uid;
        return this.authorService.findByFirebaseUid(uid);
      })
      .then((author) => {
        if (author) {
          req.author = author;
        }
        next();
      })
      .catch((err: unknown) => {
        logErrorAndMaybeThrowInternalServerError(
          err,
          "Auth Token failed decoding."
        );
      });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
