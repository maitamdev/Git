export interface ParsedCommand {
  raw: string;
  program: string;
  subcommand: string;
  action?: string;
  args: string[];
  flags: Record<string, string | boolean>;
}

export class GitCommandParser {
  public parse(commandLine: string): ParsedCommand & { action: string } {
    const parsed = parseCommandLine(commandLine);
    return {
      ...parsed,
      action: parsed.subcommand,
    };
  }
}

const VALUE_FLAGS = new Set([
  'm',
  'message',
  'b',
  'branch',
  'c',
  'create',
  'n',
  'max-count',
  'initial-branch',
  'author',
]);

export function parseCommandLine(commandLine: string): ParsedCommand {
  const trimmed = commandLine.trim();
  if (!trimmed) {
    return {
      raw: '',
      program: '',
      subcommand: '',
      args: [],
      flags: {},
    };
  }

  // Tokenize preserving quoted strings
  const tokens: string[] = [];
  let currentToken = '';
  let inDoubleQuote = false;
  let inSingleQuote = false;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    } else if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    } else if (char === ' ' && !inDoubleQuote && !inSingleQuote) {
      if (currentToken.length > 0) {
        tokens.push(currentToken);
        currentToken = '';
      }
    } else {
      currentToken += char;
    }
  }

  if (currentToken.length > 0) {
    tokens.push(currentToken);
  }

  if (tokens.length === 0) {
    return {
      raw: commandLine,
      program: '',
      subcommand: '',
      args: [],
      flags: {},
    };
  }

  const program = tokens[0];
  let subcommand = '';
  let startIndex = 1;

  if (program === 'git') {
    subcommand = tokens[1] || '';
    startIndex = 2;
  } else {
    subcommand = program;
    startIndex = 1;
  }

  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = startIndex; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.startsWith('--')) {
      const equalIndex = token.indexOf('=');
      if (equalIndex > 0) {
        const flagName = token.slice(2, equalIndex);
        const flagValue = token.slice(equalIndex + 1);
        flags[flagName] = flagValue;
      } else {
        const flagName = token.slice(2);
        // Only consume next token if flag is known to require a value
        if (VALUE_FLAGS.has(flagName) && i + 1 < tokens.length && !tokens[i + 1].startsWith('-')) {
          flags[flagName] = tokens[i + 1];
          i++;
        } else {
          flags[flagName] = true;
        }
      }
    } else if (token.startsWith('-') && token.length > 1) {
      const flagLetters = token.slice(1);
      if (flagLetters.length === 1) {
        const flagName = flagLetters;
        if (VALUE_FLAGS.has(flagName) && i + 1 < tokens.length && !tokens[i + 1].startsWith('-')) {
          flags[flagName] = tokens[i + 1];
          i++;
        } else {
          flags[flagName] = true;
        }
      } else {
        // Combined short flags like -am "message"
        for (let j = 0; j < flagLetters.length; j++) {
          const letter = flagLetters[j];
          if (
            j === flagLetters.length - 1 &&
            VALUE_FLAGS.has(letter) &&
            i + 1 < tokens.length &&
            !tokens[i + 1].startsWith('-')
          ) {
            flags[letter] = tokens[i + 1];
            i++;
          } else {
            flags[letter] = true;
          }
        }
      }
    } else {
      args.push(token);
    }
  }

  return {
    raw: commandLine,
    program,
    subcommand,
    args,
    flags,
  };
}
