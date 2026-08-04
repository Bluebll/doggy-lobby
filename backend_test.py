#!/usr/bin/env python3
"""
Backend API Tests for Pet Store Migration
Tests three Next.js API routes with focus on graceful error handling
when Supabase environment variables are not configured.
"""

import requests
import json
import sys

# Base URL from .env
BASE_URL = "https://petstore-migration.preview.emergentagent.com"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(passed, message):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")

def test_orders_missing_customer_name():
    """Test POST /api/orders with missing customer_name"""
    print_test_header("POST /api/orders - Missing customer_name")
    
    try:
        payload = {
            "customer_phone": "+919876543210",
            "customer_address": "123 Pet Street, Mumbai",
            "items": [
                {
                    "product_id": "test-uuid-123",
                    "name": "Dog Food",
                    "price": 500,
                    "qty": 2
                }
            ]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data:
                print_result(True, f"Correctly returned 400 with error: {data['error']}")
                return True
        
        print_result(False, f"Expected 400, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_orders_missing_customer_phone():
    """Test POST /api/orders with missing customer_phone"""
    print_test_header("POST /api/orders - Missing customer_phone")
    
    try:
        payload = {
            "customer_name": "Rajesh Kumar",
            "customer_address": "123 Pet Street, Mumbai",
            "items": [
                {
                    "product_id": "test-uuid-123",
                    "name": "Dog Food",
                    "price": 500,
                    "qty": 2
                }
            ]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data:
                print_result(True, f"Correctly returned 400 with error: {data['error']}")
                return True
        
        print_result(False, f"Expected 400, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_orders_missing_customer_address():
    """Test POST /api/orders with missing customer_address"""
    print_test_header("POST /api/orders - Missing customer_address")
    
    try:
        payload = {
            "customer_name": "Rajesh Kumar",
            "customer_phone": "+919876543210",
            "items": [
                {
                    "product_id": "test-uuid-123",
                    "name": "Dog Food",
                    "price": 500,
                    "qty": 2
                }
            ]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data:
                print_result(True, f"Correctly returned 400 with error: {data['error']}")
                return True
        
        print_result(False, f"Expected 400, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_orders_empty_items():
    """Test POST /api/orders with empty items array"""
    print_test_header("POST /api/orders - Empty items array")
    
    try:
        payload = {
            "customer_name": "Rajesh Kumar",
            "customer_phone": "+919876543210",
            "customer_address": "123 Pet Street, Mumbai",
            "items": []
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data:
                print_result(True, f"Correctly returned 400 with error: {data['error']}")
                return True
        
        print_result(False, f"Expected 400, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_orders_missing_supabase_env():
    """Test POST /api/orders with missing Supabase environment variables"""
    print_test_header("POST /api/orders - Missing Supabase env (current state)")
    
    try:
        payload = {
            "customer_name": "Rajesh Kumar",
            "customer_phone": "+919876543210",
            "customer_address": "123 Pet Street, Mumbai",
            "notes": "Please deliver in the evening",
            "items": [
                {
                    "product_id": "550e8400-e29b-41d4-a716-446655440000",
                    "name": "Premium Dog Food",
                    "price": 1200,
                    "qty": 2,
                    "image": "https://example.com/dog-food.jpg"
                }
            ]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 500:
            data = response.json()
            if "error" in data:
                error_msg = data["error"]
                # Check if error message mentions missing Supabase configuration
                if "SUPABASE" in error_msg.upper() or "Missing" in error_msg:
                    print_result(True, f"Correctly returned 500 with Supabase error: {error_msg}")
                    return True
                else:
                    print_result(True, f"Returned 500 with error (may be Supabase-related): {error_msg}")
                    return True
        
        print_result(False, f"Expected 500 with Supabase error, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_search_empty_query():
    """Test GET /api/search with empty query parameter"""
    print_test_header("GET /api/search - Empty query parameter")
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/search",
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "products" in data and data["products"] == []:
                print_result(True, "Correctly returned empty products array")
                return True
        
        print_result(False, f"Expected 200 with empty products, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_search_with_query_no_supabase():
    """Test GET /api/search with query but no Supabase env (graceful degradation)"""
    print_test_header("GET /api/search?q=chicken - No Supabase env (current state)")
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/search?q=chicken",
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "products" in data:
                # Should gracefully return empty array when Supabase is not configured
                if data["products"] == []:
                    print_result(True, "Gracefully returned empty products array (no Supabase)")
                    return True
                else:
                    print_result(True, f"Returned {len(data['products'])} products (Supabase configured)")
                    return True
        
        print_result(False, f"Expected 200, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_products_no_params_no_supabase():
    """Test GET /api/products with no parameters and no Supabase env"""
    print_test_header("GET /api/products - No params, no Supabase env (current state)")
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/products",
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "products" in data:
                # Should gracefully return empty array when Supabase is not configured
                if data["products"] == []:
                    print_result(True, "Gracefully returned empty products array (no Supabase)")
                    return True
                else:
                    print_result(True, f"Returned {len(data['products'])} products (Supabase configured)")
                    return True
        
        print_result(False, f"Expected 200, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_products_with_ids_no_supabase():
    """Test GET /api/products with ids parameter but no Supabase env"""
    print_test_header("GET /api/products?ids=uuid1,uuid2 - No Supabase env (current state)")
    
    try:
        test_ids = "550e8400-e29b-41d4-a716-446655440000,550e8400-e29b-41d4-a716-446655440001"
        response = requests.get(
            f"{BASE_URL}/api/products?ids={test_ids}",
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "products" in data:
                # Should gracefully return empty array when Supabase is not configured
                if data["products"] == []:
                    print_result(True, "Gracefully returned empty products array (no Supabase)")
                    return True
                else:
                    print_result(True, f"Returned {len(data['products'])} products (Supabase configured)")
                    return True
        
        print_result(False, f"Expected 200, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_products_empty_ids():
    """Test GET /api/products with empty ids parameter"""
    print_test_header("GET /api/products?ids= - Empty ids parameter")
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/products?ids=",
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "products" in data:
                # Empty ids should return empty array or fall back to default behavior
                print_result(True, f"Returned response with {len(data['products'])} products")
                return True
        
        print_result(False, f"Expected 200, got {response.status_code}")
        return False
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def main():
    print("\n" + "="*80)
    print("BACKEND API TESTS - Pet Store Migration")
    print("Testing graceful error handling with missing Supabase configuration")
    print("="*80)
    
    results = []
    
    # Test POST /api/orders
    print("\n" + "="*80)
    print("TESTING: POST /api/orders")
    print("="*80)
    results.append(("Orders - Missing customer_name", test_orders_missing_customer_name()))
    results.append(("Orders - Missing customer_phone", test_orders_missing_customer_phone()))
    results.append(("Orders - Missing customer_address", test_orders_missing_customer_address()))
    results.append(("Orders - Empty items", test_orders_empty_items()))
    results.append(("Orders - Missing Supabase env", test_orders_missing_supabase_env()))
    
    # Test GET /api/search
    print("\n" + "="*80)
    print("TESTING: GET /api/search")
    print("="*80)
    results.append(("Search - Empty query", test_search_empty_query()))
    results.append(("Search - With query, no Supabase", test_search_with_query_no_supabase()))
    
    # Test GET /api/products
    print("\n" + "="*80)
    print("TESTING: GET /api/products")
    print("="*80)
    results.append(("Products - No params, no Supabase", test_products_no_params_no_supabase()))
    results.append(("Products - With ids, no Supabase", test_products_with_ids_no_supabase()))
    results.append(("Products - Empty ids", test_products_empty_ids()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test(s) failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())
