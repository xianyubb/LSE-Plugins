export interface MessageSegment {
  type: string,
  data: ( null | {
    text?: string,
    id?: (string | number),
    file?: string,
    qq?: string,
    type?: (string | number),
    url?: string,
    title?: string,
    lat?: number,
    lon?: number,
    audio?: string,
    user_id?: number,
    nickname?: string,
    content?: (string | MessageSegment[]),
    data?: string
  })
}