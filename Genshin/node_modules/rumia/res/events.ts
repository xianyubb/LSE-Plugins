import { EventEmitter } from 'events';
import * as parser from './parser';

export interface SocketEvent extends EventEmitter{
  on(event: 'message', listener: (msg: parser.Data) => void): any
  on(event: 'connect', listener: () => void): any
  
  emit(event: 'message', msg: parser.Data): any
  emit(event: 'connect'): any
  
  addListener(event: 'message', listener: (msg: parser.Data) => void): any
  addListener(event: 'connect', listener: () => void): any
  
  removeAllListeners(event: 'message'): any
  removeAllListeners(event: 'connect'): any

  once(event: 'message', listener: (msg: parser.Data) => void): any
  once(event: 'connect', listener: () => void): any
}

export interface BotEvent extends EventEmitter {
  emit(event: 'connect'): any
  emit(event: 'heartbeat', msg: parser.heartbeat): any
  emit(event: 'group_message', msg: parser.GroupMessage): any
  emit(event: 'private_message', msg: parser.PrivateMessage): any
  emit(event: 'group_file_upload', msg: parser.GroupFileUpload): any
  emit(event: 'group_admin_change', msg: parser.GroupAdminChange): any
  emit(event: 'group_decrease', msg: parser.GroupMemberChange): any
  emit(event: 'group_increase', msg: parser.GroupMemberChange): any
  emit(event: 'group_mute', msg: parser.GroupMute): any
  emit(event: 'friend_add', msg: parser.FriendAdd): any
  emit(event: 'group_recall', msg: parser.GroupRecall): any
  emit(event: 'friend_recall', msg: parser.FriendRecall): any
  emit(event: 'poke', msg: parser.GroupPoke): any
  emit(event: 'lucky_king', msg: parser.LuckyKing): any
  emit(event: 'honor', msg: parser.GroupHonor): any
  emit(event: 'friend_request', msg: parser.FriendRequest): any
  emit(event: 'group_request', msg: parser.GroupRequest): any
  emit(event: 'echo', msg: parser.ApiReturn): any

  on(event: 'connect', listener: () => void): any
  on(event: 'heartbeat', listener: (msg: parser.heartbeat) => void): any
  on(event: 'group_message', listener: (msg: parser.GroupMessage) => void): any
  on(event: 'private_message', listener: (msg: parser.PrivateMessage) => void): any
  on(event: 'group_file_upload', listener: (msg: parser.GroupFileUpload) => void): any
  on(event: 'group_admin_change', listener: (msg: parser.GroupAdminChange) => void): any
  on(event: 'group_decrease', listener: (msg: parser.GroupMemberChange) => void): any
  on(event: 'group_increase', listener: (msg: parser.GroupMemberChange) => void): any
  on(event: 'group_mute', listener: (msg: parser.GroupMute) => void): any
  on(event: 'friend_add', listener: (msg: parser.FriendAdd) => void): any
  on(event: 'group_recall', listener: (msg: parser.GroupRecall) => void): any
  on(event: 'friend_recall', listener: (msg: parser.FriendRecall) => void): any
  on(event: 'poke', listener: (msg: parser.GroupPoke) => void): any
  on(event: 'lucky_king', listener: (msg: parser.LuckyKing) => void): any
  on(event: 'honor', listener: (msg: parser.GroupHonor) => void): any
  on(event: 'friend_request', listener: (msg: parser.FriendRequest) => void): any
  on(event: 'group_request', listener: (msg: parser.GroupRequest) => void): any
  on(event: 'echo', listener: (msg: parser.ApiReturn) => void): any

  addListener(event: 'connect', listener: () => void): any
  addListener(event: 'heartbeat', listener: (msg: parser.heartbeat) => void): any
  addListener(event: 'group_message', listener: (msg: parser.GroupMessage) => void): this;
  addListener(event: 'private_message', listener: (msg: parser.PrivateMessage) => void): this;
  addListener(event: 'group_file_upload', listener: (msg: parser.GroupFileUpload) => void): this;
  addListener(event: 'group_admin_change', listener: (msg: parser.GroupAdminChange) => void): this;
  addListener(event: 'group_decrease', listener: (msg: parser.GroupMemberChange) => void): this;
  addListener(event: 'group_increase', listener: (msg: parser.GroupMemberChange) => void): this;
  addListener(event: 'group_mute', listener: (msg: parser.GroupMute) => void): this;
  addListener(event: 'friend_add', listener: (msg: parser.FriendAdd) => void): this;
  addListener(event: 'group_recall', listener: (msg: parser.GroupRecall) => void): this;
  addListener(event: 'friend_recall', listener: (msg: parser.FriendRecall) => void): this;
  addListener(event: 'poke', listener: (msg: parser.GroupPoke) => void): this;
  addListener(event: 'lucky_king', listener: (msg: parser.LuckyKing) => void): this;
  addListener(event: 'honor', listener: (msg: parser.GroupHonor) => void): this;
  addListener(event: 'friend_request', listener: (msg: parser.FriendRequest) => void): this;
  addListener(event: 'group_request', listener: (msg: parser.GroupRequest) => void): this;
  addListener(event: 'echo', listener: (msg: parser.ApiReturn) => void): this;

  removeAllListeners(event: 'connect'): any
  removeAllListeners(event: 'heartbeat'): any
  removeAllListeners(event: 'group_message'): any
  removeAllListeners(event: 'private_message'): any
  removeAllListeners(event: 'group_file_upload'): any
  removeAllListeners(event: 'group_admin_change'): any
  removeAllListeners(event: 'group_decrease'): any
  removeAllListeners(event: 'group_increase'): any
  removeAllListeners(event: 'group_mute'): any
  removeAllListeners(event: 'friend_add'): any
  removeAllListeners(event: 'group_recall'): any
  removeAllListeners(event: 'friend_recall'): any
  removeAllListeners(event: 'poke'): any
  removeAllListeners(event: 'lucky_king'): any
  removeAllListeners(event: 'honor'): any
  removeAllListeners(event: 'friend_request'): any
  removeAllListeners(event: 'group_request'): any
  removeAllListeners(event: 'echo'): any

  once(event: 'connect', listener: () => void): any
  once(event: 'heartbeat', listener: (msg: parser.heartbeat) => void): any
  once(event: 'group_message', listener: (msg: parser.GroupMessage) => void): any
  once(event: 'private_message', listener: (msg: parser.PrivateMessage) => void): any
  once(event: 'group_file_upload', listener: (msg: parser.GroupFileUpload) => void): any
  once(event: 'group_admin_change', listener: (msg: parser.GroupAdminChange) => void): any
  once(event: 'group_decrease', listener: (msg: parser.GroupMemberChange) => void): any
  once(event: 'group_increase', listener: (msg: parser.GroupMemberChange) => void): any
  once(event: 'group_mute', listener: (msg: parser.GroupMute) => void): any
  once(event: 'friend_add', listener: (msg: parser.FriendAdd) => void): any
  once(event: 'group_recall', listener: (msg: parser.GroupRecall) => void): any
  once(event: 'friend_recall', listener: (msg: parser.FriendRecall) => void): any
  once(event: 'poke', listener: (msg: parser.GroupPoke) => void): any
  once(event: 'lucky_king', listener: (msg: parser.LuckyKing) => void): any
  once(event: 'honor', listener: (msg: parser.GroupHonor) => void): any
  once(event: 'friend_request', listener: (msg: parser.FriendRequest) => void): any
  once(event: 'group_request', listener: (msg: parser.GroupRequest) => void): any
  once(event: 'echo', listener: (msg: parser.ApiReturn) => void): any
}

export const bot: BotEvent = new EventEmitter();
export const socket: SocketEvent = new EventEmitter();
export const echo: EventEmitter = new EventEmitter();