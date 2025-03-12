import { Controller, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user/:id')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/next-lesson')
  nextLesson(@Param('id') id: string) {
    return this.userService.nextLesson(id)
    
  }
}
