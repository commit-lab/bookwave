import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

export const Author = createParamDecorator<string>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ author: Record<string, unknown> }>();
    const author = request.author;
    return data ? author[data] : author;
  }
);
