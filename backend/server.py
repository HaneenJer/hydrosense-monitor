from flask import Flask, request
from flask_cors import CORS
from models import Reading, UnitManager

app = Flask(__name__)
CORS(app)

# Save all units in unit Manager 
unit_manager = UnitManager()

# this is for internal use only 
@app.route('/api/debug-units')
def debug_units():
    print("DEBUGGING")
    result = {}
    for unit_id in unit_manager.units:
        readings = [r.to_dict() for r in unit_manager.units[unit_id].readings]
        result[unit_id] = readings
    print(result)
    return result


def validate_data(data):
    # Check if rquired data exists
    required = {"unitId", "timestamp", "readings"}
    if not required.issubset(data.keys()):
        return False, f"Missing data"
    
    # unit id is a non empty str 
    if not isinstance(data["unitId"], str) or data["unitId"]=="":
        return False, "unitId is not valid"
    
    # check timestamp string 
    if not isinstance(data["timestamp"], str) or not data["timestamp"].strip():
        return False, "timestamp is not valid"
    
    # check reading - should include pH, temp, ec 
    readings = data["readings"]
    required_readings = {"pH", "temp", "ec"}
    if not isinstance(readings, dict) or not required_readings.issubset(readings.keys()):
        return False, "Missing Reading data"

    return True, "Valid"

@app.route('/api/sensor', methods=['POST'])
def add_reading():
    if not request.is_json:
        return {"status": "error", "message": "malformed"}, 400

    data = request.get_json(silent=True)
    if data is None:
        return {"status": "error", "message": "malformed"}, 400
    
    data = request.get_json()
    print(data)
    valid, error = validate_data(data)
    if not valid:
        return {"status": "error","message": error}
    
    # data is valid create reading 
    readings_data = data["readings"]
    new_reading = Reading(data["timestamp"], readings_data["pH"], readings_data["temp"], readings_data["ec"])
    unit_manager.add_unit_reading(new_reading,data["unitId"])

    return {"status":"OK", "classification" : new_reading.classify()}

@app.route('/api/alerts', methods=['GET'])
def get_latest_need_attention():
    unit_id = request.args.get("unitId")
    if not unit_id in unit_manager.units:
        return {"status" : "ERROR", "message": f"unit {unit_id} does not exist"}
    print( unit_manager.get_unit_critical_readings(unit_id))
    return {"status":"OK", "message" : unit_manager.get_unit_critical_readings(unit_id)}

@app.route('/api/hello')
def hello():
    return {'message': 'Hello From flask'}

if __name__ == '__main__':
    app.run(debug=True)