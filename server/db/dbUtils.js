const fs = require('fs');
const { TABLE_NAMES } = require('./tables/tables');

let TEST_MODE = false;

exports.setTestMode = (testMode) => {
    TEST_MODE = testMode;
};

const getTablePath = (tableName) => TEST_MODE ? `./db/tables/test/${tableName}.json` : `./db/tables/${tableName}.json`;

exports.getTable = (tableName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(getTablePath(tableName), 'utf8' , (err, data) => resolve(err ? [] : JSON.parse(data)));
    });
};

exports.updateTable = (tableName, newTable) => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(newTable) && Object.values(TABLE_NAMES).includes(tableName)) {
            fs.writeFile(getTablePath(tableName), `${JSON.stringify(newTable)}`, (err) => {
                err ? reject(err) : resolve(newTable);
            });
        } else {
            reject(new Error(`Error while ${tableName} updating`));
        }
    });
}

exports.generateId = async (tableName) => {
    let table = await this.getTable(tableName);
    let maxId = 0;
    table.forEach(item =>{
        if (item.id > maxId) maxId = item.id;
    });
    return ++maxId;
}

exports.resetTestTables = () => {
    const initTestMode = TEST_MODE;
    this.setTestMode(true);
    const tableNames = Object.values(TABLE_NAMES);
    tableNames.forEach(async (tableName, idx) => {
        await this.updateTable(tableName, []);
        if (idx === tableNames.length) this.setTestMode(initTestMode);
    });
}