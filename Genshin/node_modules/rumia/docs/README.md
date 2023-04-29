<details>
<summary>目录</summary>

- [快速开始](#快速开始)
- [已实现API](#已实现API)

</details>

## 快速开始
`npm install suika`

```typescript
import { OneBot_WebSocket } from 'suika'

const bot = new OneBot_WebSocket({
  url: 'ws://localhost:6700',
  maxRetries: 3
});

bot.BotEvent.on('group_message', (msg) => {
  console.log(msg);
})
```

## 已实现API
### 使用方法

```typescript
bot.send_private_msg({
  user_id: 10000,
  message: 'mmmmmmmessage',
  auto_escape: true
}).then(result => {
  const msg_id = result.data.message_id;
})
```

### 正向 WebSocket
- [`send_private_msg` 发送私聊消息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#send_private_msg-发送私聊消息)
- [`send_group_msg` 发送群消息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#send_group_msg-发送群消息)
- [`send_msg` 发送消息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#send_msg-发送消息)
- [`delete_msg` 撤回消息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#delete_msg-撤回消息)
- [`get_msg` 获取消息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_msg-获取消息)
- [`get_forward_msg` 获取合并转发消息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_forward_msg-获取合并转发消息)
- [`send_like` 发送好友赞](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#send_like-发送好友赞)
- [`set_group_kick` 群组踢人](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_kick-群组踢人)
- [`set_group_ban` 群组单人禁言](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_ban-群组单人禁言)
- [`set_group_anonymous_ban` 群组匿名用户禁言](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_anonymous_ban-群组匿名用户禁言)
- [`set_group_whole_ban` 群组全员禁言](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_whole_ban-群组全员禁言)
- [`set_group_admin` 群组设置管理员](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_admin-群组设置管理员)
- [`set_group_anonymous` 群组匿名](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_anonymous-群组匿名)
- [`set_group_card` 设置群名片（群备注）](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_card-设置群名片群备注)
- [`set_group_name` 设置群名](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_name-设置群名)
- [`set_group_leave` 退出群组](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_leave-退出群组)
- [`set_group_special_title` 设置群组专属头衔](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_special_title-设置群组专属头衔)
- [`set_friend_add_request` 处理加好友请求](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_friend_add_request-处理加好友请求)
- [`set_group_add_request` 处理加群请求／邀请](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_group_add_request-处理加群请求邀请)
- [`get_login_info` 获取登录号信息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_login_info-获取登录号信息)
- [`get_stranger_info` 获取陌生人信息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_stranger_info-获取陌生人信息)
- [`get_friend_list` 获取好友列表](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_friend_list-获取好友列表)
- [`get_group_info` 获取群信息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_group_info-获取群信息)
- [`get_group_list` 获取群列表](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_group_list-获取群列表)
- [`get_group_member_info` 获取群成员信息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_group_member_info-获取群成员信息)
- [`get_group_member_list` 获取群成员列表](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_group_member_list-获取群成员列表)
- [`get_group_honor_info` 获取群荣誉信息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_group_honor_info-获取群荣誉信息)
- [`get_cookies` 获取 Cookies](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_cookies-获取-cookies)
- [`get_csrf_token` 获取 CSRF Token](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_csrf_token-获取-csrf-token)
- [`get_credentials` 获取 QQ 相关接口凭证](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_credentials-获取-qq-相关接口凭证)
- [`get_record` 获取语音](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_record-获取语音)
- [`get_image` 获取图片](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_image-获取图片)
- [`can_send_image` 检查是否可以发送图片](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#can_send_image-检查是否可以发送图片)
- [`can_send_record` 检查是否可以发送语音](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#can_send_record-检查是否可以发送语音)
- [`get_status` 获取运行状态](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_status-获取运行状态)
- [`get_version_info` 获取版本信息](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#get_version_info-获取版本信息)
- [`set_restart` 重启 OneBot 实现](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#set_restart-重启-onebot-实现)
- [`clean_cache` 清理缓存](https://github.com/howmanybots/onebot/blob/master/v11/specs/api/public.md#clean_cache-清理缓存)