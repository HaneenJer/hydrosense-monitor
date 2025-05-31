from datetime import datetime

# This class describes a specific reading data 
# This class is comparable - might want to use it in a structure that require comparable objects 
# Can classify is this reading needs any attention or not 

class Reading: 
    def __init__(self,timestamp,ph,temp,ec): 
        self.timestamp = timestamp
        self.ph = ph
        self.temp = temp
        self.ec = ec
    
    def classify(self):
        if self.ph<5.5 or self.ph>7.0:
            return "Needs Attention"
        return "Healthy"
    
    def __lt__(self,other):
        curr_time_parsed = datetime.strptime(self.timestamp, "%Y-%m-%dT%H:%M:%SZ")
        other_time_parsed = datetime.strptime(other.timestamp, "%Y-%m-%dT%H:%M:%SZ")
        return curr_time_parsed < other_time_parsed
    
    # returns data as a dictionary 
    def to_dict(self):
        return {"timestamp" : self.timestamp,
                "readings": {
                    "pH" : self.ph,
                    "temp" : self.temp, 
                    "ec" : self.ec 
                }}
