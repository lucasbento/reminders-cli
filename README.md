<p align="center"> 
<img align="center" src="media/logo.gif" alt="reminders-cli" title="reminders-cli" />
</p>

<h1 align="center">reminders-cli</h1>
<p align="center">
  Command-line interface that uses natural language processing to parse phrases and interact with Reminders.app.
</p>

## Getting started

### Usage

```console
$ reminders --help

  Usage
    $ remind <input>
    $ reminders
  
  Options
    --list      - List all reminders (will trigger if no option is provided).
    --complete  - List all reminders and enable a selector to be completed

  Examples
    $ remind me to feed the cats tomorrow at 12:00
    $ reminders --list
```

### Create

```console
$ remind me in two hours to study
```

![Add command](media/add_command.gif "Add command")

> You can see some examples in the [date parsing test file](https://github.com/lucasbento/reminders-cli/blob/master/src/utils/__tests__date.spec.js#5).

### List

```console
$ reminders --list
```

![List command](media/list_command.gif "List command")

### Complete

```console
$ reminders --complete
```

![Complete command](media/complete_command.gif "Complete command")

> 🔥 It's also possible to provide a name (or part of) to `complete` command:

![Complete command](media/complete_with_arg_command.gif "Complete command")

### Installation

This package requires NodeJS to be installed.

#### Homebrew
```console
brew install node
```

#### Manual
Go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and install the latest LTS version.

### Installing the package
```console
npm install -g reminders-cli
```

## Development

1. Install
```console
yarn # or npm install
```

2. Run build with auto-reloading
```console
yarn run watch
```

3. Try commands
```console
node ./dist/index.js --list # To list reminders
node ./dist/index.js --add "My reminder" 11/11/2017 10:30
node ./dist/index.js --add "My reminder"
```
