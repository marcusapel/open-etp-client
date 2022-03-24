module.exports = {
  branches: ["master", "next"],
  preset: "conventionalcommits",
  parserOpts: {
    mergePattern:
      "^Merged PR (\\d+): (\\w*)(?:\\(([\\w\\$\\.\\-\\* ]*)\\))?!?\\: (.*)$",
    mergeCorrespondence: ["id", "type", "scope", "subject"],
    headerPattern: undefined,
    headerCorrespondence: []
  },
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        // TODO types
        releaseRules: [
          {
            label: "Build",
            release: "patch",
            emoji: "👷",
            types: ["build"],
            rank: 1,
            desc: "Changes that affect the build system or external dependencies, e.g. scope: 'deps-dev'"
          },
          {
            label: "Breaking",
            release: "major",
            emoji: "💥",
            types: ["break", "breaking"],
            rank: 100,
            desc: "A major breaking change"
          },
          {
            label: "CI/CD",
            emoji: "🚀",
            types: ["ci", "cd"],
            rank: -1,
            desc: "Changes to our CI/CD configuration files and scripts"
          },
          {
            label: "Docs",
            release: "patch",
            emoji: "📝",
            types: ["doc", "docs"],
            rank: 1,
            desc: "Documentation only changes"
          },
          {
            label: "Fixes",
            release: "patch",
            emoji: "🐛",
            types: ["fix", "patch"],
            rank: 1,
            desc: "Fixes existing functionality"
          },
          {
            label: "Misc",
            emoji: "📋",
            types: ["chore", "misc", "internal"],
            rank: -1,
            desc: "Internal changes that don't modify src or test files"
          },
          {
            label: "Performance",
            release: "patch",
            emoji: "⚡",
            types: ["perf", "perfs"],
            rank: 1,
            desc: "A code change that improves performance"
          },
          {
            label: "Refactor",
            emoji: "♻️",
            types: ["refactor"],
            rank: -1,
            desc: "A code change that neither fixes a bug nor adds a feature"
          },
          {
            label: "Release",
            release: "major",
            emoji: "🎉",
            types: ["release"],
            rank: 100,
            desc: "Not a breaking change but bumps the major version"
          },
          {
            label: "Reverts",
            release: "patch",
            emoji: "⏪️",
            types: ["revert"],
            rank: 1,
            desc: "Reverts previous or broken code"
          },
          {
            label: "Security",
            release: "patch",
            emoji: "🔑",
            types: ["security"],
            rank: 1,
            desc: "Improves security"
          },
          {
            label: "Styles",
            emoji: "🎨",
            types: ["style", "styles"],
            rank: -1,
            desc: "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)"
          },
          {
            label: "Tests",
            emoji: "🧪",
            types: ["test", "tests"],
            rank: -1,
            desc: "Changes to tests or the testing framework, adding missing tests or correcting existing tests"
          },
          {
            label: "Updates",
            release: "minor",
            emoji: "✨",
            types: ["new", "update", "feature"],
            rank: 10,
            desc: "Introduces or update a new feature"
          }
        ]
      }
    ],
    "@semantic-release/changelog",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        // TODO types
        assets: ["package.json", "package-lock.json", "CHANGELOG.md"],
        message:
          // eslint-disable-next-line no-template-curly-in-string
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
};
