import { Global, Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Global()
@Module({
  providers: [UtilsService, SocketGateway],
  exports: [UtilsService]
})
export class UtilsModule {}