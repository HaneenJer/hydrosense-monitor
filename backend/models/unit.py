import heapq

# Unit class describes a specific Unit and holds all unit Readings in one place
# readings - List that holds all readings for this specific unit ordered by ARRIVAL date! 
# latest_needs_attention - min_heap of size 10 at most, holds that latest 10 readings that need attention

class Unit:
    def __init__(self,unit_id):
        self.unit_id = unit_id
        self.readings = []
        self.latest_needs_attention = []
        self.MAX_SIZE = 10 

    def add_reading(self, new_reading):
        self.readings.append(new_reading)
        if new_reading.classify() == "Healthy":
            return    
        if len(self.latest_needs_attention) == self.MAX_SIZE:
            if self.latest_needs_attention[0] < new_reading:
                # oldest reading in the heap is older that the new reading pop and add the new reading
                heapq.heappop(self.latest_needs_attention)
        heapq.heappush(self.latest_needs_attention,new_reading)

            
