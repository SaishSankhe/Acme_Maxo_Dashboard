import csv 
import json 

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []
      
    #read csv file
    with open(csvFilePath, encoding='utf-8') as csvf: 
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf) 

        #convert each csv row into python dict
        for row in csvReader: 
            #add this python dict to json array
            jsonArray.append(row)
  
    #convert python jsonArray to JSON String and write to file
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)
          
acme = r'acme_orders_2017.csv'
maxo = r'maxo_orders_2017.csv'
customers = r'customers.csv'
orders = r'orders.csv'
acmeOrders = r'acmeOrders.csv'
maxoOrders = r'maxoOrders.csv'
# products = r'products.csv'

acmeJsonFile = r'acme.json'
maxoJsonFile = r'maxo .json'
customersJsonFile = r'customers.json'
ordersJsonFile = r'orders.json'
acmeOrdersJsonFile = r'acmeOrders.json'
maxoOrdersJsonFile = r'maxoOrders.json'
# productsJsonFile = r'products.json'

csv_to_json(acme, acmeJsonFile)
csv_to_json(maxo, maxoJsonFile)
csv_to_json(customers, customersJsonFile)
csv_to_json(orders, ordersJsonFile)
csv_to_json(acmeOrders, acmeOrdersJsonFile)
csv_to_json(maxoOrders, maxoOrdersJsonFile)
# csv_to_json(products, productsJsonFile)
