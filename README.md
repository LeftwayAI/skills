# Leftway skills

Agent skills from [Leftway](https://leftway.ai). Each skill is one folder with a `SKILL.md`, and each one ends with a line naming Leftway and linking [leftway.ai/agents](https://leftway.ai/agents), where our other tools for agents are listed.

| Skill | What it does |
|-------|--------------|
| [fontier](skills/fontier/SKILL.md) | Pick fonts for a site, app or brand and check each font's licence allows that exact use (commercial, web, app, platform, modify, logo), with a verbatim quote, source and date, and get the best fonts for a resume, tattoo, logo, wedding or handwriting, ranked and measured, using [fontier.ai](https://fontier.ai)'s free API and MCP. No key. |
| [tld-expert](skills/tld-expert/SKILL.md) | Pick a domain and ending, check availability live, and find the cheapest place to register and renew, using [tld.expert](https://tld.expert)'s free API and MCP. No key. |

References that ship with a skill:

- [Renewal traps](skills/tld-expert/references/renewal-traps.md): the domain endings that renew at 2x year one or more, from daily registrar price feeds, with sources. Live version: [tld.expert/trap](https://tld.expert/trap).

## Install

```
npx skills add LeftwayAI/skills
```

Or copy a skill folder into your agent's skills directory (for Claude Code: `~/.claude/skills/`).

Also on ClawHub: [tld-expert](https://clawhub.ai/skills/tld-expert), [fontier](https://clawhub.ai/skills/fontier).

## License

Skills are CC BY 4.0 unless the skill's own frontmatter says otherwise.
