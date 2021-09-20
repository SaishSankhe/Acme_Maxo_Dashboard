import pandas as pd

# read the files
acme = pd.read_csv('acme_orders_2017.csv')
maxo = pd.read_csv('maxo_orders_2017.csv')

# get only customer related data
customers = acme[['CUSTOMER_ID', 'NAME', 'GENDER', 'STREET_ADDRESS', 'CITY', 'POSTAL_CODE', 'COUNTRY']].copy()

# drop duplicates based on customer_id and city combined
customers = customers.drop_duplicates(subset = ['CUSTOMER_ID', 'CITY'])

# get maxo customers' data
maxo_customers = maxo[['CUSTOMER_ID', 'NAME', 'GENDER', 'STREET_ADDRESS', 'CITY', 'POSTAL_CODE', 'COUNTRY']].copy()

# drop duplicates based on customer_id and city combined
maxo_customers = maxo_customers.drop_duplicates(subset = ['CUSTOMER_ID', 'CITY'])

# append maxo customers' data to all customers
customers = customers.append(maxo_customers)

# drop duplicates based on customer_id and city combined - these are final customers
customers = customers.drop_duplicates(subset = ['CUSTOMER_ID', 'CITY'])
customers[['CUSTOMER_ID']] = customers[['CUSTOMER_ID']].astype(int)
customers = customers.sort_values(by = ['CUSTOMER_ID'])

# get all products from both data files
products = acme[['PRODUCT_ID']].copy()
maxo_products = maxo[['PRODUCT_ID']].copy()
products = products.append(maxo_products)
products = products.drop_duplicates(subset = ['PRODUCT_ID'])
products[['PRODUCT_ID']] = products[['PRODUCT_ID']].astype(int)
products.set_index('PRODUCT_ID', inplace=True)
products = products.sort_values(by = ['PRODUCT_ID'])

# get all order data from both data files
orders = acme[['ORDER_ID', 'CUSTOMER_ID', 'ORDER_DATE', 'SHIPPING_DATE', 'PRODUCT_ID']].copy()
maxo_orders = maxo[['ORDER_ID', 'CUSTOMER_ID', 'ORDER_DATE', 'SHIPPING_DATE', 'PRODUCT_ID']].copy()

orders = orders.append(maxo_orders)
orders[['ORDER_ID', 'CUSTOMER_ID', 'PRODUCT_ID']] = orders[['ORDER_ID', 'CUSTOMER_ID', 'PRODUCT_ID']].astype(int)
orders = orders.sort_values(by = ['ORDER_ID'])
orders.set_index('ORDER_ID', inplace=True)

customers.to_csv('customers.csv', index=False)
products.to_csv('products.csv', index=True)
orders.to_csv('orders.csv', index=True)
