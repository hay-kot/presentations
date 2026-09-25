# Presentation Ideas

Raw notes — to be worked into slides.

- **"Don't outsource the thinking"** — AI is a tool, not a replacement for understanding the problem.

- **"Please read the code"** — You still have to understand what's being generated. Skipping this is how you end up on-call for garbage.

- **Start with the interview-me skill** — Human input is still required for maintainable code and good outputs. The AI is only as good as the context you give it upfront.

- **Build vertical slices, not horizontal layers** — Get something running that you can iterate on. Don't build the whole data layer before you have a working endpoint.

- **Add tools to test and verify** — Things you wouldn't normally bother with: dead code review, custom linters written by LLMs, pre-commit hooks, excessive CI. AI makes these cheap to set up.

- **Lean on code generation / scaffold** — [github.com/hay-kot/scaffold](https://github.com/hay-kot/scaffold) lets you pre-setup common patterns to save tokens and guarantees the AI does it right the first time. Give it a framework and it performs better.

- **CTA: where do I go from here?** — People I look to for info and what ideas they're working on.

- **"Don't build garbage because you're going to be on-call for it"** — The accountability hasn't changed. You still own what ships.

- **Model providers' incentives are not aligned with your incentives** — They benefit from you consuming more tokens. You benefit from consuming fewer. Keep that in mind when evaluating their guidance.
