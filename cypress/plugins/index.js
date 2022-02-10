const cypress = require("cypress");
const xlsx=require('xlsx')
const fs=require('fs')
const path=require('path')
//const { Promise, resolve, config } = require("cypress/types/bluebird");
//const xlsx=require('xlsx') 
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task',{
    parseXlsx({filePath})
    {
      return new Promise((resolve, reject)=>{

        try
        {
          const jsonData = xlsx.parse(fs.readFileSync(filePath));
          resolve(jsonData);
        }catch(e)
        {
          reject(e);
        }
      });
    }
    //generateJSONFromExcel: generateJSONFromExcel,
  });
  //return null
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
}
const readXlsx =require('./reade-xlsx')
module.exports=(on,config)=>{
  on('task',{
    'readXlsx':readXlsx.read
  })
}

//function generateJSONFromExcel(agrs) {
  //const wb = xlsx.readFile(agrs.excelFilePath, { dateNF: "mm/dd/yyyy" });
  //const ws = wb.Sheets[agrs.sheetName];
  //return xlsx.utils.sheet_to_json(ws, { raw: false });
//} 