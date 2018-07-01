
# coding: utf-8

# In[34]:


import pandas as pd
import pymongo


# In[35]:


gdp_file = "Resources/API_NY_GDP.csv"
gdp_df = pd.read_csv(gdp_file,encoding = "ISO-8859-1")


# In[36]:


gdp_df= gdp_df.iloc[:,[0,1,2,58,59,60]]
gdp_df =gdp_df.dropna()


# In[16]:


gdp_df =gdp_df.dropna()


# In[37]:


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)


# In[38]:


db=client.gdp_data
db.gdp_data.drop()


# In[39]:


records =gdp_df.to_dict(orient="records")
    ##print(records)
db.gdp_data.insert_many(records) 


# In[41]:


job_file = "Resources/Data_Extract_From_Jobs.csv"
job_df = pd.read_csv(job_file,encoding = "ISO-8859-1")


# In[43]:


job_df = job_df.iloc[:,[0,1,2,3,6,7,8]]


# In[44]:


job_df = job_df.rename(columns= {'2014 [YR2014]':'2014','2015 [YR2015]':'2015','2016 [YR2016]':'2016'})


# In[45]:


job_df.head


# In[46]:


records =job_df.to_dict(orient="records")


# In[48]:


db=client.job_data
db.job_data.drop()
db.job_data.insert_many(records)

