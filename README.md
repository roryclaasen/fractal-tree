# Fractal Tree

> [roryclaasen.github.io/fractal-tree](https://roryclaasen.github.io/fractal-tree)

[p5](https://github.com/processing/p5.js) visualisation of a Fractal Tree.

## Contents

- [Fractal Tree](#fractal-tree)
- [Contents](#contents)
- [Options](#options)
- [Branches](#branches)
- [License](#license)

## Options

- [Tree](#tree)
  - [Length](#length)
  - [Max Branches](#max-branches)
  - [Angle](#angle)
  - [Branch Multiplier](#branch-multiplier)
  - [Reset Tree](#reset-tree)
- [Transform](#transform)
  - [X Offset](#x-offset)
  - [Y Offset](#y-offset)
  - [Scale](#scale)
  - [Rotate](#rotate)
  - [Center](#center)
  - [Reset Transform](#reset-transform)
- [Appearance](#appearance)
  - [Use Colors](#use-colors)
  - [Background](#background)
  - [Leaves](#leaves)
  - [Mirror](#mirror)
- [Save](#save)

### Tree

#### Length

> Default: `200`

Type: `number`

Min: `0`

Max: `500`

The length of the starting branch

#### Max Branches

> Default: `10`

Type: `number`

Min: `1`

Max: `20`

How many steps of branches are there

#### Angle

> Default: `0.79`

Type: `number`

Min: `-PI`

Max: `PI`

The angle of each child branch

#### Branch Multiplier

> Default: `0.67`

Type: `number`

Min: `0.1`

Max: `2`

Child branch length multiplier based of parent branch

#### Reset Tree

Type: `Button`

Resets all _Tree_ options to default values

### Transform

#### X Offset

> Default: `0`

Type: `number`

Min: `-width`

Max: `width`

Translate the Tree on the X axis

#### Y Offset

> Default: `0`

Type: `number`

Min: `-height`

Max: `height`

Translate the Tree on the Y axis

#### Scale

> Default: `1`

Type: `number`

Min: `0`

Max: `10`

Scale the Tree

#### Rotate

> Default: `0`

Type: `number`

Min: `-PI`

Max: `PI`

Rotate the Tree around the root of the tree

#### Center

Type: `Button`

Button to set the offsets centrally on the screen

#### Reset Transform

Type: `Button`

Resets all _Transform_ options to default values

### Appearance

#### Use Colors

> Default: `true`

Type: `boolean`

Branches have different colors. If false all branches are white

#### Background

> Default: `#000000`

Type: `color`

Background color of the window

#### Leaves

> Default: `true`

Type: `boolean`

Shows white dots on the ends of all the end branches

#### Mirror

> Default: `off`

Type: `string`

Options: `'off', 'y', 'x y'`

Mirrors the Tree on other axis. Start point remains the same

### Save

Type: `Button`

Saves the current drawing as a PNG file

## Branches

| Branch | Travis CI | Server |
|:-------|:----------|:-------|
| [Master](https://github.com/roryclaasen/fractal-tree/tree/master) | [![Build Status][CI-master]](https://travis-ci.com/roryclaasen/fractal-tree) | [GitHub Pages](https://roryclaasen.github.io/fractal-tree) |

## License

This project is licensed under the MIT License - see the [license file](LICENSE) for details

[CI-master]: https://travis-ci.com/roryclaasen/fractal-tree.svg?branch=master "Travis CI"
