# PR with AI Review

`/pr`와 동일하게 실행하되, `gh pr create` 명령 끝에 반드시 `# ai-review`를 붙인다.

```bash
gh pr create \
  --assignee @me \
  --title "..." \
  --body "..." # ai-review
```

`# ai-review`는 shell 주석이라 실행에 영향 없고, pr-review 훅이 이를 감지해 자동으로 AI 인라인 코드 리뷰를 달아준다.

나머지 모든 단계는 `/pr` 커맨드와 동일하다.
