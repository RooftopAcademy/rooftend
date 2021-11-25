import { Request } from 'express';
import { ProfileService } from '../services/profile/profile.service';
export declare class ProfilesController {
    private readonly service;
    constructor(service: ProfileService);
    index(req: Request): Promise<import("../profile.entity").Profile[]>;
    find(id: any, res: any): void;
    edit(body: any, res: any): void;
    delete(id: any, res: any): void;
    create(body: any, res: any): void;
}
