import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ 
  cors: {
    origin: '*',
  }
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('review-message')
  handleMessage(@MessageBody() payload: {message: string, id: string, sender: string}): void {
    console.log(payload);
    
    this.server.emit('review-message-' + payload.id, payload.message, payload.sender);
  }
  
  notifyUser(userId: string, notification: any) {
    this.server.emit('receive-notification-' + userId, notification);
  }
}
