# -*- coding: utf-8 -*-
"""
Created on Wed Jun 13 20:39:54 2018

@author: mitra
"""
import pandas as pd
import pymongo
from flask import (
    Flask,
    render_template,
    jsonify)

app = Flask(__name__)

@app.route("/")
def index():
   return render_template("index.html")

@app.route("/job")
def job():
   return render_template("Job.html")

# The default port used by MongoDB is 27017
# https://docs.mongodb.com/manual/reference/default-mongodb-port/
@app.route("/highest_gdp_growth")
def highest_gdp_growth():
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db=client.gdp_data
    gdp_data = pd.DataFrame(list(db.gdp_data.find()))
    gdp_data.sort_values('GDP_growth_percent',inplace =True,ascending =False)
    gdp_data = gdp_data.iloc[0:10]
    gdp_highest = [{"country_name":gdp_data.loc[:,'Country Name'].values.tolist(),
           "GDP_growth_percent":gdp_data.loc[:,'GDP_growth_percent'].values.tolist()
          }]
    return jsonify(gdp_highest)

@app.route("/top_gdp_countries")
def top_gdp_countries():
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db=client.gdp_data
    gdp_data = pd.DataFrame(list(db.gdp_data.find()))
    gdp_data.sort_values('2016',inplace =True,ascending =False)
    gdp_data = gdp_data.reset_index()
    gdp_data = gdp_data.iloc[[12,18,23,25,31,33,34,36,37,38],:]
    gdp_highest = [{"country_name":gdp_data.loc[:,'Country Name'].values.tolist(),
           "Average_GDP":gdp_data.loc[:,'2016'].values.tolist()
          }]
    return jsonify(gdp_highest)

@app.route("/job_sectors")
def job_sectors():
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db=client.gdp_data
    gdp_data = pd.DataFrame(list(db.gdp_data.find()))
    gdp_data.sort_values('2016',inplace =True,ascending =False)
    gdp_data = gdp_data.reset_index()
    gdp_data = gdp_data.iloc[[12,18,23,25,31,33,34,36,37,38],:]
    gdp_country = gdp_data.loc[:,'Country Name']
    db1 = client.job_data
    job_data = pd.DataFrame(list(db1.job_data.find()))
    job_data = job_data.loc[job_data['Country Name'].isin(gdp_country)]
    job_agri = job_data.loc[job_data['Series Code']=='SL.AGR.EMPL.ZS',['2016','Country Name']]
    job_agri = job_agri.rename(columns = {'2016':'Agriculture'})
    job_industry= job_data.loc[job_data['Series Code']=='SL.IND.EMPL.ZS',['2016','Country Name']]
    job_industry = job_industry.rename(columns = {'2016':'Industry'})
    job_service = job_data.loc[job_data['Series Code']=='SL.SRV.EMPL.ZS',['2016','Country Name']]
    job_service = job_service.rename(columns = {'2016':'Service'})
    jobs = pd.merge(job_agri,job_industry,on = 'Country Name')
    jobs = jobs.merge(job_service,on= 'Country Name')
    jobs = jobs.rename(columns = {'Country Name':'country_name'})
    job_by_sector_dict  = jobs.to_dict('records')
    ##job_by_sector = [{"country_name":jobs.loc[:,'Country Name'].values.tolist(),
          ## "Agriculture":jobs.loc[:,'agriculture'].values.tolist(),
           ##"Industry":jobs.loc[:,'industry'].values.tolist(),
            ##"Service":jobs.loc[:,'service'].values.tolist(),   
         ## }]
    
    print(jsonify(job_by_sector_dict))
    return (jsonify(job_by_sector_dict))


@app.route("/job_sectors_growing_countries")
def job_sectors_growing_countries():
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db=client.gdp_data
    gdp_data = pd.DataFrame(list(db.gdp_data.find()))
    gdp_data.sort_values('GDP_growth_percent',inplace =True,ascending =False)
    gdp_data = gdp_data.iloc[0:10]
    gdp_country =gdp_data.loc[:,'Country Name']
    db1 = client.job_data
    job_data = pd.DataFrame(list(db1.job_data.find()))
    job_data = job_data.loc[job_data['Country Name'].isin(gdp_country)]
    job_agri = job_data.loc[job_data['Series Code']=='SL.AGR.EMPL.ZS',['2016','Country Name']]
    job_agri = job_agri.rename(columns = {'2016':'Agriculture'})
    job_industry= job_data.loc[job_data['Series Code']=='SL.IND.EMPL.ZS',['2016','Country Name']]
    job_industry = job_industry.rename(columns = {'2016':'Industry'})
    job_service = job_data.loc[job_data['Series Code']=='SL.SRV.EMPL.ZS',['2016','Country Name']]
    job_service = job_service.rename(columns = {'2016':'Service'})
    jobs = pd.merge(job_agri,job_industry,on = 'Country Name')
    jobs = jobs.merge(job_service,on= 'Country Name')
    jobs = jobs.rename(columns = {'Country Name':'country_name'})
    job_by_sector_dict  = jobs.to_dict('records')
    
    return jsonify(job_by_sector_dict)
    
if __name__ == "__main__":
    app.run(debug=True)