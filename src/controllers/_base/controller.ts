import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export abstract class BaseController {
  protected ok<A>(req: Request, res: Response, result: A): void {
    this.sendSuccess(res, StatusCodes.OK, result);
  }

  protected created<A>(req: Request, res: Response, result: A): void {
    this.sendSuccess(res, StatusCodes.CREATED, result);
  }

  protected noContent(req: Request, res: Response): void {
    res.status(StatusCodes.NO_CONTENT).send();
  }

  protected badRequest(req: Request, res: Response, error: Error): void {
    this.sendError(req, res, StatusCodes.BAD_REQUEST, error);
  }

  protected notFound(req: Request, res: Response, error: Error): void {
    this.sendError(req, res, StatusCodes.NOT_FOUND, error);
  }

  protected internalServerError(
    req: Request,
    res: Response,
    error: Error
  ): void {
    this.sendError(req, res, StatusCodes.INTERNAL_SERVER_ERROR, error);
  }

  private sendSuccess<A>(res: Response, status: number, result: A): void {
    res.status(status).json(result);
  }

  private sendError(
    req: Request,
    res: Response,
    status: number,
    error: Error
  ): void {
    res.status(status).json({ error: error.message });
  }
}
