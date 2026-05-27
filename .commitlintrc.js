module.exports = {
  rules: {
    // automated tools (semantic, renovate, dependabot) can issue some large commits
    "body-max-length": [0],
    // only expected types
    "type-enum": [
      2,
      "always",
      [
        "break",
        "breaking",
        "build",
        "cd",
        "chore",
        "ci",
        "doc",
        "docs",
        "feature",
        "fix",
        "internal",
        "misc",
        "new",
        "patch",
        "perf",
        "perfs",
        "refactor",
        "release",
        "revert",
        "security",
        "style",
        "styles",
        "test",
        "tests",
        "update"
      ]
    ]
  }
};
