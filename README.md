# BC_13_Biodiversity_Site
Challenge for Week 13 - Biodiversity

## Overview
This repository holds the HTML index file, Javascript charts.js file, and source JSON data file for the Bootcamp Week 13.  

This interactive site is hosted here: https://klbrabec.github.io/BC_13_Biodiversity_Site/

## Purpose
The purpose of this project is to build an interactive dashboard to allow participants in a biodiversity study to see thier results.  Participants were issued an individual ID number that is selected from a drop down list.  This selection triggers the site to update with the information tracked from their participation. 

Data is tracked on the following: 
- Medadata 
  - ID - ID Number assigned to each participant. 
  - Ethnicity - Ethnicity of the participant 
  - Gender - Gender of the participant 
  - Age - Age of the participant 
  - Location - Location of the participant (City/State) 
  - BBType - Belly Button Type (Innie/Outie) 
  - WFRQ - Wash Frequency 
- Sample Data 
  - OTU ID - the Operational Taxonomy Unit 
  - Sample Value - The number of colonies within the OTU
  - Names - The bacteria included within the OTU 

## Assumptions
Data was not structured in such a way that it allowed easy of sorting to gather the top 10 samples for the bar chart.  An assumption was made that values were 'pre sorted' and remained grouped together when they were passed through the functions that established variables and drew the charts. 

Code was written in such a way that it would allow for a different samples.json chart to be put in place for analysis (as long as the structure is the same)  This will allow for additional trials if needed. 

(And do people really NOT scrub their belly buttons?  ICK!)


