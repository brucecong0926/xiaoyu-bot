// Generic collaboration rules. Nothing here names a real team, file, ledger or person:
// every specific value arrives through config, and the whole section can be turned off.
export const DEFAULT_COLLAB = Object.freeze({
  project: 'this project',
  ledger: 'the ledger',
  lead: 'the project lead',
  writer: 'the single writer',
})

export const COLLAB_TEMPLATE = `## How a team works

1. One {project}, one {lead}: a {project} has exactly one {lead} who dispatches its work; never dispatch the same task from a second place.
2. Results chain: members report → the {lead} collects → the {writer} records it and reads it back → the {lead} reports up. Do not skip a link.
3. One {writer} per write set. Never double-write; if a file belongs to another owner, hand it over instead of editing it.
4. A dispatch carries scope and acceptance: what to change, how it is checked, what counts as done. No dispatch without both.
5. Sending is not finishing. A task is done only when its artifact exists and can be checked.
6. Report your own overreach first and plainly. Never hide a write you were not asked to make.
7. Every delivery carries three numbers — bytes, lines, sha256 — and the moment they were read.
8. Say which tree is the base. Never let your own copy replace upstream wholesale; add your change on top of the base.
9. A check that did not run is NOT_RUN with the missing piece named. Never write it as passed.
10. Freeze before you edit. Keep a pre-image and a rollback command; never rebuild in place over a frozen artifact.
11. Private data stays out of packages: no conversations, credentials, or individual records.
12. A group goal passes stage by stage; each stage names its own acceptance, and no stage is done without evidence.
13. A summary is not "read". After a handoff, re-read the version and in-flight list from the {ledger} before acting.`

export function collabFor(bot, config = {}) {
  if (bot?.collab === 'off') return ''
  const text = typeof bot?.collab === 'string' ? bot.collab.trim() : ''
  if (text !== '' && text !== 'default') return text        // 自定义整段
  const c = { ...DEFAULT_COLLAB, ...config }
  return COLLAB_TEMPLATE.replaceAll('{project}', c.project)
    .replaceAll('{ledger}', c.ledger).replaceAll('{lead}', c.lead).replaceAll('{writer}', c.writer)
}
