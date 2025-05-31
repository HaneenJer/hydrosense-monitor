import pytest
from server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_post_sensor_invalid_payload(client):
    # Try adding a reading with messing unit id 
    invalid_payload = {
        "timestamp": "2025-05-24T12:34:56Z",
        "readings": {
            "pH": 6.8,
            "temp": 23.5,
            "ec": 1.1
        }
    }
    response = client.post('/api/sensor', json=invalid_payload)
    data = response.get_json()
    assert response.status_code == 200
    assert data["status"] == "error"
    assert data["message"] == "Missing data"

    # non valid unitId (empty)
    invalid_payload = {
        "unitId" : "",
        "timestamp": "2025-05-24T12:34:56Z",
        "readings": {
            "pH": 6.8,
            "temp": 23.5,
            "ec": 1.1
        }
    }
    response = client.post('/api/sensor', json=invalid_payload)
    data = response.get_json()
    assert response.status_code == 200
    assert data["status"] == "error"
    assert data["message"] == "unitId is not valid"

    # Missing reading data 
    invalid_payload = {
        "unitId" : "unit-123",
        "timestamp": "2025-05-24T12:34:56Z",
        "readings": {
            "temp": 23.5,
            "ec": 1.1
        }
    }
    response = client.post('/api/sensor', json=invalid_payload)
    data = response.get_json()
    assert response.status_code == 200
    assert data["status"] == "error"
    assert data["message"] == "Missing Reading data"

def test_sensor_post_and_alerts(client):
    # Test Classification 
    payload = {
        "unitId": "unit-1",
        "timestamp": "2025-05-24T12:34:56Z",
        "readings": {"pH": 6.5, "temp": 22.1, "ec": 1.2}
    }
    res = client.post("/api/sensor", json=payload)
    data = res.get_json()
    assert res.status_code == 200
    assert data["status"] == "OK"
    assert data["classification"] == "Healthy"
    payload["readings"]["pH"] = 8.0
    res = client.post("/api/sensor", json=payload)
    data = res.get_json()
    assert data["classification"] == "Needs Attention"

    # Test alerts retrieval
    res = client.get("/api/alerts?unitId=unit-1")
    data = res.get_json()
    assert data["status"] == "OK"
    alerts = data["message"]
    assert all(r["readings"]["pH"] > 7.0 or r["readings"]["pH"] < 5.5 for r in alerts)
    assert len(alerts) <= 10 

def test_malformed_json(client):
    # Malformed JSON
    malformed_json = '{"unitId": "unit-123", "timestamp" "2025-05-24T12:34:56Z" "readings": {pH: 6.8, "temp": 23.5, "ec": 1.1}}'
    response = client.post('/api/sensor', data=malformed_json, content_type='application/json')
    assert response.status_code == 400
    data = response.get_json()
    assert data["status"] == "error"
    assert data["message"] == "malformed"
