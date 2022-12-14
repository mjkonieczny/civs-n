import { it, describe, expect } from 'vitest'
import { execute } from '../../model'
import { parse } from '../../parser'

describe('create board command', () => {
  it.each([
    ['spherical'],
    ['toroidal'],
  ])('should not create unknown %s board', (name) => {
    // given
    const commands = parse(`
      create board ${name}
    `)

    // when
    const result = execute(commands)

    // then
    expect(result).toEqual(
      expect.objectContaining({
        orientation: expect.objectContaining({
          type: 'none',
        }),
        logs: [
          {
            text: `Unknown board type ${name}`,
            level: 'error'
          }
        ]
      })
    )
  })

  it.each([
    ['create board rectangle 1 1', 'rectangle', 'Rectangle board created with 1 rows and 1 columns'],
    ['create board rectangle 3 4', 'rectangle', 'Rectangle board created with 3 rows and 4 columns'],
    ['create board hexagon 1 1', 'hexagon', 'Hexagon board created with 1 rows and 1 columns'],
    ['create board hexagon 3 4', 'hexagon', 'Hexagon board created with 3 rows and 4 columns'],
    ['create board cube 1 1 1', 'cube', 'Cube board created with 1 rows and 1 columns and 1 height'],
    ['create board cube 3 4 5', 'cube', 'Cube board created with 3 rows and 4 columns and 5 height'],
  ])('should %s', (command, orientationType, text) => {
    // given
    const commands = parse(`
      ${command}
    `)

    // when
    const result = execute(commands)

    // then
    expect(result).toEqual(
      expect.objectContaining({
        orientation: expect.objectContaining({
          type: orientationType,
        }),
        logs: [
          {
            text,
            level: 'info'
          }
        ]
      })
    )
  })

  it.each([
    ['create board rectangle 0 1', 'Board size must be between 1-10 x 1-20'],
    ['create board rectangle 1 0', 'Board size must be between 1-10 x 1-20'],
    ['create board rectangle 11 1', 'Board size must be between 1-10 x 1-20'],
    ['create board rectangle 1 21', 'Board size must be between 1-10 x 1-20'],
    ['create board hexagon 0 1', 'Board size must be between 1-5 x 1-5'],
    ['create board hexagon 1 0', 'Board size must be between 1-5 x 1-5'],
    ['create board hexagon 6 1', 'Board size must be between 1-5 x 1-5'],
    ['create board hexagon 1 6', 'Board size must be between 1-5 x 1-5'],
    ['create board cube 0 1 1', 'Board size must be between 1-7 x 1-8 x 1-13'],
    ['create board cube 1 0 1', 'Board size must be between 1-7 x 1-8 x 1-13'],
    ['create board cube 1 1 0', 'Board size must be between 1-7 x 1-8 x 1-13'],
    ['create board cube 8 1 1', 'Board size must be between 1-7 x 1-8 x 1-13'],
    ['create board cube 1 9 1', 'Board size must be between 1-7 x 1-8 x 1-13'],
    ['create board cube 1 1 14', 'Board size must be between 1-7 x 1-8 x 1-13'],
  ])('should not %s', (command, text) => {
    // given
    const commands = parse(`
      ${command}
    `)

    // when
    const result = execute(commands)

    // then
    expect(result).toEqual(
      expect.objectContaining({
        orientation: expect.objectContaining({
          type: 'none',
        }),
        logs: [
          {
            text,
            level: 'warning'
          }
        ]
      })
    )
  })
})