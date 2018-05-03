import React from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { withStyles } from 'material-ui/styles'

let id = 0
function createData(name, calories, fat, carbs, protein) {
  id += 1
  return { id, name, calories, fat, carbs, protein }
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Cookie', 307, 17.0, 51, 4.2),
  createData('Apple', 123, 33.0, 52, 2.3),
  createData('Grapefruit', 23, 23.0, 12, 8.3),
]

@withStyles({ td: { padding: '.9em !important' } })
class SimpleTable extends React.PureComponent {
  render = () =>
    <Table className="SimpleTable-Foods">
      <TableHead>
        <TableRow>
          <TableCell className={this.props.classes.td}>Dessert (100g serving)</TableCell>
          <TableCell className={this.props.classes.td} numeric>Calories</TableCell>
          <TableCell className={this.props.classes.td} numeric>Fat (g)</TableCell>
          <TableCell className={this.props.classes.td} numeric>Carbs (g)</TableCell>
          <TableCell className={this.props.classes.td} numeric>Protein (g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(n =>
          <TableRow key={n.id}>
            <TableCell className={this.props.classes.td}>{n.name}</TableCell>
            <TableCell className={this.props.classes.td} numeric>{n.calories}</TableCell>
            <TableCell className={this.props.classes.td} numeric>{n.fat}</TableCell>
            <TableCell className={this.props.classes.td} numeric>{n.carbs}</TableCell>
            <TableCell className={this.props.classes.td} numeric>{n.protein}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
}

export default SimpleTable