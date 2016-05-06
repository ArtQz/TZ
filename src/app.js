//Modules
import React from 'react';
import './app.less';

var Calculator = React.createClass({
  getInitialState() {
    return {
      matrixA: [[null,null],[null,null]],
      matrixB: [[null,null],[null,null]],
      result: {},
      matrixTarget: null,
    };
  },
  onMatrixChanged(e) {
    this.setState({
      matrixTarget: e.target.value,
    });
  },
  addRow() {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB,
        matrixTarget = this.state.matrixTarget,
        matrix;
    if(matrixTarget == 'a') {
      matrix = matrixA;
    }
    else if (matrixTarget == 'b') {
      matrix = matrixB;
    }
    //находим последнюю строку
    var matrixLastRow = matrix[matrix.length - 1];
    var index = [];
    for(var i = 0; i < matrixLastRow.length; i++) {
      index[i] = null;
    }
    //добавляем строку
    if (matrix.length <= 9) {
      matrix.push(index);

      this.setState({
      });
    }
  },
  addColumn() {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB,
        matrixTarget = this.state.matrixTarget,
        matrix;
    if(matrixTarget == 'a') {
      matrix = matrixA;
    }
    else if (matrixTarget == 'b') {
      matrix = matrixB;
    }
    //добавляем колонку
    if (matrix[0].length <= 9) {
      for(var i = 0; i < matrix.length; i++) {
        matrix[i].push(null);
      }

      this.setState({
      });
    }
  },
  deleteRow() {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB,
        matrixTarget = this.state.matrixTarget,
        matrix;
    if(matrixTarget == 'a') {
      matrix = matrixA;
    }
    else if (matrixTarget == 'b') {
      matrix = matrixB;
    }

    //последняя сртока
    var lastRow = matrix[matrix.length - 1];
    //удаляем последнюю сртоку
    if (matrix.length >= 3) {
      matrix.pop();
    }

    this.setState({
    });
  },
  deleteColumn() {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB,
        matrixTarget = this.state.matrixTarget,
        matrix;
    if(matrixTarget == 'a') {
      matrix = matrixA;
    }
    else if (matrixTarget == 'b') {
      matrix = matrixB;
    }
    //удаляем колонку
    if (matrix[0].length >= 3) {
      for(var i=0; i<matrix.length; i++) {
        matrix[i].pop();
      }
      this.setState({
      });
    }
  },
  handleChange(matrixName, rowIndex, columnIndex, e) {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB,
        value = e.target.value.replace(/[^\d\.\,]/g, '').replace(',', '.');
    if(+value >= 10){
      value = 10;
    }
    if(matrixName == 'matrixA') {
      matrixA[rowIndex][columnIndex] = value;
    }
    else {
      matrixB[rowIndex][columnIndex] = value;
    }
    this.setState({matrixB, matrixA});
  },
  result() {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB,
        result = this.state.result;
    for(var i = 0; i < matrixA.length; i++) {
      for(var j = 0; j < matrixB[0].length; j++) {
        var sum = 0;
        for(var k= 0; k < matrixA[i].length; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        result[i+':'+j] = sum;
      }
    }
    this.setState({result});
  },
  clearMatrix() {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB,
        result = this.state.result;
        console.log(matrixA);
    for(var i = 0; i < matrixA.length; i++) {
      for(var j = 0; j < matrixA[i].length; j++) {
        matrixA[i][j] = null;
      }
    }
    for(var i = 0; i < matrixB.length; i++) {
      for(var j = 0; j < matrixB[i].length; j++) {
        matrixB[i][j] = null;
      }
    }
    result = {};
    this.setState({matrixA, matrixB, result});
  },
  toChangeMatrix() {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB
    this.setState({matrixA: matrixB, matrixB: matrixA,});
  },
  render: function() {
    var matrixA = this.state.matrixA,
        matrixB = this.state.matrixB,
        matrixC,
        result = this.state.result,
        matrixTarget = this.state.matrixTarget;

    //генерируем матрицу Ц
    var matrixCRow = [],
        matrixCColumn = [];
    for(var i = 0; i < matrixA.length; i++) {
      for(var j = 0; j < matrixB[0].length; j++) {
        matrixCColumn[j] = null;
      }
      matrixCRow[i] = matrixCColumn;
    }
    matrixC = matrixCRow;
    //определяем статус панели
    function statusBar (matrixA, matrixB) {
      var statusBar = {};
      if(matrixA[0].length == matrixB.length) {
        statusBar['style'] = {'background': '#5199db'};
      }
      else {
        statusBar['style'] = {'background': '#f6c1c0'};
        statusBar['text'] = 'Такие матрицы нельзя перемножить, так как количество столбцов матрицы А не равно количеству строк матрицы В.';
      }
      return statusBar;
    }
    //определяем статус кнопок
    function statusButton(matrixName, matrixA, matrixB) {
      var status = {},
          matrix;
      if(matrixName == null) {
        status['addButton'] = 'disabled';
        status['deleteButton'] = 'disabled';
      }
      else {
        if(matrixName == 'a') {
          matrix = matrixA;
        }
        else if(matrixName == 'b') {
          matrix = matrixB;
        }
        var matrixLength = matrix.length;

        if(matrixLength == 10) {
          status['addButton'] = 'disabled';
        }
        else {
          status['addButton'] = null;
        }
        if(matrixLength == 2) {
          status['deleteButton'] = 'disabled';
          status['addButton'] = null;
        }
        else {
          status['deleteButton'] = null;
        }
      }
      return status;
    }
    var statusButtonAddRow = statusButton(matrixTarget, matrixA, matrixB)['addButton'],
        statusButtonDeleteRow = statusButton(matrixTarget, matrixA, matrixB)['deleteButton'],
        statusButtonAddColumn = statusButton(matrixTarget, matrixA[0], matrixB[0])['addButton'],
        statusButtonDeleteColumn = statusButton(matrixTarget, matrixA[0], matrixB[0])['deleteButton'];

    return (
      <div>
        <div style={statusBar(matrixA, matrixB)['style']} className="statusBar">
          <div style={{textAlign: 'left', padding: '15px 55px'}}>
            <button className="result" onClick={this.result}>Умножить матрицы</button>
          </div>
          <div style={{textAlign: 'left', padding: '15px 50px'}}>
            <button className="default" onClick={this.clearMatrix}>Очистить матрицы</button><br/>
            <button className="default" onClick={this.toChangeMatrix}>Поменять матрицы местами</button>
          </div>
          <div style={{textAlign: 'left', padding: '15px 50px'}}>
            <input onChange={this.onMatrixChanged} type="radio" name="matrix" value="a" />
            <label htmlFor="a">матрица A</label>
            <input onChange={this.onMatrixChanged} type="radio" name="matrix" value="b" />
            <label htmlFor="b">матрица B</label>
          </div>
          <div style={{textAlign: 'left', padding: '15px 50px'}}>
            <button disabled={statusButtonAddRow} className="default" onClick={this.addRow}>Добавить</button>
            <button disabled={statusButtonDeleteRow} className="default" onClick={this.deleteRow}>Удалить</button>
            <span>строку</span>
          <br/>
            <button disabled={statusButtonAddColumn} className="default" onClick={this.addColumn}>Добавить</button>
            <button disabled={statusButtonDeleteColumn} className="default" onClick={this.deleteColumn}>Удалить</button>
            <span>столбец</span>
          </div>
          <div style={{width: '250px', padding: '15px 50px', color: 'red'}}>

          </div>
        </div>
        <div style={{display: 'inline-block', 'verticalAlign': 'top'}}>
          <div style={{display: 'table', borderSpacing: '5px'}}>
            <div style={{display: 'table-row'}}>
              <div style={{display: 'table-cell', position: 'relative'}}>
                <div className="bracket left"></div>
                <table style={{padding: '4px'}}>
                  <tbody>
                    {matrixC.map((row, rowIndex) => {
                      return (
                        <tr key={rowIndex} id={rowIndex}>
                          {row.map((cell, columnIndex) => {
                            var matrixCellName = rowIndex+':'+columnIndex;
                            return (
                              <td key={columnIndex} id={columnIndex}>
                                <input
                                disabled="disabled"
                                placeholder={'a' + (rowIndex+1) +',' + (columnIndex+1)}
                                className="tz"
                                value={result[matrixCellName]} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="bracket right"></div>
              </div>
              <div style={{display: 'table-cell', position: 'relative'}}>
                <div className="bracket left"></div>
                <table style={{padding: '4px'}}>
                  <tbody>
                    {matrixA.map((row, rowIndex) => {
                      return (
                        <tr key={rowIndex} id={rowIndex}>
                          {row.map((cell, columnIndex) => {
                            var matrixName = 'matrixA';
                            return (
                              <td key={columnIndex} id={columnIndex}>
                                <input
                                placeholder={'a' + (rowIndex+1) +',' + (columnIndex+1)}
                                className="tz"
                                value={cell}
                                onChange={this.handleChange.bind(this, matrixName, rowIndex, columnIndex)} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="bracket right"></div>
              </div>
            </div>
            <div style={{display: 'table-row'}}>
              <div style={{display: 'table-cell', position: 'relative'}}>
                <div className="bracket left"></div>
                <table style={{padding: '4px'}}>
                  <tbody>
                    {matrixB.map((row, rowIndex) => {
                      return (
                        <tr key={rowIndex} id={rowIndex}>
                          {row.map((cell, columnIndex) => {
                            var matrixName = 'matrixB';
                            return (
                              <td key={columnIndex} id={columnIndex}>
                                <input
                                placeholder={'b' + (rowIndex+1) +',' + (columnIndex+1)}
                                className="tz"
                                value={cell}
                                onChange={this.handleChange.bind(this, matrixName, rowIndex, columnIndex)} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="bracket right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var App = React.createClass({

    render: function () {

        return (
            <div>
              <Calculator />
            </div>
        )
    }
});

React.render(
  <App />, document.body
  );
