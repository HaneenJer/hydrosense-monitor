# HydroSense monitor

## Overview
"HydroSense monitor" is a fullstack app for monitoring hydroponic pods.
It collects sensor readings—pH, temperature, and EC—and displays the data in a clean, colorful dashboard.
You can monitor the readings and keep an eye on your pods that need attention.

## Features

 ### 📡 Collect sensor readings
 ### ⚙️ Analyze readings to identify latest units that need your attention
 ### 📊 Displays alerts in a user-friendly dashboard
   
##  Technology Stack
    Frontend: React, Vite, Typescript ,HTML, CSS
    Backend: python, Flask, pytest for testing 
    
##  Getting Started
###  Prerequisites
    Python 3.10+
    Node.js 18+ (includes npm)

###  Setup
   Follow these steps to set up the project locally:
   Clone the repository to your local machine:
   
    git clone https://github.com/HaneenJer/hydrosense-monitor.git
    
   ### Backend Setup
   Navigate to the project backend directory and create a virtual environment:

     cd backend
     python -m venv venv
     venv\Scripts\activate 

   Install the dependencies: 
    
     pip install -r requirements.txt

   Run the Flask server:

     python server.py

   By default, Flask server runs on http://localhost:5000

   ### Frontend Setup (React + TypeScript)
   Navigate to the project frontend directory and install the dependencies:

    cd frontend
    npm install

   Start the development server:

    npm run dev
    
   Open http://localhost:5173 to view the dashboard.

## CI pipeline
 Included in this project a github action workflow.  
 -Installs and tests the backend
 -Installs, tests, and builds the frontend 

##  Decisions
### Backend Design Decisions
   #### Object Oriented Design
   Modeled the system using three main classes:
   ##### Reading 
   a single reading with timestamp and readings data(ph,temp,ec) - objects of this class are comparable by timestamps
   ##### Unit
   a single unit with unitId and a list of all readings, and a min heap that holds the latest ten readings that need attention
   ##### UnitManager
   a manager that saves all system data in a map - key is the unitId and the value is the Unit object 

   #### RESTful API with Flask:

   - Flask for its simplicity and flexibility.
   - CORS is enabled via flask_cors to allow frontend integration.


 ### Open-Ended Enhancement: Alert Summary
  A summary box for the current table - how many readings need attention and how many don't 
  In real life scenario users might be managing more that one unit, and it's easy to lose track, 
  seeing the summary makes it easier to know which unit has more readings that need attention 

  #### future 
   In the future we can improve this by making it a severity measure 
   Additionally, visualizing these severity levels over time with graphs, focusing only on pods that need attention will further improve usability.
    
### Additional Test Cases
 Malformed JSON – server returns 400 status and an error message when post request is with malformed json 
   
