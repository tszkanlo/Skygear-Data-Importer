# Skygear Data Importer
This importer provides a command line interface for importing CSVs to the [Skygear](https://skygear.io) cloud database.

## Requirement
- [NodeJS v7 or above](https://nodejs.org/en/download/)

## Note
- Use comma-separated CSV
- The first row of the CSV will be the column name of table in the database. Example:
  ```
  Item,Link,Type
  Aarhus,http://www.odaa.dk/,International Regional
  Alabama,http://open.alabama.gov/,US State
  Alberta,http://data.alberta.ca/,International Regional
  Albuquerque,http://www.cabq.gov/abq-data/,US City or County
  ```
- Before you import the CSV, make sure your Skygear app is 'Running'
  ![Skygear](https://i.imgur.com/1QshNPR.png)
  
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


