export type Vector = number[]

export type OrientationType = 'none' | 'rectangle' | 'hexagon' | 'cube' 

export type Orientation = {
  type: OrientationType

  createVector: (...args: number[]) => Vector
  isWithinBounds: (vector: Vector) => boolean
}

