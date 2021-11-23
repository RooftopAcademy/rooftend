import { IsString } from 'class-validator';


export class createBrandDTO{
    @IsString()
    name: string;

    @IsString()
    photoId: string;
}