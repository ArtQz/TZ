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
      deleteRowStatus: 'disabled',
      deleteColumnStatus: 'disabled',
      addRowStatus: 'disabled',
      addColumnStatus: 'disabled',
      matrix: '',
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
      deleteRowStatus: null,
      addRowStatus: this.statusButton(array.length)['addButton'],
      deleteRowStatus: this.statusButton(array.length)['addDelete'],
      statusBarStyle: this.statusBar(this.props.dataTableA, this.props.dataTableB)['style'],
      statusBarText: this.statusBar(this.props.dataTableA, this.props.dataTableB)['text'],
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
        addColumnStatus: this.statusButton(array[0].length)['addButton'],
        deleteColumnStatus: this.statusButton(array[0].length)['deleteButton'],
        statusBarStyle: this.statusBar(this.props.dataTableA, this.props.dataTableB)['style'],
        statusBarText: this.statusBar(this.props.dataTableA, this.props.dataTableB)['text'],
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
      addRowStatus: this.statusButton(array.length)['addButton'],
      deleteRowStatus: this.statusButton(array.length)['deleteButton'],
      statusBarStyle: this.statusBar(this.props.dataTableA, this.props.dataTableB)['style'],
      statusBarText: this.statusBar(this.props.dataTableA, this.props.dataTableB)['text'],
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
        addColumnStatus: this.statusButton(array[0].length)['addButton'],
        deleteColumnStatus: this.statusButton(array[0].length)['deleteButton'],
        statusBarStyle: this.statusBar(this.props.dataTableA, this.props.dataTableB)['style'],
        statusBarText: this.statusBar(this.props.dataTableA, this.props.dataTableB)['text'],
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
  //доступность кнопки
  statusButton(arrayLength) {
    var status = {};

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

    return status;
  },
  statusBar (tableA, tableB) {
    var statusBar = {};
    if (tableA[0].length == tableB.length) {
      statusBar['style'] = {'background': '#5199db'};
    }
    else {
      statusBar['style'] = {'background': '#f6c1c0'};
      statusBar['text'] = 'Такие матрицы нельзя перемножить, так как количество столбцов матрицы А не равно количеству строк матрицы В.';
    }
    return statusBar;
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

    return (
      <div>
        <div style={this.state.statusBarStyle} className="statusBar">
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
