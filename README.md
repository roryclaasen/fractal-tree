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

- [Tree](#treelength)
  - [Tree.Length](#treelength)
  - [Tree.Max_Branches](#treemax_branches)
  - [Tree.Angle](#treeangle)
  - [Tree.Branch_Multiplier](#treebranch_multiplier)
  - [Tree.Reset](#treereset)
- [Mutate](#mutateactive)
  - [Mutate.Active](#mutateactive)
  - [Mutate.Branch](#mutatebranch)
  - [Mutate.Angle](#mutateangle)
  - [Mutate.Branch_Multiplier](#mutatebranch_multiplier)
  - [Mutate.Make](#mutatemake)
  - [Mutate.Reset](#mutatereset)
- [Transform](#transformx_offset)
  - [Transform.X_Offset](#transformx_offset)
  - [Transform.Y_Offset](#transformy_offset)
  - [Transform.Scale](#transformscale)
  - [Transform.Rotate](#transformrotate)
  - [Transform.Center](#transformcenter)
  - [Transform.Reset](#transformreset)
- [Appearance](#appearanceuse_colors)
  - [Appearance.Use_Colors](#appearanceuse_colors)
  - [Appearance.Background](#appearancebackground)
  - [Appearance.Leaves](#appearanceleaves)
  - [Appearance.Mirror](#appearancemirror)
- [Save](#save)

### Tree.Length

> Default: `200`

Type: `number`

Min: `0`

Max: `500`

The length of the starting branch

### Tree.Max_Branches

> Default: `10`

Type: `number`

Min: `1`

Max: `20`

How many steps of branches are there

### Tree.Angle

> Default: `0.79`

Type: `number`

Min: `-PI`

Max: `PI`

The angle of each child branch

### Tree.Branch_Multiplier

> Default: `0.67`

Type: `number`

Min: `0.1`

Max: `2`

Child branch length multiplier based of parent branch

### Tree.Reset

Type: `Button`

Resets all _Tree_ options to default values

### Mutate.Active

> Default: `false`

Type: `boolean`

If the tree will get mutated or not

### Mutate.Branch

> Default: `1`

Type: `number`

Min: `0`

Max: `1`

Percentage chance of the child Branches being created

### Mutate.Angle

> Default: `0`

Type: `number`

Min: `0`

Max: `PI`

Intensity of angle interference

__Example__

```javascript
tree.angle += Math.random() * mutate.angle;
```

### Mutate.Branch_Multiplier

> Default: `0`

Type: `number`

Min: `0`

Max: `1`

Intensity of angle interference

__Example__

```javascript
tree.branchMultiplier += (mutate.branchMultiplier * Math.random()) - (mutate.branchMultiplier / 2);
```

### Mutate.Make

Type: `Button`

Regenerates the tree with new values

### Mutate.Reset

Type: `Button`

Resets all _Mutate_ options to default values

### Transform.X_Offset

> Default: `0`

Type: `number`

Min: `-width`

Max: `width`

Translate the Tree on the X axis

### Transform.Y_Offset

> Default: `0`

Type: `number`

Min: `-height`

Max: `height`

Translate the Tree on the Y axis

### Transform.Scale

> Default: `1`

Type: `number`

Min: `0`

Max: `5`

Scale the Tree

### Transform.Rotate

> Default: `0`

Type: `number`

Min: `-PI`

Max: `PI`

Rotate the Tree around the root of the tree

### Transform.Center

Type: `Button`

Button to set the offsets centrally on the screen

### Transform.Reset

Type: `Button`

Resets all _Transform_ options to default values

### Appearance.Use_Colors

> Default: `true`

Type: `boolean`

Branches have different colors. If false all branches are white

### Appearance.Background

> Default: `#000000`

Type: `color`

Background color of the window

### Appearance.Leaves

> Default: `true`

Type: `boolean`

Shows white dots on the ends of all the end branches

### Appearance.Mirror

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
