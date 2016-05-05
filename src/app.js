//Modules
import React from 'react';
import './app.less';

//таблица A
var dataTableA = [
    [0, 1],
    [0, 1],
]
//таблица B
var dataTableB = [
    [0, 1],
    [0, 1],
]

var TableA = React.createClass({
  getInitialState() {
    return {
      data: this.props.dataTableA,
      matrix: null,
      values: {},
      statusBarStyle: {'background': '#bcbcbc'},
      statusBarText: ''
    };
  },
  onMatrixChanged(e) {
    this.setState({
      matrix: e.currentTarget.value,
    });
  },
  addRow() {
    var array = this.currentTarget(this.state.matrix, this.props.dataTableA, this.props.dataTableB);

    //последняя сртока
    var lastRow = array[array.length - 1];
    var index = [];
    for(var i=0; i<lastRow.length; i++) {
      index[i] = i;
    }

    //добавляем строку
    if (array.length <= 9) {
    array.push(index);

    this.setState({
      data: array,
    });
    }
  },
  addColumn() {
    var array = this.currentTarget(this.state.matrix, this.props.dataTableA, this.props.dataTableB);

    //находим последнюю колонку
    var lastColumn = array[0][array[0].length -1]
    //добавляем колонку
    if (lastColumn <= 8) {
      for(var i=0; i<array.length; i++) {
        array[i].push(lastColumn + 1);
      }

      this.setState({
        data: array,
      });
    }
  },
  deleteRow() {
    var array = this.currentTarget(this.state.matrix, this.props.dataTableA, this.props.dataTableB);

    //последняя сртока
    var lastRow = array[array.length - 1];
    //удаляем последнюю сртоку
    if (array.length >= 3) {
      array.pop();
    }

    this.setState({
    });
  },
  deleteColumn() {
    var array = this.currentTarget(this.state.matrix, this.props.dataTableA, this.props.dataTableB);

    //последняя колонка
    var lastColumn = array[0][array[0].length -1]

    //удаляем колонку
    if (lastColumn >= 2) {
      for(var i=0; i<array.length; i++) {
        array[i].pop();
      }
      this.setState({
        data: array,
      });
    }
  },
  Result(values) {

    for(var i=0; i<this.props.dataTableA.length; i++){
      for(var j=0; j<this.props.dataTableB[0].length; j++){

        var sum = 0;
        for(var k=0; k<this.props.dataTableA[i].length; k++){
          var keyA = 'a' + (i+1) +'_'+ (k+1);
          var keyB = 'b' + (k+1) +'_'+ (j+1);
          var keyC = 'c' + (i+1) +':'+ (j+1);

          sum += this.refs[keyA].props.value * this.refs[keyB].props.value;

        }

        values[keyC] = sum;
        this.setState({values});
      }
    }
  },
  clearMatrix(values) {
    for (var key in values) {
      values[key] = '';
    }
    this.setState({values});
  },
  toChangeMatrix(values) {
    var valuesA = {};
    var valuesB = {};
    for (var key in values) {
      if (key.replace(/(\w{1})(\d{1}):(\d{1})/, '$1') == 'a') {
        var keyA = key.replace(/(\w{1})(\d{1}):(\d{1})/, "b$3:$2");
        valuesA[keyA] = values[key];
      }
      else if (key.replace(/(\w{1})(\d{1}):(\d{1})/, '$1') == 'b') {
        var keyB= key.replace(/(\w{1})(\d{1}):(\d{1})/, "a$3:$2");
        valuesB[keyB] = values[key];
      }
    }

    for (var keyA in valuesA) {
      values[keyA] = valuesA[keyA];
    }
    for (var keyB in valuesB) {
      values[keyB] = valuesB[keyB];
    }

    this.setState({values});
  },
  handleChange(fieldName, values, e) {
    var values = values;
    var cellValue = e.target.value
                    .replace(/[^\d\.\,]/g, '')
                    .replace(',', '.')

    if (+cellValue >= 10) {
      cellValue = 10;
    }


    values[fieldName] = cellValue;

    this.setState({values});
  },
  //Проверка на выбранную матрицу
  currentTarget(matrix, tableA, tableB) {
    var array;
    //проверяем какая матрица выбрана
    if (matrix == 'a') {
      array = tableA;
    } else if (matrix == 'b') array = tableB;
    return array;
  },
  render: function() {
    var arrayTableA = this.props.dataTableA;
    var arrayTableB = this.props.dataTableB;
    //генерируем таблицу Ц
    var arrayTableCRow = [],
        arrayTableCColumn = [];
    for(var i=0; i<this.props.dataTableA.length; i++){
      for(var j=0; j<this.props.dataTableB[0].length; j++){
        arrayTableCColumn[j] = j;
      }
      arrayTableCRow[i] = arrayTableCColumn;
    }
    var arrayTableC = arrayTableCRow;
    const values = {...this.state.values};
    //
    function currentTarget(matrix, tableA, tableB) {
      var array;
      //проверяем какая матрица выбрана
      if (matrix == 'a') {
        array = tableA;
      } else if (matrix == 'b') array = tableB;
      return array;
    }
    //определяем статус кнопок
    function statusButton(matrix, tableA, tableB) {
      var status = {};
      var array;

      if (matrix == null) {
        status['addButton'] = 'disabled';
        status['deleteButton'] = 'disabled';
      }
      else {
        if (matrix == 'a') {
          array = tableA;
        }
        else if (matrix == 'b') array = tableB;
        var arrayLength = array.length;

        if (arrayLength == 10) {
          status['addButton'] = 'disabled';
        }
        else {
          status['addButton'] = null;
        }
        if (arrayLength == 2) {
          status['deleteButton'] = 'disabled';
          status['addButton'] = null;
        }
        else {
          status['deleteButton'] = null;
        }
      }
      return status;
    }
    var statusButtonAddRow, statusButtonDeleteRow, statusButtonAddColumn, statusButtonDeleteColumn;
    statusButtonAddRow = statusButton(this.state.matrix, arrayTableA, arrayTableB)['addButton'];
    statusButtonDeleteRow = statusButton(this.state.matrix, arrayTableA, arrayTableB)['deleteButton'];
    statusButtonAddColumn = statusButton(this.state.matrix, arrayTableA[0], arrayTableB[0])['addButton'];
    statusButtonDeleteColumn = statusButton(this.state.matrix, arrayTableA[0], arrayTableB[0])['deleteButton'];

    //определяем статус кнопок
    function statusBar (tableA, tableB) {
      var statusBar = {};
      if (tableA[0].length == tableB.length) {
        statusBar['style'] = {'background': '#5199db'};
      }
      else {
        statusBar['style'] = {'background': '#f6c1c0'};
        statusBar['text'] = 'Такие матрицы нельзя перемножить, так как количество столбцов матрицы А не равно количеству строк матрицы В.';
      }
      return statusBar;
    }

    return (
      <div>
        <div style={statusBar(arrayTableA, arrayTableB)['style']} className="statusBar">
          <div style={{textAlign: 'left', padding: '15px 55px'}}>
            <button className="result" onClick={this.Result.bind(this, values)}>Умножить матрицы</button>
          </div>
          <div style={{textAlign: 'left', padding: '15px 50px'}}>
            <button className="default" onClick={this.clearMatrix.bind(this, values)}>Очистить матрицы</button><br/>
            <button className="default" onClick={this.toChangeMatrix.bind(this, values)}>Поменять матрицы местами</button>
          </div>
          <div style={{textAlign: 'left', padding: '15px 50px'}}>
            <input onChange={this.onMatrixChanged} type="radio" name="matrix" value="a" />
            <label htmlFor="a">матрица A</label>
            <input onChange={this.onMatrixChanged} type="radio" name="matrix" value="b" />
            <label htmlFor="b">матрица B</label>
          </div>
          <div style={{textAlign: 'left', padding: '15px 50px'}}>
            <button className="default" disabled={statusButtonAddRow} onClick={this.addRow}>Добавить</button>
            <button className="default" disabled={statusButtonDeleteRow} onClick={this.deleteRow}>Удалить</button>
            <span>строку</span>
          <br/>
            <button className="default" disabled={statusButtonAddColumn} onClick={this.addColumn}>Добавить</button>
            <button className="default" disabled={statusButtonDeleteColumn} onClick={this.deleteColumn}>Удалить</button>
            <span>столбец</span>
          </div>
          <div style={{width: '250px', padding: '15px 50px', color: 'red'}}>
            {statusBar(arrayTableA, arrayTableB)['text']}
          </div>
        </div>
        <div style={{display: 'inline-block', 'verticalAlign': 'top'}}>
          <div style={{display: 'table', borderSpacing: '5px'}}>
            <div style={{display: 'table-row'}}>
              <div style={{display: 'table-cell', position: 'relative'}}>
                <div className="bracket left"></div>
                <table style={{padding: '4px'}}>
                  <tbody>
                    {arrayTableC.map((row, rowIndex) => {
                      return (
                        <tr key={rowIndex} id={rowIndex}>
                          {row.map((cell, cellIndex) => {
                            var cellName = 'c' + (rowIndex+1) + ':' + (cellIndex+1);
                            return (
                              <td key={cellIndex} id={cell}>
                                <input
                                disabled="disabled"
                                placeholder={'c' + (rowIndex+1) +',' + (cellIndex+1)}
                                className="tz"
                                value={values[cellName]} />
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
                    {arrayTableA.map((row, rowIndex) => {
                      return (
                        <tr key={rowIndex} id={rowIndex}>
                          {row.map((cell, cellIndex) => {
                            var cellName = 'a' + (rowIndex+1) + ':' + (cellIndex+1);
                            return (
                              <td key={cellIndex} id={cell}>
                                <input
                                ref={'a' + (rowIndex+1) +'_' + (cellIndex+1)}
                                placeholder={'a' + (rowIndex+1) +',' + (cellIndex+1)}
                                className="tz"
                                value={values[cellName]}
                                onChange={this.handleChange.bind(this, cellName, values)} />
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
                    {arrayTableB.map((row, rowIndex) => {
                      return (
                        <tr key={rowIndex} id={rowIndex}>
                          {row.map((cell, cellIndex) => {
                            var cellName = 'b' + (rowIndex+1) + ':' + (cellIndex+1);
                            return (
                              <td key={cellIndex} id={cell}>
                                <input
                                ref={'b' + (rowIndex+1) +'_' + (cellIndex+1)}
                                placeholder={'b' + (rowIndex+1) +',' + (cellIndex+1)}
                                className="tz"
                                value={values[cellName]}
                                onChange={this.handleChange.bind(this, cellName, values)} />
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
              <TableA dataTableA={dataTableA} dataTableB={dataTableB} />
            </div>
        )
    }
});

React.render(
  <App />, document.body
  );
