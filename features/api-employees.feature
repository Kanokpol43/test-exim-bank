Feature: API - ระบบเพิ่มพนักงาน
    As a ผู้ใช้
    I want to เพิ่มพนักงานใหม่ ผ่าน API
    So that ฉันสามารถเพิ่มพนักงานใหม่และตรวจสอบข้อมูลได้

    Scenario: POST - สร้างพนักงานด้วย email ที่ถูกต้อง
        When ผู้ใช้ส่ง POST request สำหรับสร้าง employee ด้วย "รูปแบบอีเมลถูกต้อง"
        Then response status code ควรเป็น 201

    Scenario: POST - Create employee with invalid email format
        When ผู้ใช้ส่ง POST request สำหรับสร้าง employee ด้วย "รูปแบบอีเมลไม่ถูกต้อง"
        Then response status code ควรเป็น 400
        And response body ควรมีข้อความ "defaultMessage"

    Scenario: GET - Retrieve existing employee by ID
        Given ผู้ใช้สร้าง employee ใหม่ก่อน
        When ผู้ใช้ส่ง GET request สำหรับดึงข้อมูล 1
        Then response status code ควรเป็น 200
        And response body ควรมี employee information

    Scenario: GET - Employee not found
        When ผู้ใช้ส่ง GET request ด้วย id 50
        Then response status code ควรเป็น 404
        And response body ควรมีข้อความ "Employee not found with ID"
