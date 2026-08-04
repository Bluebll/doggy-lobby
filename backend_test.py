#!/usr/bin/env python3
"""
Backend API Tests for Petstore Migration
Tests all admin endpoints for proper 401 auth guard behavior
and verifies customer-facing endpoints still work.
"""

import requests
import json
import sys

BASE_URL = "https://petstore-migration.preview.emergentagent.com"

def test_admin_endpoints_unauthorized():
    """Test that all admin endpoints return 401 when no auth cookies present"""
    print("\n" + "="*80)
    print("TESTING ADMIN ENDPOINTS - UNAUTHORIZED ACCESS")
    print("="*80)
    
    test_results = []
    
    # Test cases: (method, endpoint, body, description)
    admin_tests = [
        ("GET", "/api/admin/products", None, "GET /api/admin/products"),
        ("POST", "/api/admin/products", {"name": "Test Product", "slug": "test-product", "price": 100}, "POST /api/admin/products with valid body"),
        ("POST", "/api/admin/products", {"invalid": "data"}, "POST /api/admin/products with invalid body"),
        ("PATCH", "/api/admin/products/123", {"name": "Updated"}, "PATCH /api/admin/products/[id] with valid body"),
        ("PATCH", "/api/admin/products/123", {"invalid": "data"}, "PATCH /api/admin/products/[id] with invalid body"),
        ("DELETE", "/api/admin/products/123", None, "DELETE /api/admin/products/[id]"),
        ("GET", "/api/admin/categories", None, "GET /api/admin/categories"),
        ("POST", "/api/admin/categories", {"name": "Test Category", "slug": "test-category"}, "POST /api/admin/categories with valid body"),
        ("POST", "/api/admin/categories", {"invalid": "data"}, "POST /api/admin/categories with invalid body"),
        ("PATCH", "/api/admin/categories/123", {"name": "Updated"}, "PATCH /api/admin/categories/[id] with valid body"),
        ("PATCH", "/api/admin/categories/123", {"invalid": "data"}, "PATCH /api/admin/categories/[id] with invalid body"),
        ("DELETE", "/api/admin/categories/123", None, "DELETE /api/admin/categories/[id]"),
        ("GET", "/api/admin/orders", None, "GET /api/admin/orders"),
        ("PATCH", "/api/admin/orders/123", {"status": "confirmed"}, "PATCH /api/admin/orders/[id] with valid status"),
        ("PATCH", "/api/admin/orders/123", {"status": "invalid_status"}, "PATCH /api/admin/orders/[id] with invalid status"),
        ("PATCH", "/api/admin/orders/123", {"invalid": "data"}, "PATCH /api/admin/orders/[id] with invalid body"),
    ]
    
    for method, endpoint, body, description in admin_tests:
        try:
            url = f"{BASE_URL}{endpoint}"
            headers = {"Content-Type": "application/json"}
            
            if method == "GET":
                response = requests.get(url, headers=headers, timeout=10)
            elif method == "POST":
                response = requests.post(url, json=body, headers=headers, timeout=10)
            elif method == "PATCH":
                response = requests.patch(url, json=body, headers=headers, timeout=10)
            elif method == "DELETE":
                response = requests.delete(url, headers=headers, timeout=10)
            
            # Check status code
            status_ok = response.status_code == 401
            
            # Check response body
            try:
                response_json = response.json()
                body_ok = response_json.get("error") == "Unauthorized"
            except Exception:
                body_ok = False
                response_json = None
            
            # Check Content-Type
            content_type = response.headers.get("Content-Type", "")
            content_type_ok = "application/json" in content_type
            
            passed = status_ok and body_ok and content_type_ok
            test_results.append(passed)
            
            status = "✅ PASS" if passed else "❌ FAIL"
            print(f"\n{status} - {description}")
            print(f"  Status Code: {response.status_code} (expected 401) {'✓' if status_ok else '✗'}")
            print(f"  Response Body: {response_json} {'✓' if body_ok else '✗'}")
            print(f"  Content-Type: {content_type} {'✓' if content_type_ok else '✗'}")
            
            if not passed:
                print(f"  ⚠️  ISSUE: Expected 401 with {{'error':'Unauthorized'}} and application/json Content-Type")
                
        except Exception as e:
            test_results.append(False)
            print(f"\n❌ FAIL - {description}")
            print(f"  Exception: {str(e)}")
    
    return test_results


def test_admin_upload_unauthorized():
    """Test that /api/admin/upload returns 401 when no auth cookies present"""
    print("\n" + "="*80)
    print("TESTING ADMIN UPLOAD ENDPOINT - UNAUTHORIZED ACCESS")
    print("="*80)
    
    test_results = []
    
    # Test with multipart form data
    try:
        url = f"{BASE_URL}/api/admin/upload"
        
        # Create a fake image file
        files = {
            'file': ('test.jpg', b'fake image data', 'image/jpeg')
        }
        data = {
            'bucket': 'product-images'
        }
        
        response = requests.post(url, files=files, data=data, timeout=10)
        
        # Check status code
        status_ok = response.status_code == 401
        
        # Check response body
        try:
            response_json = response.json()
            body_ok = response_json.get("error") == "Unauthorized"
        except Exception:
            body_ok = False
            response_json = None
        
        # Check Content-Type
        content_type = response.headers.get("Content-Type", "")
        content_type_ok = "application/json" in content_type
        
        passed = status_ok and body_ok and content_type_ok
        test_results.append(passed)
        
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"\n{status} - POST /api/admin/upload with multipart form-data")
        print(f"  Status Code: {response.status_code} (expected 401) {'✓' if status_ok else '✗'}")
        print(f"  Response Body: {response_json} {'✓' if body_ok else '✗'}")
        print(f"  Content-Type: {content_type} {'✓' if content_type_ok else '✗'}")
        
        if not passed:
            print(f"  ⚠️  ISSUE: Expected 401 with {{'error':'Unauthorized'}} and application/json Content-Type")
            
    except Exception as e:
        test_results.append(False)
        print(f"\n❌ FAIL - POST /api/admin/upload")
        print(f"  Exception: {str(e)}")
    
    return test_results


def test_customer_endpoints():
    """Re-test customer-facing endpoints to ensure they still work"""
    print("\n" + "="*80)
    print("RE-TESTING CUSTOMER-FACING ENDPOINTS")
    print("="*80)
    
    test_results = []
    
    # Test GET /api/search
    try:
        url = f"{BASE_URL}/api/search"
        response = requests.get(url, params={"q": ""}, timeout=10)
        
        status_ok = response.status_code == 200
        try:
            response_json = response.json()
            body_ok = "products" in response_json and isinstance(response_json["products"], list)
        except Exception:
            body_ok = False
            response_json = None
        
        passed = status_ok and body_ok
        test_results.append(passed)
        
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"\n{status} - GET /api/search?q=")
        print(f"  Status Code: {response.status_code} (expected 200) {'✓' if status_ok else '✗'}")
        print(f"  Response has 'products' array: {'✓' if body_ok else '✗'}")
        
    except Exception as e:
        test_results.append(False)
        print(f"\n❌ FAIL - GET /api/search")
        print(f"  Exception: {str(e)}")
    
    # Test GET /api/products
    try:
        url = f"{BASE_URL}/api/products"
        response = requests.get(url, timeout=10)
        
        status_ok = response.status_code == 200
        try:
            response_json = response.json()
            body_ok = "products" in response_json and isinstance(response_json["products"], list)
        except Exception:
            body_ok = False
            response_json = None
        
        passed = status_ok and body_ok
        test_results.append(passed)
        
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"\n{status} - GET /api/products")
        print(f"  Status Code: {response.status_code} (expected 200) {'✓' if status_ok else '✗'}")
        print(f"  Response has 'products' array: {'✓' if body_ok else '✗'}")
        
    except Exception as e:
        test_results.append(False)
        print(f"\n❌ FAIL - GET /api/products")
        print(f"  Exception: {str(e)}")
    
    # Test POST /api/orders with missing fields (should return 400)
    try:
        url = f"{BASE_URL}/api/orders"
        response = requests.post(url, json={}, timeout=10)
        
        # Should return 400 for missing fields or 500 for missing Supabase config
        status_ok = response.status_code in [400, 500]
        try:
            response_json = response.json()
            body_ok = "error" in response_json
        except Exception:
            body_ok = False
            response_json = None
        
        passed = status_ok and body_ok
        test_results.append(passed)
        
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"\n{status} - POST /api/orders (validation test)")
        print(f"  Status Code: {response.status_code} (expected 400 or 500) {'✓' if status_ok else '✗'}")
        print(f"  Response has 'error' field: {'✓' if body_ok else '✗'}")
        
    except Exception as e:
        test_results.append(False)
        print(f"\n❌ FAIL - POST /api/orders")
        print(f"  Exception: {str(e)}")
    
    return test_results


def main():
    print("\n" + "="*80)
    print("BACKEND API TESTING - PETSTORE MIGRATION")
    print("Base URL:", BASE_URL)
    print("="*80)
    
    all_results = []
    
    # Test admin endpoints
    admin_results = test_admin_endpoints_unauthorized()
    all_results.extend(admin_results)
    
    # Test admin upload endpoint
    upload_results = test_admin_upload_unauthorized()
    all_results.extend(upload_results)
    
    # Test customer endpoints
    customer_results = test_customer_endpoints()
    all_results.extend(customer_results)
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    total = len(all_results)
    passed = sum(all_results)
    failed = total - passed
    
    print(f"\nTotal Tests: {total}")
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"Success Rate: {(passed/total*100):.1f}%")
    
    if failed == 0:
        print("\n🎉 ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️  {failed} TEST(S) FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(main())
