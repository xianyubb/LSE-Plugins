import * as uuid from 'uuid';
import { MessageSegment } from "./res/types";
import { WebSocket } from './res/connect';
import * as events from './res/events';
import parser, { ApiReturn } from './res/parser';
import { EventEmitter } from 'events';

interface Options{
  url: string,
  maxRetries: number
}

interface PrivateMessage {
  user_id: number,
  message: string | MessageSegment[],
  auto_escape: boolean
}

interface GroupMessage {
  group_id: number,
  message: string | MessageSegment[],
  auto_escape: boolean
}

interface DeleteMessage {
  message_id: number
}

interface getForwardMessage {
  id: string
}

interface SendLike {
  user_id: number,
  times: number
}

interface GroupKick {
  group_id: number,
  user_id: number,
  reject_add_request: boolean
}

interface GroupBan {
  group_id: number,
  user_id: number,
  duration: number
}

interface GroupAnonymousBan {
  group_id: number,
  flag: string,
  duration: number
}

interface GroupWholeBan {
  group_id: number,
  enable: boolean
}

interface SetGroupAdmin {
  group_id: number,
  user_id: number,
  enable: boolean
}

interface SetGroupAnonymous {
  group_id: number,
  enable: boolean
}

interface SetGroupCard {
  group_id: number,
  user_id: number,
  card: string
}

interface SetGroupName {
  group_id: number,
  group_name: string
}

interface LeaveGroup {
  group_id: number,
  is_dismiss: boolean
}

interface SetGroupSpecialTitle {
  group_id: number,
  user_id: number,
  special_title: string,
  duration: number
}

interface SetFriendAddRequest {
  flag: string,
  approve: boolean,
  remark: string
}

interface SetGroupAddRequest {
  flag: string,
  type: string,
  approve: boolean,
  reason: string
}

interface GetStrangerInfo {
  user_id: number
  no_cache: boolean
}

interface GetGroupInfo {
  group_id: number,
  no_cache: boolean
}

interface GetGroupMemberInfo {
  group_id: number,
  user_id: number,
  no_cache: boolean
}

interface GetGroupMemberList {
  group_id: number
}

interface GetGroupHonorInfo {
  group_id: number,
  type: string
}

interface GetRecord {
  file: string,
  out_format: string
}

interface GetImage {
  file: string
}

interface Restart {
  delay: number
}

interface GetCookies {
  domain: string
}

interface GetCredentials {
  domain: string
}

export class OneBot_WebSocket {
  private socket: WebSocket
  
  public SocketEvent: events.SocketEvent
  public BotEvent: events.BotEvent
  private EchoEvent: EventEmitter
  
  constructor(Options: Options) {
    this.socket = new WebSocket(Options.url, Options.maxRetries);
    this.SocketEvent = events.socket;
    this.BotEvent = events.bot;
    this.EchoEvent = events.echo;

    this.socket.onopen = (event) => {
      this.handleConnect();
    }

    this.socket.onmessage = (data) => {
      this.handleMessage(data);
    }
  }

  private handleConnect() {
    this.SocketEvent.emit('connect');
  }

  private handleMessage(message: any) {
    this.SocketEvent.emit('message', message);
    parser(message, (type: any, data: any) => {
      if(type === 'echo') events.echo.emit(data.uuid, data);
      this.BotEvent.emit(type, data)
    })
  }
  
  /**
   * @description 发送私聊消息
   */
  public send_private_msg(options: PrivateMessage): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "send_private_msg",
        params: options,
        echo: echo
      })
    })
  }

  /**
   * @description 发送群消息
   */
  public send_group_msg(options: GroupMessage): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "send_group_msg",
        params: options,
        echo: echo
      })
    })
  }

  /**
   * @description 撤回消息
   */
  public delete_msg(options: DeleteMessage): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "delete_msg",
        params: options,
        echo: echo
      })
    })
  }

  /**
   * @description 获取合并转发消息
   */
  public get_forward_msg(options: getForwardMessage): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_forward_msg",
        params: options,
        echo: echo
      })
    })
  }

  public send_like(options: SendLike): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "send_like",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_kick(options: GroupKick): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_kick",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_ban(options: GroupBan): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_ban",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_anonymous_ban(options: GroupAnonymousBan): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_anonymous_ban",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_whole_ban(options: GroupWholeBan): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_whole_ban",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_admin(options: SetGroupAdmin): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_admin",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_anonymous(options: SetGroupAnonymous): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_anonymous",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_card(options: SetGroupCard): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_card",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_name(options: SetGroupName): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_name",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_leave(options: LeaveGroup): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_leave",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_special_title(options: SetGroupSpecialTitle): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_special_title",
        params: options,
        echo: echo
      })
    })
  }

  public set_friend_add_request(options: SetFriendAddRequest): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_friend_add_request",
        params: options,
        echo: echo
      })
    })
  }

  public set_group_add_request(options: SetGroupAddRequest): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_group_add_request",
        params: options,
        echo: echo
      })
    })
  }

  public get_stranger_info(options: GetStrangerInfo): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_stranger_info",
        params: options,
        echo: echo
      })
    })
  }

  public get_group_info(options: GetGroupInfo): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_group_info",
        params: options,
        echo: echo
      })
    })
  }

  public get_group_member_info(options: GetGroupMemberInfo): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_group_member_info",
        params: options,
        echo: echo
      })
    })
  }

  public get_group_honor_info(options: GetGroupHonorInfo): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_group_honor_info",
        params: options,
        echo: echo
      })
    })
  }

  public get_cookies(options: GetCookies): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_cookies",
        params: options,
        echo: echo
      })
    })
  }

  public get_credentials(options: GetCredentials): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_credentials",
        params: options,
        echo: echo
      })
    })
  }

  public get_record(options: GetRecord): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_record",
        params: options,
        echo: echo
      })
    })
  }

  public get_image(options: GetImage): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_image",
        params: options,
        echo: echo
      })
    })
  }

  public set_restart(options: Restart): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "set_restart",
        params: options,
        echo: echo
      })
    })
  }
  
  public clean_cache(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "clean_cache",
        echo: echo
      })
    })
  }

  public can_send_image(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "can_send_image",
        echo: echo
      })
    })
  }

  public can_send_record(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "can_send_record",
        echo: echo
      })
    })
  }

  public get_status(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_status",
        echo: echo
      })
    })
  }

  public get_version_info(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_version_info",
        echo: echo
      })
    })
  }

  public get_csrf_token(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_csrf_token",
        echo: echo
      })
    })
  }

  public get_group_member_list(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_group_member_list",
        echo: echo
      })
    })
  }

  public get_group_list(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_group_list",
        echo: echo
      })
    })
  }

  public get_friend_list(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_friend_list",
        echo: echo
      })
    })
  }

  public get_login_info(): Promise<ApiReturn> {
    return new Promise(r => {
      const echo = uuid.v4();

      this.EchoEvent.once(echo, (data) => {
        r(data);
      })

      this.socket.send({
        action: "get_login_info",
        echo: echo
      })
    })
  }
}