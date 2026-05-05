Feature: API - ระบบเพิ่มพนักงาน
    As a ผู้ใช้
    I want to เพิ่มพนักงานใหม่ ผ่าน API
    So that ฉันสามารถเพิ่มพนักงานใหม่และตรวจสอบข้อมูลได้

    # Scenario: Case 1 - POST สร้างพนักงานด้วย email ที่ถูกต้อง
    #     When ผู้ใช้ส่ง POST request สำหรับสร้าง employee ด้วย "รูปแบบอีเมลถูกต้อง"
    #     Then response status code ควรเป็น 201

    Scenario: Case 2 - POST Create employee with invalid email format
        When ผู้ใช้ส่ง POST request สำหรับสร้าง employee ด้วย "รูปแบบอีเมลไม่ถูกต้อง"
        Then response status code ควรเป็น 400
        And response body ควรมีข้อความ "must be a well-formed email address" ที่ Key "defaultMessage"

    Scenario: Case 3 - GET Retrieve existing employee by ID
        When ผู้ใช้ส่ง GET request ด้วย ID 1
        Then response status code ควรเป็น 200
        And response body ควรมี employee information

    Scenario: Case 4 - GET Employee not found
        When ผู้ใช้ส่ง GET request ด้วย ID 55
        Then response status code ควรเป็น 404
        And response body ควรมีข้อความ "Employee not found with ID"
