// Family image slots: the one source both halves read. Pure data and pure functions only —
// no browser API (window/document) and no Node API (fs/path) — because the host imports it
// from the runtime package while the browser bundle compiles it in.
export const FAMILY_SLOT_NAMES = ['supervisor', 'research', 'reviewer', 'recorder', 'channel', 'coder',
  'data', 'design', 'store-ops', 'tool-connector', 'video', 'generic']

export const isFamilySlot = value => typeof value === 'string' && FAMILY_SLOT_NAMES.includes(value)

// The old per-Session table. Read once by the one-time migration, never at runtime.
export const FAMILY_BOT_SLOTS = {"session-74645190-0e40-4076-9700-0a468db0150f": "supervisor", "session-af97613a-fbe4-47db-a17f-6e73f36709be": "research", "session-270dea2c-75f3-4522-a2b3-2ba356d0da2a": "recorder", "session-c73da1f7-5aed-4067-b6aa-79c927fbdcf3": "reviewer", "session-54c41448-c7be-4350-b02b-5042421b6934": "research", "session-512418d5-de0c-4ef0-a5ae-5580ceaaacc5": "reviewer", "session-479593a6-88e2-42b6-adaa-5fab8a44d10c": "recorder", "session-46739b73-3822-40f7-8e85-ed6b297a040b": "channel"}

// A Bot's own words about its job pick its image: most specific match first.
export const ROLE_SLOTS = [
  [/主管|协调|chief|supervisor|lead/i, 'supervisor'],
  [/审计|复核|审核|review/i, 'reviewer'],  // 2026-11-18 补「审核」
  [/研究|调研|research/i, 'research'],
  [/开发|工程|执行|编码|coder|engineer/i, 'coder'],  // 2026-11-18 22:5x 补 '编码'（鱼鱼批准）
  [/数据|data/i, 'data'],
  [/设计|design/i, 'design'],
  [/渠道|联络|channel|liaison/i, 'channel'],
  [/记录|recorder/i, 'recorder'],
  [/视频|video/i, 'video'],
  [/运营|店铺|store/i, 'store-ops'],
  [/连接|工具|接入|tool|connector/i, 'tool-connector'],  // 2026-11-18 补「接入」
]

export function roleSlotFor(role) {
  const text = String(role ?? '')
  for (const [pattern, slot] of ROLE_SLOTS) if (pattern.test(text)) return slot
  return undefined
}
