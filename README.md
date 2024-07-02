# pull-request-auto-reviewer-private

![action example](https://raw.githubusercontent.com/pshergie/pull-request-auto-reviewer/main/img/example.jpg)

## Usage

Use this action in order to auto post comments in pull requests based on the changes

## Setup

In the second config file you need to specify 2 params:

- `token`: your GitHub token
- `data-path`: a path to a yaml file with a config that contains `prependMsg` and `checks` props. `prependMsg` is a message that prepends to every message of the bot. Keep empty if not needed. **By default** it's `🗯️ [pull-request-auto-reviewer]:` (as per screenshot). `checks` props consists of pairs of `paths` and `message` keys. `paths` dedicated to specify path(s) of changes that would trigger posting of followed `message` as a pull request comment. In case of multiple `paths` they should be separated by a comma. `message` could be a simple string or markdown. All messages will be combined into a single comment. An example of such a file:

A typical setting may look like this:

```yml
- name: pull-request-auto-reviewer
  uses: pshergie/pull-request-auto-reviewer-private@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    data-path: docs/data.yml
```
