import pandas as pd

# read txt file
acme = pd.read_csv('../ACME_FILTER_ORDERS_2017.txt', sep="|")
# drop rows with all NANs
acme = acme.dropna(how="all")
# drop state and product_category columns to make both datasets same
acme = acme.drop(columns = ['STATE', 'PRODUCT_CATEGORY'])
# convert order id to string
acme['ORDER_ID'] = acme['ORDER_ID'].astype(int).apply(str)
acme['CUSTOMER_ID'] = acme['CUSTOMER_ID'].astype(int)
acme['PRODUCT_ID'] = acme['PRODUCT_ID'].astype(int)
# convert string to sentence case, instead of upper case
acme['NAME'] = acme['NAME'].str.upper().str.title()
acme['GENDER'] = acme['GENDER'].str.upper().str.title()
acme['STREET_ADDRESS'] = acme['STREET_ADDRESS'].str.upper().str.title()
acme['CITY'] = acme['CITY'].str.upper().str.title()

# read csv file
maxo = pd.read_csv('../MAXO_FILTER_ORDERS_2017.csv', sep="|")
# drop columns to make both datasets same
maxo = maxo.drop(columns = ['DESCRIPTION', 'YEAR_OF_BIRTH', 'PRODUCT_NAME', 'CATEGORY'])
# rename columns to match acme data
maxo = maxo.rename(columns = {'SHIP_DATE': 'SHIPPING_DATE', 'ADDRESS_LINE_1': 'STREET_ADDRESS'})
# convert order id to string
maxo['ORDER_ID'] = maxo['ORDER_ID'].apply(str)

# export data to csv
acme.to_csv('acme_orders_2017.csv', index=False)
maxo.to_csv('maxo_orders_2017.csv', index=False)