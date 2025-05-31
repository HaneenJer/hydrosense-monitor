from .unit import Unit 
import heapq

# Manages all units in the system and for each unit holds it's readings
# units are saved as a dictionary where key is unitId and value is the object UnitReading

class UnitManager:
    def __init__(self):
        self.units = {}

    # add_unit - adds a new reading to a unit
    def add_unit_reading(self, new_reading, unit_id):
        if unit_id not in self.units:
            # create a unit 
            new_unit = Unit(unit_id)
            new_unit.add_reading(new_reading)
            self.units[unit_id] = new_unit
        else:
            self.units[unit_id].add_reading(new_reading)
    
    # returns a list of the latest 10 readings that need attention
    def get_unit_critical_readings(self, unit_id):
        if unit_id not in self.units:
            return [] 
        latest_need_attention = list(self.units[unit_id].latest_needs_attention)
        result = []
        for reading in latest_need_attention: 
            reading_dict = reading.to_dict()
            curr_data = {"unitId" : unit_id}
            for key in reading_dict:
                curr_data[key] = reading_dict[key]
            result.append(curr_data)
        return result 
