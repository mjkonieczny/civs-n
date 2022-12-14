import { Command } from './patterns'
import { createCommand } from './commands'
import { Game } from './model'

export const parse = (input: string): Command<Game>[] => {
  const lines = input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  return lines.map(line => createCommand(line))
}