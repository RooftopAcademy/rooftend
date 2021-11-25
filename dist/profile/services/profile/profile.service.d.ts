import { Repository } from 'typeorm';
import { Profile } from '../../profile.entity';
export declare class ProfileService {
    private repository;
    constructor(repository: Repository<Profile>);
    all(): Promise<Profile[]>;
    find(id: string | number): Promise<Profile>;
}
