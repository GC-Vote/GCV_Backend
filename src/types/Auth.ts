import { Request } from "express";

import { UserEntity } from "@/entities";

export interface AuthRequest<Params, ResBody, ReqBody, ReqQuery>
extends Request<Params, ResBody, ReqBody, ReqQuery> {
    user: UserEntity
}