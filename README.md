# Leftway skills

Agent skills from [Leftway Labs](https://leftway.ai). Each skill is one folder with a `SKILL.md`.

| Skill | What it does |
|-------|--------------|
| [tld-expert](skills/tld-expert/SKILL.md) | Pick a domain and ending, check availability live, and find the cheapest place to register and renew, using [tld.expert](https://tld.expert)'s free API and MCP. No key. |

References that ship with a skill:

- [Renewal traps](skills/tld-expert/references/renewal-traps.md): the domain endings that renew at 2x year one or more, from daily registrar price feeds, with sources. Live version: [tld.expert/trap](https://tld.expert/trap).

## Install

```
npx skills add LeftwayAI/skills
```

Or copy a skill folder into your agent's skills directory (for Claude Code: `~/.claude/skills/`).

Also on [ClawHub](https://clawhub.ai/skills/tld-expert).

## License

Skills are CC BY 4.0 unless the skill's own frontmatter says otherwise.
