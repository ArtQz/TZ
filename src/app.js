//Modules
import React from 'react';
import './app.less';

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
//доступность кнопки
function statusButton(arrayLength) {
  var status = {};

  if (arrayLength == 10) {
    status['addButton'] = 'disabled';
    status['deleteButton'] = null;
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

  return status;
}

//Проверка на выбранную матрицу
function currentTarget(matrix, tableA, tableB) {
  var array;
  //проверяем какая матрица выбрана
  if (matrix == 'a') {
    array = tableA;
  } else if (matrix == 'b') array = tableB;
  return array;
}

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
//таблица C
var dataTableC = [
    [0, 1],
    [0, 1],
]
const values = {};

var TableA = React.createClass({
  getInitialState() {
    return {
      data: this.props.dataTableA,
      deleteRowStatus: 'disabled',
      deleteColumnStatus: 'disabled',
      addRowStatus: 'disabled',
      addColumnStatus: 'disabled',
      matrix: '',
      inputCell: '',
      values: {},
      statusBarStyle: {'background': '#bcbcbc'},
      statusBarText: ''
    };
  },
  onMatrixChanged(e) {
    var array;
    if (e.currentTarget.value == 'a') {
      array = this.props.dataTableA;
    } else if (e.currentTarget.value == 'b') array = this.props.dataTableB;
    //проверка на количество столбцов
    //на удаление
    if (array.length <= 2) {
      this.setState({
        matrix: e.currentTarget.value,
        deleteRowStatus: 'disabled'
      })
    }
    else {
      this.setState({
        matrix: e.currentTarget.value,
        deleteRowStatus: null
      })
    }
    //на добавление
    if (array.length >= 10) {
      this.setState({
        matrix: e.currentTarget.value,
        addRowStatus: 'disabled'
      })
    }
    else {
      this.setState({
        matrix: e.currentTarget.value,
        addRowStatus: null
      })
    }
    //проверка на количество колонок
    //на удаление
    if (array[0].length <= 2) {
      this.setState({
        matrix: e.currentTarget.value,
        deleteColumnStatus: 'disabled'
      })
    }
    else {
      this.setState({
        matrix: e.currentTarget.value,
        deleteColumnStatus: null
      })
    }
    //на добавление
    if (array[0].length >= 10) {
      this.setState({
        matrix: e.currentTarget.value,
        addColumnStatus: 'disabled'
      })
    }
    else {
      this.setState({
        matrix: e.currentTarget.value,
        addColumnStatus: null
      })
    }
    console.log('пидор выбрал матрицу: ' + e.currentTarget.value + ', в которой:');
    console.log('Количество строк: ' + array.length);
    console.log('Количество колонок: ' + array[0].length);
  },
  addRow() {
    var array = currentTarget(this.state.matrix, this.props.dataTableA, this.props.dataTableB);

    //последняя сртока
    var lastRow = array[array.length - 1];
    var index = [];
    for(var i=0; i<lastRow.length; i++) {
      index[i] = i;
    }

    //добавляем строку
    if (array.length <= 9) {
    array.push(index);
    //добавляем строку в таблицу Ц
    if (this.state.matrix == 'a') {
      var lastRowTableC = this.props.dataTableC[this.props.dataTableC.length - 1];
      var indexTableC = [];
      for(var i=0; i<lastRowTableC.length; i++) {
        indexTableC[i] = i;
      }

      this.props.dataTableC.push(indexTableC);
    }

    this.setState({
      data: array,
      deleteRowStatus: null,
      addRowStatus: statusButton(array.length)['addButton'],
      deleteRowStatus: statusButton(array.length)['addDelete'],
      statusBarStyle: statusBar(this.props.dataTableA, this.props.dataTableB)['style'],
      statusBarText: statusBar(this.props.dataTableA, this.props.dataTableB)['text'],
    });
    }
  },
  addColumn() {
    var array = currentTarget(this.state.matrix, this.props.dataTableA, this.props.dataTableB);

    //находим последнюю колонку
    var lastColumn = array[0][array[0].length -1]
    //добавляем колонку
    if (lastColumn <= 8) {
      for(var i=0; i<array.length; i++) {
        array[i].push(lastColumn + 1);
      }
      //добавляем колонку в таблицу Ц
      if (this.state.matrix == 'b') {
        for(var i=0; i<this.props.dataTableC.length; i++) {
           this.props.dataTableC[i].push(lastColumn + 1);
        }
      }
      console.log(this.props.dataTableC);
      this.setState({
        data: array,
        addColumnStatus: statusButton(array[0].length)['addButton'],
        deleteColumnStatus: statusButton(array[0].length)['deleteButton'],
        statusBarStyle: statusBar(this.props.dataTableA, this.props.dataTableB)['style'],
        statusBarText: statusBar(this.props.dataTableA, this.props.dataTableB)['text'],
      });
    }
  },
  deleteRow() {
    var array = currentTarget(this.state.matrix, this.props.dataTableA, this.props.dataTableB);

    //последняя сртока
    var lastRow = array[array.length - 1];
    //удаляем последнюю сртока
    if (array.length >= 3) {
      array.pop();
      if (this.state.matrix == 'a') {
        this.props.dataTableC.pop();
      }
    }

    this.setState({
      addRowStatus: statusButton(array.length)['addButton'],
      deleteRowStatus: statusButton(array.length)['deleteButton'],
      statusBarStyle: statusBar(this.props.dataTableA, this.props.dataTableB)['style'],
      statusBarText: statusBar(this.props.dataTableA, this.props.dataTableB)['text'],
    });
  },
  deleteColumn() {
    var array = currentTarget(this.state.matrix, this.props.dataTableA, this.props.dataTableB);

    //последняя колонка
    var lastColumn = array[0][array[0].length -1]

    //удаляем колонку
    if (lastColumn >= 2) {
      if (this.state.matrix == 'b') {
        for(var i=0; i<this.props.dataTableC.length; i++) {
          this.props.dataTableC[i].pop();
        }
      }
      for(var i=0; i<array.length; i++) {
        array[i].pop();
      }
      console.log(array[0].length);
      this.setState({
        data: array,
        addColumnStatus: statusButton(array[0].length)['addButton'],
        deleteColumnStatus: statusButton(array[0].length)['deleteButton'],
        statusBarStyle: statusBar(this.props.dataTableA, this.props.dataTableB)['style'],
        statusBarText: statusBar(this.props.dataTableA, this.props.dataTableB)['text'],
      });
    }
  },
  Result() {

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
        console.log(statusBar(this.props.dataTableA, this.props.dataTableB)['style']);
      }
    }
  },
  clearMatrix() {
    for (var key in values) {
      values[key] = '';
    }
    this.setState({values});
  },
  toChangeMatrix() {
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
  handleChange(fieldName, e) {
    var cellValue = e.target.value
                    .replace(/[^\d\.\,]/g, '')
                    .replace(',', '.')

    if (+cellValue >= 10) {
      cellValue = 10;
    }
    values[fieldName] = cellValue;
    this.setState({values});
  },
  render: function() {
    var arrayTableA = this.props.dataTableA;
    var arrayTableB = this.props.dataTableB;
    var arrayTableC = this.props.dataTableC;
    console.log(this.state.deleteColumnStatus);
    return (
      <div>
        <div style={this.state.statusBarStyle} className="statusBar">
          <div style={{textAlign: 'left', padding: '15px 55px'}}>
            <button className="result" onClick={this.Result}>Умножить матрицы</button>
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
            <button className="default" disabled={this.state.addRowStatus} onClick={this.addRow}>Добавить</button>
            <button className="default" disabled={this.state.deleteRowStatus} onClick={this.deleteRow}>Удалить</button>
            <span>строку</span>
          <br/>
            <button className="default" disabled={this.state.addColumnStatus} onClick={this.addColumn}>Добавить</button>
            <button className="default" disabled={this.state.deleteColumnStatus} onClick={this.deleteColumn}>Удалить</button>
            <span>столбец</span>
          </div>
          <div style={{width: '250px', padding: '15px 50px', color: 'red'}}>
            {this.state.statusBarText}
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
                                onChange={this.handleChange.bind(this, cellName)} />
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
                                onChange={this.handleChange.bind(this, cellName)} />
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
              <TableA dataTableA={dataTableA} dataTableB={dataTableB} dataTableC={dataTableC}/>
            </div>
        )
    }
});

React.render(
  <App />, document.body
  );
