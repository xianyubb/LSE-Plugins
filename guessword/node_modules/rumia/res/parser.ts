import { MessageSegment } from "./types";
import { EventEmitter } from "events";

export interface Data {
  time: number,
  self_id: number,
  post_type: string
}

/** 聊天消息 **/

export interface Message extends Data{
  message_type: ('private' | 'group'),
  sub_type: string,
  message_id: number,
  user_id: number,
  message: (string | MessageSegment[]),
  raw_message: string,
  font: number,
  sender: Sender,
  group_id: number,
  anonymous: (null | Anonymous)
}

export interface Sender {
  user_id: number,
  nickname: string,
  sex?: string,
  age?: number,
  card?: string,
  area?: string,
  level?: string,
  role?: string,
  title?: string
}

export interface Anonymous{
  id: number,
  name: string,
  flag: string
}

export interface GroupMessage{
  raw_message: string,
  message: (string | MessageSegment[]),
  message_id: number,
  group_id: number,
  sender: Sender,
  anonymous: (null | Anonymous),
  font: number,
  self_id: number
}

export interface PrivateMessage {
  raw_message: string,
  message: (string | MessageSegment[]),
  message_id: number,
  sender: Sender,
  font: number,
  self_id: number
}

/** 通知消息 **/

export interface Notice extends Data {
  notice_type: string,
  group_id: number,
  user_id: number,
  file: NoticeFile,
  sub_type: string,
  operator_id: number,
  duration: number,
  message_id: number,
  target_id: number,
  honor_type: ('talkative'|'performer'|'emotion')
}

export interface NoticeFile {
  id: string,
  name: string,
  size: number,
  busid: number
}

export interface GroupFileUpload {
  group_id: number,
  user_id: number,
  file: NoticeFile
}

export interface GroupAdminChange {
  group_id: number,
  user_id: number,
  type: string
}

export interface GroupMemberChange {
  group_id: number,
  user_id: number,
  type: string,
  operator: number
}

export interface GroupMute {
  group_id: number,
  user_id: number,
  type: string,
  operator: number,
  duration: number
}

export interface FriendAdd {
  user_id: number
}

export interface GroupRecall {
  group_id: number,
  user_id: number,
  operator: number,
  message_id: number
}

export interface FriendRecall {
  user_id: number,
  message_id: number
}

export interface GroupPoke {
  group_id: number,
  user_id: number,
  target_id: number
}

export interface LuckyKing {
  group_id: number,
  user_id: number,
  target_id: number
}

export interface GroupHonor {
  group_id: number,
  user_id: number,
  type: string
}

/** Meta消息 **/

export interface heartbeat {
  self_id: number,
  status: any,
  time: number,
  interval: number
}

/** 请求消息 **/

export interface Request extends Data{
  request_type: string,
  user_id: number,
  group_id: number,
  comment: string,
  sub_type: string,
  flag: string,
}

export interface FriendRequest {
  user_id: number,
  comment: string,
  flag: string,
}

export interface GroupRequest {
  user_id: number,
  group_id: number,
  comment: string,
  type: string,
  flag: string,
}

export interface Meta {
  _post_method?: number,
  interval?: number,
  status?: any
  meta_event_type: string,
  post_type: string,
  self_id: number,
  sub_type: string,
  time: number
}

export interface ApiReturn {
  status: string,
  retcode: number,
  data: any,
  uuid: string
}

/**
 * @description 聊天消息
 * */
const message = (data: Message, callback: (EventName: string, data: any) => void) => {
  switch (data.message_type) {
    case "group":
      // 群消息
      const groupMsg: GroupMessage = {
        sender: data.sender,
        anonymous: data.anonymous,
        group_id: data.group_id,
        raw_message: data.raw_message,
        message: data.message,
        font: data.font,
        self_id: data.self_id,
        message_id: data.message_id,
      };

      callback('group_message', groupMsg)
      break;
    case "private":
      // 私聊消息
      const privateMsg: PrivateMessage = {
        sender: data.sender,
        raw_message: data.raw_message,
        message: data.message,
        font: data.font,
        self_id: data.self_id,
        message_id: data.message_id
      };

      callback('private_message', privateMsg)
      break;
  }
}

/**
 * @description 通知消息
 * */
const notice = (data: Notice, callback: (EventName: string, data?: any) => void) => {
  switch (data.notice_type) {
    case 'group_upload':
      // 群文件上传
      const group_upload: GroupFileUpload = {
        group_id: data.group_id,
        user_id: data.user_id,
        file: data.file
      }
      callback('group_file_upload', group_upload)
      break;
    case 'group_admin':
      // 管理员变动
      const group_admin: GroupAdminChange = {
        group_id: data.group_id,
        user_id: data.user_id,
        type: data.sub_type
      }
      callback('group_admin_change', group_admin)
      break;
    case 'group_decrease':
      // 群成员减少
      const group_decrease: GroupMemberChange = {
        group_id: data.group_id,
        user_id: data.user_id,
        type: data.sub_type,
        operator: data.operator_id
      }
      callback('group_decrease', group_decrease)
      break;
    case 'group_increase':
      // 群成员减少
      const group_increase: GroupMemberChange = {
        group_id: data.group_id,
        user_id: data.user_id,
        type: data.sub_type,
        operator: data.operator_id
      }
      callback('group_increase', group_increase)
      break;
    case 'group_mute':
      // 群禁言
      const group_mute: GroupMute = {
        group_id: data.group_id,
        user_id: data.user_id,
        type: data.sub_type,
        operator: data.operator_id,
        duration: data.duration
      }
      callback('group_mute', group_mute)
      break;
    case 'friend_add':
      // 好友添加
      const friend_add: FriendAdd = {
        user_id: data.user_id,
      }
      callback('friend_add', friend_add)
      break;
    case 'group_recall':
      // 撤回群消息
      const group_recall: GroupRecall = {
        group_id: data.group_id,
        user_id: data.user_id,
        operator: data.operator_id,
        message_id: data.message_id
      }
      callback('group_recall', group_recall)
      break;
    case 'friend_recall':
      // 撤回好友消息
      const friend_recall: FriendRecall = {
        user_id: data.user_id,
        message_id: data.message_id
      }
      callback('friend_recall', friend_recall)
      break;
    case 'poke':
      // 群聊戳一戳
      const poke: GroupPoke = {
        user_id: data.user_id,
        group_id: data.group_id,
        target_id: data.target_id
      }
      callback('poke', poke)
      break;
    case 'lucky_king':
      // 红包运气王
      const lucky_king: LuckyKing = {
        user_id: data.user_id,
        group_id: data.group_id,
        target_id: data.target_id
      }
      callback('lucky_king', lucky_king)
      break;
    case 'honor':
      // 群荣誉变更
      const honor: GroupHonor = {
        user_id: data.user_id,
        group_id: data.group_id,
        type: data.honor_type
      }
      callback('honor', honor)
      break;
  }
}

/**
 * @description 请求消息
 * */
const request = (data: Request, callback: (EventName: string, data?: any) => void) => {
  switch (data.request_type) {
    case 'friend':
      // 好友请求
      const friend: FriendRequest = {
        user_id: data.user_id,
        comment: data.comment,
        flag: data.flag
      }
      callback('friend_request', friend)
      break;
    case 'group':
      // 加群请求
      const group: GroupRequest = {
        user_id: data.user_id,
        group_id: data.group_id,
        comment: data.comment,
        type: data.sub_type,
        flag: data.flag,
      }
      callback('group_request', group)
      break;
  }
}

/**
 * @description 元事件
 */
const meta_event = (data: Meta, callback: (EventName: string, data?: any) => void) => {
  switch(data.meta_event_type) {
    case 'lifecycle':
      if(data.sub_type === 'connect') {
        callback('connect');
      }
      break;
    case 'heartbeat':
      callback('heartbeat', {
        self_id: data.self_id,
        status: data.status,
        time: data.time,
        interval: Number(data.interval)
      })
      break;
  }
}

export default (msg: any, callback: (EventName: string, data?: any) => void) => {
  if(msg.post_type) {
    switch (msg.post_type) {
      case 'message':
        // 消息
        message(msg, callback);
        break;
      case 'notice':
        // 通知
        notice(msg, callback);
        break;
      case 'request':
        // 请求消息
        request(msg, callback);
        break;
      case 'meta_event':
        // 元事件
        meta_event(msg, callback);
        break;
    }
  } else if (msg.echo) {
    callback('echo', {
      uuid: msg.echo,
      data: msg.data
    });
  }
}