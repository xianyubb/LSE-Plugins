import ws from 'ws';
import ReconnectingWebSocket, {
  UrlProvider,
  Event
} from "reconnecting-websocket";

export class WebSocket {
  private socket: ReconnectingWebSocket
  
  public onopen: null | ((event: Event) => void);
  public onmessage: null | ((msg: any) => void)

  constructor(url: UrlProvider, maxRetries: number) {
    this.socket = new ReconnectingWebSocket(url, [], {
      WebSocket: ws,
      maxRetries: maxRetries
    });

    this.onopen = null;
    this.onmessage = null;

    this.socket.onopen = this.onopen
    this.socket.onmessage = (event) => {
      if(this.onmessage) {
        try {
          this.onmessage(JSON.parse(event.data))
        } catch (error) {
          this.onmessage(event.data)
        }
      }
    }
  }

  send(data: any) {
    this.socket.send(JSON.stringify(data));
  }
}