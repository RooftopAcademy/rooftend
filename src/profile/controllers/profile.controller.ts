import { Controller, Get } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
    @Get()
    public index() {
        return 'profiles controller';
    }
};
