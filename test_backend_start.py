#!/usr/bin/env python3
import requests
import time
import sys

def test_backend(max_retries=30):
    """Test if backend is running, with retries"""
    url = "http://localhost:3000/health"
    
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=2)
            print(f"✅ Backend is ready! Status: {response.status_code}")
            return True
        except requests.exceptions.ConnectionError:
            print(f"⏳ Attempt {attempt+1}/{max_retries}: Backend not ready yet...")
            time.sleep(2)
        except Exception as e:
            print(f"❌ Error: {e}")
            time.sleep(2)
    
    print("❌ Backend failed to start after 60 seconds")
    return False

if __name__ == "__main__":
    if test_backend():
        print("\n✅ Now testing authentication...")
        # Test registration
        register_data = {
            "email": "testuser@example.com",
            "username": "testuser",
            "password": "Password123"
        }
        try:
            r = requests.post("http://localhost:3000/auth/register", json=register_data)
            print(f"Register Status: {r.status_code}")
            if r.status_code in [200, 201]:
                print("✅ Registration successful!")
            else:
                print(f"❌ Registration failed: {r.json()}")
        except Exception as e:
            print(f"❌ Error during registration: {e}")
    else:
        sys.exit(1)
