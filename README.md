# Skygear Data Importer
Support importing CSV or JSON file to Skygear Cloud database

## Requirement
- NodeJS v7 or above

## Features
- [x] Import CSV file
- [ ] Import JSOn file

## Usage
```bash
npm install -g
skygear-data-importer -e 'your-endpoint' -k ' your-apikey' -t 'table-name' 'your-file-path'
```

## Command option
```
  Usage: skygear-data-importer [options] <file>


  Options:

    -e, --endpoint <endpoint>  Skygear endpoint
    -k, --apikey <apikey>      Skygear Master Key
    -t, --table <table>        Desired Table Name to upload
    -h, --help                 output usage information
```

## Attention
- Please make sure your skygear endpoint is at `Running` state
- CSV File should have the column title as the first row and comma-separated but not tab-separated
  
  Example:
  ```
  Item,Link,Type
  Aarhus,http://www.odaa.dk/,International Regional
  Alabama,http://open.alabama.gov/,US State
  Alberta,http://data.alberta.ca/,International Regional
  Albuquerque,http://www.cabq.gov/abq-data/,US City or County
  ```
