import { describe, it, expect } from 'vitest'
import { execute } from '../model'
import { parse } from './input'

const createBoardCommand = 'create board rectangle 5 6'

describe('create unit command', () => {
  it.each([
    ['dragon', 'Caraxas'],
    ['knight', 'Lancelot'],
    ['peasant', 'Janusz'],
    ['wizard', 'Merlin'],
  ])('should create %s %s', (type, name) => {
    // given
    const commands = parse(`
      ${createBoardCommand}
      create ${type} ${name} 1 1
    `)

    // when
    const result = execute(commands)

    // then
    expect(result).toEqual(
      expect.objectContaining({
        units: [
          {
            type,
            name,
            position: [1, 1],
          },
        ],
        logs: expect.arrayContaining([
          {
            text: `${type} ${name} created at position [1,1]`,
            level: 'info',
          },
        ]),
      })
    )
  })
})